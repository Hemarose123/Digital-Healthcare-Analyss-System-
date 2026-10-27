import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface SymptomCheck {
    id: EntryId;
    severityLevel: SeverityLevel;
    conditionSuggestions: Array<string>;
    timestamp: Timestamp;
    symptomText: string;
    remedies: Array<string>;
}
export interface ParsedMedicine {
    dosage: string;
    name: string;
    frequency: string;
}
export interface UserProfilePublic {
    age: bigint;
    name: string;
    createdAt: Timestamp;
    onboardingComplete: boolean;
    gender: string;
    healthGoals: Array<string>;
    lifestyle: Lifestyle;
}
export interface MoodEntry {
    id: EntryId;
    note?: string;
    moodValue: bigint;
    moodLabel: string;
    timestamp: Timestamp;
}
export interface TimelineEvent {
    id: EntryId;
    title: string;
    description: string;
    timestamp: Timestamp;
    eventData: string;
    eventType: string;
}
export interface AdherenceEntry {
    taken: boolean;
    date: string;
}
export type EntryId = bigint;
export interface DietFavorite {
    id: EntryId;
    nutritionalInfo: string;
    timestamp: Timestamp;
    mealName: string;
    ingredients: string;
    mealType: string;
}
export interface MedicineReminderPublic {
    id: EntryId;
    dosage: string;
    name: string;
    isActive: boolean;
    adherenceLog: Array<AdherenceEntry>;
    frequency: string;
    timeOfDay: string;
}
export interface ChatMessage {
    id: EntryId;
    language: string;
    message: string;
    timestamp: Timestamp;
    isBot: boolean;
}
export interface PrescriptionScan {
    id: EntryId;
    parsedMedicines: Array<ParsedMedicine>;
    isSaved: boolean;
    extractedText: string;
    imageUrl?: string;
    timestamp: Timestamp;
}
export interface ExerciseCompletion {
    id: EntryId;
    durationMins: bigint;
    timestamp: Timestamp;
    exerciseName: string;
    category: string;
}
export interface HabitDataPublic {
    waterGlasses: bigint;
    date: string;
    steps: bigint;
    sleepHours: number;
}
export enum Lifestyle {
    active = "active",
    athletic = "athletic",
    sedentary = "sedentary"
}
export enum SeverityLevel {
    red = "red",
    green = "green",
    yellow = "yellow"
}
export interface backendInterface {
    addChatMessage(message: string, isBot: boolean, language: string): Promise<bigint>;
    addDietFavorite(mealName: string, mealType: string, ingredients: string, nutritionalInfo: string): Promise<bigint>;
    addExerciseCompletion(exerciseName: string, category: string, durationMins: bigint): Promise<bigint>;
    addMoodEntry(moodValue: bigint, moodLabel: string, note: string | null): Promise<bigint>;
    addSymptomCheck(symptomText: string, conditionSuggestions: Array<string>, remedies: Array<string>, severityLevel: SeverityLevel): Promise<bigint>;
    addTimelineEvent(eventType: string, title: string, description: string, eventData: string): Promise<bigint>;
    clearChatHistory(): Promise<void>;
    deleteAccount(): Promise<void>;
    deleteMedicineReminder(id: EntryId): Promise<boolean>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getDietFavorites(): Promise<Array<DietFavorite>>;
    getExerciseCompletions(): Promise<Array<ExerciseCompletion>>;
    getHabitData(): Promise<Array<HabitDataPublic>>;
    getHealthTimeline(): Promise<Array<TimelineEvent>>;
    getMedicineReminders(): Promise<Array<MedicineReminderPublic>>;
    getMoodEntries(): Promise<Array<MoodEntry>>;
    getPrescriptionScans(): Promise<Array<PrescriptionScan>>;
    getSymptomChecks(): Promise<Array<SymptomCheck>>;
    getUserProfile(): Promise<UserProfilePublic | null>;
    markReminderTaken(id: EntryId, date: string, taken: boolean): Promise<boolean>;
    removeDietFavorite(id: EntryId): Promise<boolean>;
    saveHabitData(date: string, waterGlasses: bigint, sleepHours: number, steps: bigint): Promise<void>;
    saveMedicineReminder(name: string, dosage: string, frequency: string, timeOfDay: string): Promise<bigint>;
    savePrescriptionScan(imageUrl: string | null, extractedText: string, parsedMedicines: Array<ParsedMedicine>, isSaved: boolean): Promise<bigint>;
    saveUserProfile(name: string, age: bigint, gender: string, lifestyle: Lifestyle, healthGoals: Array<string>, onboardingComplete: boolean): Promise<void>;
    updateMedicineReminder(id: EntryId, name: string, dosage: string, frequency: string, timeOfDay: string, isActive: boolean): Promise<boolean>;
}
