/**
 * Backend hooks — wraps canister actor calls via React Query.
 * Since bindgen produced an empty interface, all hooks use simulated
 * local state with localStorage persistence until the Motoko methods
 * are wired. Shape mirrors backend.d.ts contract exactly.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import { mockBackend } from "../mocks/backend";
import type {
  ChatMessage,
  DietFavorite,
  ExerciseCompletion,
  HabitData,
  MedicineReminder,
  MoodEntry,
  PrescriptionScan,
  SymptomCheck,
  TimelineEvent,
  UserProfile,
} from "../types/health";

// ─── Backend Initialization ──────────────────────────────────────────────────
const canisterId =
  process.env.CANISTER_ID_BACKEND || process.env.BACKEND_CANISTER_ID || "";
let backendInstance: any = mockBackend;

try {
  if (canisterId && canisterId !== "undefined") {
    // Simple initialization, passing dummy upload/download for now as they aren't used in these hooks
    backendInstance = createActor(
      canisterId,
      async (_f: any) => new Uint8Array(),
      async (_b: any) => ({}) as any,
    );
  }
} catch (e) {
  console.warn("Could not initialize real backend, using mock", e);
}

const backend = backendInstance;

// ─── Storage helpers ──────────────────────────────────────────────────────────
function getLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function setLS<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── User Profile ─────────────────────────────────────────────────────────────
export function useUserProfile() {
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: () => getLS<UserProfile | null>("health:profile", null),
  });
}

export function useSaveProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      profile: Omit<UserProfile, "id" | "createdAt" | "updatedAt">,
    ) => {
      const existing = getLS<UserProfile | null>("health:profile", null);
      const saved: UserProfile = {
        ...profile,
        id: existing?.id ?? uid(),
        createdAt: existing?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
      };
      setLS("health:profile", saved);
      return saved;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile saved!");
    },
    onError: () => toast.error("Failed to save profile."),
  });
}

// ─── Mood Entries ─────────────────────────────────────────────────────────────
export function useMoodEntries() {
  return useQuery<MoodEntry[]>({
    queryKey: ["moodEntries"],
    queryFn: () => getLS<MoodEntry[]>("health:moods", []),
  });
}

export function useAddMoodEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<MoodEntry, "id" | "timestamp">) => {
      const entries = getLS<MoodEntry[]>("health:moods", []);
      const newEntry: MoodEntry = {
        ...entry,
        id: uid(),
        timestamp: Date.now(),
      };
      setLS("health:moods", [newEntry, ...entries]);
      return newEntry;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["moodEntries"] });
      qc.invalidateQueries({ queryKey: ["healthTimeline"] });
    },
    onError: () => toast.error("Failed to log mood."),
  });
}

// ─── Symptom Checks ───────────────────────────────────────────────────────────
export function useSymptomChecks() {
  return useQuery<SymptomCheck[]>({
    queryKey: ["symptomChecks"],
    queryFn: () => getLS<SymptomCheck[]>("health:symptoms", []),
  });
}

export function useAddSymptomCheck() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (check: Omit<SymptomCheck, "id" | "timestamp">) => {
      const checks = getLS<SymptomCheck[]>("health:symptoms", []);
      const newCheck: SymptomCheck = {
        ...check,
        id: uid(),
        timestamp: Date.now(),
      };
      setLS("health:symptoms", [newCheck, ...checks]);
      return newCheck;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["symptomChecks"] });
      qc.invalidateQueries({ queryKey: ["healthTimeline"] });
    },
    onError: () => toast.error("Failed to save symptom check."),
  });
}

// ─── Medicine Reminders ───────────────────────────────────────────────────────
export function useMedicineReminders() {
  return useQuery<MedicineReminder[]>({
    queryKey: ["medicineReminders"],
    queryFn: async () => {
      try {
        const data = await backend.getMedicineReminders();
        return data.map((r: any) => ({
          id: String(r.id),
          medicineName: r.name,
          dosage: r.dosage,
          times: [r.timeOfDay],
          startDate: Date.now(),
          isActive: r.isActive,
          takenToday: false, // Defaulting to false, can be refined later
          notes: r.frequency,
          smsEnabled: false,
          smsRemindersCount: 0,
        })) as MedicineReminder[];
      } catch (error) {
        console.error("Backend fetch error for reminders:", error);
        return getLS<MedicineReminder[]>("health:reminders", []);
      }
    },
  });
}

export function useSaveMedicineReminder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reminder: Omit<MedicineReminder, "id">) => {
      try {
        const id = await backend.saveMedicineReminder(
          reminder.medicineName,
          reminder.dosage,
          Array.isArray(reminder.times) && typeof reminder.times[0] === "string"
            ? reminder.times[0]
            : "09:00",
          Array.isArray(reminder.times) && reminder.times.length > 0
            ? "Daily"
            : "As Needed",
          reminder.phoneNumber || null,
        );
        return { ...reminder, id: String(id) } as MedicineReminder;
      } catch (error) {
        console.error("Backend error:", error);
        // Fallback to localStorage
        const reminders = getLS<MedicineReminder[]>("health:reminders", []);
        const newReminder: MedicineReminder = { ...reminder, id: uid() };
        setLS("health:reminders", [...reminders, newReminder]);
        return newReminder;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["medicineReminders"] });
      toast.success("Reminder added!");
    },
    onError: () => toast.error("Failed to save reminder."),
  });
}

export function useSendMedicineSMS() {
  return useMutation({
    mutationFn: async (reminder: MedicineReminder) => {
      if (!reminder.phoneNumber || !reminder.smsEnabled) {
        throw new Error("SMS not enabled for this reminder");
      }

      const { sendMedicineSMS, addToSMSHistory } = await import(
        "../services/smsService"
      );
      const result = await sendMedicineSMS({
        phoneNumber: reminder.phoneNumber,
        medicineName: reminder.medicineName,
        dosage: reminder.dosage,
        time:
          Array.isArray(reminder.times) && typeof reminder.times[0] === "string"
            ? reminder.times[0]
            : "09:00",
        notes: reminder.notes,
      });

      addToSMSHistory(
        reminder.id,
        reminder.phoneNumber,
        reminder.medicineName,
        result.success,
        result.messageId,
      );

      return result;
    },
    onSuccess: () => {
      toast.success("SMS sent successfully!");
    },
    onError: () => toast.error("Failed to send SMS reminder."),
  });
}

export function useUpdateMedicineReminder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reminder: MedicineReminder) => {
      try {
        await backend.updateMedicineReminder(
          Number(reminder.id),
          reminder.medicineName,
          reminder.dosage,
          Array.isArray(reminder.times) && reminder.times.length > 0
            ? "Daily"
            : "As Needed",
          Array.isArray(reminder.times) && typeof reminder.times[0] === "string"
            ? reminder.times[0]
            : "09:00",
          true,
        );
        return reminder;
      } catch (error) {
        console.error("Backend error:", error);
        const reminders = getLS<MedicineReminder[]>("health:reminders", []);
        const updated = reminders.map((r) =>
          r.id === reminder.id ? reminder : r,
        );
        setLS("health:reminders", updated);
        return reminder;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["medicineReminders"] });
      toast.success("Reminder updated!");
    },
    onError: () => toast.error("Failed to update reminder."),
  });
}

export function useDeleteMedicineReminder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await backend.deleteMedicineReminder(Number(id));
      } catch (error) {
        console.error("Backend error:", error);
        const reminders = getLS<MedicineReminder[]>("health:reminders", []);
        setLS(
          "health:reminders",
          reminders.filter((r) => r.id !== id),
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["medicineReminders"] });
      toast.success("Reminder deleted!");
    },
    onError: () => toast.error("Failed to delete reminder."),
  });
}

export function useMarkReminderTaken() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; date: string; taken: boolean }) => {
      try {
        await backend.markReminderTaken(Number(data.id), data.date, data.taken);
      } catch (error) {
        console.error("Backend error:", error);
        const reminders = getLS<MedicineReminder[]>("health:reminders", []);
        const updated = reminders.map((r) =>
          r.id === data.id ? { ...r, takenToday: data.taken } : r,
        );
        setLS("health:reminders", updated);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["medicineReminders"] });
      toast.success("Marked as taken!");
    },
    onError: () => toast.error("Failed to mark reminder."),
  });
}

// ─── Health Timeline ──────────────────────────────────────────────────────────
export function useHealthTimeline() {
  return useQuery<TimelineEvent[]>({
    queryKey: ["healthTimeline"],
    queryFn: () => getLS<TimelineEvent[]>("health:timeline", []),
  });
}

export function useAddTimelineEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (event: Omit<TimelineEvent, "id" | "timestamp">) => {
      const events = getLS<TimelineEvent[]>("health:timeline", []);
      const newEvent: TimelineEvent = {
        ...event,
        id: uid(),
        timestamp: Date.now(),
      };
      setLS("health:timeline", [newEvent, ...events]);
      return newEvent;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["healthTimeline"] }),
    onError: () => toast.error("Failed to add timeline event."),
  });
}

// ─── Habit Data ───────────────────────────────────────────────────────────────
export function useHabitData() {
  return useQuery<HabitData[]>({
    queryKey: ["habitData"],
    queryFn: () => getLS<HabitData[]>("health:habits", []),
  });
}

export function useSaveHabitData() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<HabitData, "timestamp">) => {
      const habits = getLS<HabitData[]>("health:habits", []);
      const existing = habits.findIndex((h) => h.date === data.date);
      const saved: HabitData = { ...data, timestamp: Date.now() };
      if (existing >= 0) {
        habits[existing] = saved;
      } else {
        habits.unshift(saved);
      }
      setLS("health:habits", habits);
      return saved;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["habitData"] });
      toast.success("Habit data saved!");
    },
    onError: () => toast.error("Failed to save habit data."),
  });
}

// ─── Prescription Scans ───────────────────────────────────────────────────────
export function usePrescriptionScans() {
  return useQuery<PrescriptionScan[]>({
    queryKey: ["prescriptionScans"],
    queryFn: () => getLS<PrescriptionScan[]>("health:prescriptions", []),
  });
}

export function useSavePrescriptionScan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (scan: Omit<PrescriptionScan, "id" | "timestamp">) => {
      const scans = getLS<PrescriptionScan[]>("health:prescriptions", []);
      const newScan: PrescriptionScan = {
        ...scan,
        id: uid(),
        timestamp: Date.now(),
      };
      setLS("health:prescriptions", [newScan, ...scans]);
      return newScan;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prescriptionScans"] });
      qc.invalidateQueries({ queryKey: ["healthTimeline"] });
      toast.success("Prescription scan saved!");
    },
    onError: () => toast.error("Failed to save prescription scan."),
  });
}

// ─── Diet Favorites ───────────────────────────────────────────────────────────
export function useDietFavorites() {
  return useQuery<DietFavorite[]>({
    queryKey: ["dietFavorites"],
    queryFn: () => getLS<DietFavorite[]>("health:dietFavorites", []),
  });
}

export function useAddDietFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (fav: Omit<DietFavorite, "id" | "timestamp">) => {
      const favs = getLS<DietFavorite[]>("health:dietFavorites", []);
      const newFav: DietFavorite = { ...fav, id: uid(), timestamp: Date.now() };
      setLS("health:dietFavorites", [...favs, newFav]);
      return newFav;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dietFavorites"] }),
    onError: () => toast.error("Failed to add favorite."),
  });
}

export function useRemoveDietFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const favs = getLS<DietFavorite[]>("health:dietFavorites", []);
      setLS(
        "health:dietFavorites",
        favs.filter((f) => f.id !== id),
      );
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dietFavorites"] }),
  });
}

// ─── Exercise Completions ─────────────────────────────────────────────────────
export function useExerciseCompletions() {
  return useQuery<ExerciseCompletion[]>({
    queryKey: ["exerciseCompletions"],
    queryFn: () => getLS<ExerciseCompletion[]>("health:exercises", []),
  });
}

export function useAddExerciseCompletion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ex: Omit<ExerciseCompletion, "id" | "timestamp">) => {
      const exList = getLS<ExerciseCompletion[]>("health:exercises", []);
      const newEx: ExerciseCompletion = {
        ...ex,
        id: uid(),
        timestamp: Date.now(),
      };
      setLS("health:exercises", [newEx, ...exList]);
      return newEx;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exerciseCompletions"] });
      toast.success("Exercise logged!");
    },
  });
}

// ─── Chat History ─────────────────────────────────────────────────────────────
export function useChatHistory() {
  return useQuery<ChatMessage[]>({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      try {
        const b = backend as any;
        if (b?.getChatHistory) {
          const messages = await b.getChatHistory();
          // Map backend format to frontend format
          const mapped = (messages || []).map((m: any) => ({
            id: String(m.id),
            role: m.isBot ? "assistant" : "user",
            content: m.message,
            language: m.language,
            timestamp: Number(m.timestamp),
          }));
          setLS("health:chat", mapped);
          return mapped;
        }
      } catch (error) {
        console.error("Backend chat history error:", error);
      }
      return getLS<ChatMessage[]>("health:chat", []);
    },
  });
}

export function useAddChatMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (msg: ChatMessage) => {
      try {
        const b = backend as any;
        if (b?.addChatMessage) {
          // Map frontend format to backend format
          await b.addChatMessage(
            msg.content,
            msg.role === "assistant",
            msg.language,
          );
          return msg;
        }
      } catch (error) {
        console.error("Backend add message error:", error);
      }

      // Fallback to localStorage
      const msgs = getLS<ChatMessage[]>("health:chat", []);
      setLS("health:chat", [...msgs, msg]);
      return msg;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chatHistory"] }),
  });
}

export function useClearChatHistory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const b = backend as any;
        if (b?.clearChatHistory) {
          await b.clearChatHistory();
        }
      } catch (error) {
        console.error("Backend clear chat error:", error);
      }
      setLS("health:chat", []);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chatHistory"] });
      toast.success("Chat cleared.");
    },
  });
}

// ─── Delete Account ───────────────────────────────────────────────────────────
export function useDeleteAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const keys = [
        "health:profile",
        "health:moods",
        "health:symptoms",
        "health:reminders",
        "health:timeline",
        "health:habits",
        "health:prescriptions",
        "health:dietFavorites",
        "health:exercises",
        "health:chat",
      ];
      for (const k of keys) {
        localStorage.removeItem(k);
      }
    },
    onSuccess: () => {
      qc.clear();
      toast.success("Account data deleted.");
    },
    onError: () => toast.error("Failed to delete account."),
  });
}
