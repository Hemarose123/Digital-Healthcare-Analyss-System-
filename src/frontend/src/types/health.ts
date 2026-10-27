// ─── Route Constants ──────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  MOOD: "/mood",
  SYMPTOMS: "/symptoms",
  DIET: "/diet",
  EXERCISE: "/exercise",
  SKIN: "/skin",
  MEDICAL_IMAGING: "/medical-imaging",
  CHATBOT: "/chatbot",
  VOICE: "/voice",
  REMINDERS: "/reminders",
  TIMELINE: "/timeline",
  PRESCRIPTION: "/prescription",
  HABITS: "/habits",
  REPORT: "/report",
  HEALTH_RISK: "/health-risk",
} as const;

// ─── Enums ────────────────────────────────────────────────────────────────────
export type Lifestyle = "sedentary" | "active" | "athletic";
export type HealthGoal =
  | "weight_loss"
  | "mental_wellness"
  | "fitness"
  | "nutrition"
  | "disease_prevention"
  | "pcos"
  | "hormonal_health";
export type MoodEmoji = "😄" | "🙂" | "😐" | "😔" | "😢";
export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type SeverityLevel = "green" | "yellow" | "red";
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export type TimelineEventType =
  | "mood"
  | "symptom"
  | "reminder"
  | "prescription"
  | "habit"
  | "exercise"
  | "diet";

// ─── Core Interfaces ──────────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  lifestyle: Lifestyle;
  goals: HealthGoal[];
  initialMood: MoodLevel;
  phone?: string;
  phoneVerified?: boolean;
  weight?: number;
  height?: number;
  createdAt: number;
  updatedAt: number;
}

export interface MoodEntry {
  id: string;
  mood: MoodLevel;
  emoji: MoodEmoji;
  note?: string;
  timestamp: number;
}

export interface SymptomCheck {
  id: string;
  symptoms: string;
  severity: SeverityLevel;
  suggestions: string[];
  remedies: string[];
  timestamp: number;
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string;
  times: string[];
  startDate: number;
  endDate?: number;
  isActive: boolean;
  takenToday: boolean;
  notes?: string;
  phoneNumber?: string;
  smsEnabled: boolean;
  smsRemindersCount: number;
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  timestamp: number;
  metadata?: Record<string, string>;
}

export interface HabitData {
  date: string;
  waterGlasses: number;
  sleepHours: number;
  steps: number;
  timestamp: number;
}

export interface PrescriptionScan {
  id: string;
  imageUrl?: string;
  extractedText: string;
  detectedMedicines: DetectedMedicine[];
  timestamp: number;
}

export interface DetectedMedicine {
  name: string;
  dosage: string;
  frequency?: string;
}

export interface DietFavorite {
  id: string;
  mealName: string;
  calories: number;
  category: string;
  timestamp: number;
}

export interface ExerciseCompletion {
  id: string;
  exerciseName: string;
  durationMinutes: number;
  category: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: string;
  timestamp: number;
}

// ─── UI Helper Types ──────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

export interface HealthScoreBreakdown {
  mood: number;
  activity: number;
  nutrition: number;
  sleep: number;
  overall: number;
}
