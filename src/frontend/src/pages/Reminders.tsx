import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  BellRing,
  Check,
  CheckCircle2,
  Clock,
  Edit3,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddTimelineEvent,
  useDeleteMedicineReminder,
  useMarkReminderTaken,
  useMedicineReminders,
  useSaveMedicineReminder,
  useUpdateMedicineReminder,
} from "../hooks/useBackend";
import type { MedicineReminder } from "../types/health";

// ─── Constants ────────────────────────────────────────────────────────────────
const FREQUENCY_OPTIONS = [
  { value: "once_daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "three_times_daily", label: "Three times daily" },
  { value: "every_4_hours", label: "Every 4 hours" },
  { value: "as_needed", label: "As needed" },
];

const TIME_PRESETS = [
  { value: "08:00", label: "Morning 8:00 AM" },
  { value: "12:00", label: "Afternoon 12:00 PM" },
  { value: "18:00", label: "Evening 6:00 PM" },
  { value: "22:00", label: "Bedtime 10:00 PM" },
  { value: "custom", label: "Custom time…" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") toast.success("Notifications enabled!");
    });
  }
}

type StatusColor = "success" | "warning" | "destructive" | "secondary";

function getReminderStatus(reminder: MedicineReminder): {
  label: string;
  color: StatusColor;
} {
  if (!reminder) return { label: "Unknown", color: "secondary" };
  if (reminder.takenToday) return { label: "Taken Today", color: "success" };
  const now = new Date();
  const times = Array.isArray(reminder.times) ? reminder.times : [];
  const timeValue = typeof times[0] === "string" ? times[0] : "08:00";
  const parts = timeValue.split(":");
  const h = Number.parseInt(parts[0] ?? "8", 10) || 8;
  const m = Number.parseInt(parts[1] ?? "0", 10) || 0;
  const dueTime = new Date();
  dueTime.setHours(h, m, 0, 0);
  const diffMs = dueTime.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffMs < -30 * 60 * 1000)
    return { label: "Overdue", color: "destructive" };
  if (diffHours <= 0.5 && diffMs > 0)
    return { label: "Due Now", color: "warning" };
  if (diffHours > 0 && diffHours <= 2)
    return {
      label: `Due in ${Math.ceil(diffHours * 60)}m`,
      color: "secondary",
    };
  if (diffHours > 2)
    return { label: `Due in ${Math.floor(diffHours)}h`, color: "secondary" };
  return { label: "Scheduled", color: "secondary" };
}

function formatTime(time: string): string {
  const parts = time.split(":");
  const h = Number.parseInt(parts[0] ?? "8", 10);
  const m = Number.parseInt(parts[1] ?? "0", 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ color, label }: { color: StatusColor; label: string }) {
  const styles: Record<StatusColor, string> = {
    success:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    destructive:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    secondary: "bg-secondary text-secondary-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[color]}`}
    >
      {label}
    </span>
  );
}

// ─── Reminder form ────────────────────────────────────────────────────────────
interface ReminderFormProps {
  editTarget: MedicineReminder | null;
  onClose: () => void;
}

function ReminderForm({ editTarget, onClose }: ReminderFormProps) {
  const saveReminder = useSaveMedicineReminder();
  const updateReminder = useUpdateMedicineReminder();
  const addTimeline = useAddTimelineEvent();

  const [form, setForm] = useState(() => {
    if (editTarget) {
      const times = Array.isArray(editTarget.times) ? editTarget.times : [];
      const t = typeof times[0] === "string" ? times[0] : "08:00";
      const preset = TIME_PRESETS.find(
        (p) => p.value === t && p.value !== "custom",
      );
      return {
        medicineName: editTarget.medicineName || "",
        dosage: editTarget.dosage || "",
        frequency: editTarget.notes || "once_daily",
        timePreset: preset ? t : "custom",
        customTime: preset ? "" : t,
      };
    }
    return {
      medicineName: "",
      dosage: "",
      frequency: "once_daily",
      timePreset: "08:00",
      customTime: "",
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.medicineName.trim()) e.medicineName = "Medicine name is required";
    if (!form.dosage.trim()) e.dosage = "Dosage is required";
    if (form.timePreset === "custom" && !form.customTime)
      e.customTime = "Please enter a time";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const timeValue =
      form.timePreset === "custom" ? form.customTime : form.timePreset;
    const freqLabel =
      FREQUENCY_OPTIONS.find((f) => f.value === form.frequency)?.label ??
      form.frequency;
    requestNotificationPermission();

    if (editTarget) {
      await updateReminder.mutateAsync({
        ...editTarget,
        medicineName: form.medicineName,
        dosage: form.dosage,
        times: [timeValue],
        notes: form.frequency,
      });
    } else {
      await saveReminder.mutateAsync({
        medicineName: form.medicineName,
        dosage: form.dosage,
        times: [timeValue],
        startDate: Date.now(),
        isActive: true,
        takenToday: false,
        notes: form.frequency,
        smsEnabled: false,
        smsRemindersCount: 0,
      });
      await addTimeline.mutateAsync({
        type: "reminder",
        title: `💊 New Reminder: ${form.medicineName}`,
        description: `${form.dosage} — ${freqLabel} at ${formatTime(timeValue)}`,
      });
    }
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className="bg-card border-border shadow-elevated p-5"
        data-ocid="reminders.form.dialog"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-500" />
            {editTarget ? "Edit Reminder" : "Add New Reminder"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
            data-ocid="reminders.form.close_button"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="medicineName" className="text-sm font-medium">
              Medicine Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="medicineName"
              value={form.medicineName}
              onChange={(e) =>
                setForm((p) => ({ ...p, medicineName: e.target.value }))
              }
              placeholder="e.g. Metformin, Aspirin, Vitamin D"
              className="h-10"
              data-ocid="reminders.medicine_name.input"
            />
            {errors.medicineName && (
              <p
                className="text-xs text-destructive"
                data-ocid="reminders.medicine_name.field_error"
              >
                {errors.medicineName}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dosage" className="text-sm font-medium">
              Dosage <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dosage"
              value={form.dosage}
              onChange={(e) =>
                setForm((p) => ({ ...p, dosage: e.target.value }))
              }
              placeholder="e.g. 500mg, 1 tablet, 2 capsules"
              className="h-10"
              data-ocid="reminders.dosage.input"
            />
            {errors.dosage && (
              <p
                className="text-xs text-destructive"
                data-ocid="reminders.dosage.field_error"
              >
                {errors.dosage}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Frequency</Label>
              <Select
                value={form.frequency}
                onValueChange={(v) => setForm((p) => ({ ...p, frequency: v }))}
              >
                <SelectTrigger
                  className="h-10"
                  data-ocid="reminders.frequency.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Time of Day</Label>
              <Select
                value={form.timePreset}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, timePreset: v, customTime: "" }))
                }
              >
                <SelectTrigger
                  className="h-10"
                  data-ocid="reminders.time.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIME_PRESETS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {form.timePreset === "custom" && (
            <div className="space-y-1.5">
              <Label htmlFor="customTime" className="text-sm font-medium">
                Custom Time
              </Label>
              <Input
                id="customTime"
                type="time"
                value={form.customTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, customTime: e.target.value }))
                }
                className="h-10"
                data-ocid="reminders.time.input"
              />
              {errors.customTime && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="reminders.time.field_error"
                >
                  {errors.customTime}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              className="flex-1 h-10 text-white border-0"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              }}
              disabled={saveReminder.isPending || updateReminder.isPending}
              data-ocid="reminders.form.submit_button"
            >
              {editTarget ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Update Reminder
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Add Reminder
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 px-4"
              onClick={onClose}
              data-ocid="reminders.form.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}

// ─── Reminder card ────────────────────────────────────────────────────────────
interface ReminderCardProps {
  reminder: MedicineReminder;
  index: number;
  onEdit: (r: MedicineReminder) => void;
}

function ReminderCard({ reminder, index, onEdit }: ReminderCardProps) {
  const deleteReminder = useDeleteMedicineReminder();
  const markTaken = useMarkReminderTaken();
  const status = getReminderStatus(reminder);
  const times = Array.isArray(reminder.times) ? reminder.times : [];
  const timeStr = formatTime(typeof times[0] === "string" ? times[0] : "08:00");
  const freqLabel =
    FREQUENCY_OPTIONS.find((f) => f.value === reminder.notes)?.label ??
    reminder.notes ??
    "Once daily";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      data-ocid={`reminders.item.${index + 1}`}
    >
      <Card
        className={`bg-card border-border shadow-subtle p-4 transition-smooth hover:shadow-elevated ${reminder.takenToday ? "opacity-70" : ""}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: reminder.takenToday
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              }}
            >
              {reminder.takenToday ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <Bell className="w-5 h-5 text-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground truncate">
                  {reminder.medicineName}
                </h3>
                <StatusBadge color={status.color} label={status.label} />
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {reminder.dosage}
                <span className="mx-1.5 text-border">·</span>
                {freqLabel}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {timeStr}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {!reminder.takenToday && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                onClick={() =>
                  markTaken.mutate({
                    id: reminder.id,
                    date: new Date().toISOString().split("T")[0],
                    taken: true,
                  })
                }
                aria-label="Mark as taken"
                data-ocid={`reminders.taken_${index + 1}.toggle`}
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => onEdit(reminder)}
              aria-label="Edit reminder"
              data-ocid={`reminders.edit_${index + 1}.edit_button`}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteReminder.mutate(reminder.id)}
              aria-label="Delete reminder"
              data-ocid={`reminders.delete_${index + 1}.delete_button`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RemindersPage() {
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<MedicineReminder | null>(null);
  const { data: reminders = [] } = useMedicineReminders();

  const activeReminders = reminders.filter((r) => r.isActive);
  const takenCount = activeReminders.filter((r) => r.takenToday).length;

  function openAdd() {
    setEditTarget(null);
    setShowForm(true);
  }
  function openEdit(r: MedicineReminder) {
    setEditTarget(r);
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditTarget(null);
  }

  return (
    <div
      data-ocid="reminders.page"
      className="max-w-2xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Medicine{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              }}
            >
              Reminders
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Stay on track with your medication schedule
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="gap-2 text-white border-0"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          }}
          data-ocid="reminders.add.open_modal_button"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Reminder</span>
        </Button>
      </div>

      {/* Progress summary */}
      {activeReminders.length > 0 && (
        <Card className="bg-card border-border shadow-subtle p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Today's Progress
              </p>
              <p className="font-semibold text-foreground">
                {takenCount} of {activeReminders.length} taken
              </p>
            </div>
            <div className="w-24">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${activeReminders.length > 0 ? (takenCount / activeReminders.length) * 100 : 0}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right mt-0.5">
                {activeReminders.length > 0
                  ? Math.round((takenCount / activeReminders.length) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <ReminderForm editTarget={editTarget} onClose={closeForm} />
        )}
      </AnimatePresence>

      {/* Reminders list */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <BellRing className="w-4 h-4 text-amber-500" />
          Upcoming Reminders
          {activeReminders.length > 0 && (
            <Badge variant="secondary" className="text-xs ml-1">
              {activeReminders.length}
            </Badge>
          )}
        </h2>

        <AnimatePresence mode="popLayout">
          {activeReminders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-ocid="reminders.list.empty_state"
            >
              <Card className="bg-muted/30 border-border/60 border-dashed p-10 flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                  }}
                >
                  <Bell className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground mb-1">
                    No reminders yet
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Add your first medicine reminder to stay on top of your
                    health routine.
                  </p>
                </div>
                <Button
                  onClick={openAdd}
                  variant="outline"
                  className="gap-2 mt-1"
                  data-ocid="reminders.empty.open_modal_button"
                >
                  <Plus className="w-4 h-4" /> Add First Reminder
                </Button>
              </Card>
            </motion.div>
          ) : (
            activeReminders.map((reminder, idx) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                index={idx}
                onEdit={openEdit}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
