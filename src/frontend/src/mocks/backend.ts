import type { backendInterface } from "../backend";
import { Lifestyle, SeverityLevel } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  addChatMessage: async () => BigInt(1),
  addDietFavorite: async () => BigInt(1),
  addExerciseCompletion: async () => BigInt(1),
  addMoodEntry: async () => BigInt(1),
  addSymptomCheck: async () => BigInt(1),
  addTimelineEvent: async () => BigInt(1),
  clearChatHistory: async () => undefined,
  deleteAccount: async () => undefined,
  deleteMedicineReminder: async () => true,
  getChatHistory: async () => [
    {
      id: BigInt(1),
      language: "en",
      message: "Hello! How can I help you today?",
      timestamp: now,
      isBot: true,
    },
    {
      id: BigInt(2),
      language: "en",
      message: "I have a headache",
      timestamp: now,
      isBot: false,
    },
    {
      id: BigInt(3),
      language: "en",
      message:
        "I'm sorry to hear that. Headaches can be caused by dehydration, stress, or lack of sleep. Try drinking water and resting.",
      timestamp: now,
      isBot: true,
    },
  ],
  getDietFavorites: async () => [
    {
      id: BigInt(1),
      nutritionalInfo: "Protein: 20g, Carbs: 45g, Fat: 12g",
      timestamp: now,
      mealName: "Grilled Chicken Salad",
      ingredients: "Chicken, lettuce, tomato, cucumber, olive oil",
      mealType: "Lunch",
    },
  ],
  getExerciseCompletions: async () => [
    {
      id: BigInt(1),
      durationMins: BigInt(30),
      timestamp: now,
      exerciseName: "Morning Yoga",
      category: "Yoga",
    },
  ],
  getHabitData: async () => [
    {
      waterGlasses: BigInt(6),
      date: new Date().toISOString().split("T")[0],
      steps: BigInt(7500),
      sleepHours: 7.5,
    },
  ],
  getHealthTimeline: async () => [
    {
      id: BigInt(1),
      title: "Mood Logged",
      description: "Feeling happy today",
      timestamp: now,
      eventData: '{"mood":"happy"}',
      eventType: "mood",
    },
    {
      id: BigInt(2),
      title: "Symptom Check",
      description: "Checked mild headache symptoms",
      timestamp: now - BigInt(3600) * BigInt(1_000_000_000),
      eventData: '{"severity":"green"}',
      eventType: "symptom",
    },
  ],
  getMedicineReminders: async () => [
    {
      id: BigInt(1),
      dosage: "500mg",
      name: "Vitamin D3",
      isActive: true,
      adherenceLog: [],
      frequency: "Daily",
      timeOfDay: "08:00",
    },
    {
      id: BigInt(2),
      dosage: "1000mg",
      name: "Omega-3",
      isActive: true,
      adherenceLog: [],
      frequency: "Daily",
      timeOfDay: "12:00",
    },
  ],
  getMoodEntries: async () => [
    { id: BigInt(1), moodValue: BigInt(4), moodLabel: "Happy", timestamp: now, note: "Great day!" },
    {
      id: BigInt(2),
      moodValue: BigInt(3),
      moodLabel: "Neutral",
      timestamp: now - BigInt(86400) * BigInt(1_000_000_000),
      note: undefined,
    },
    {
      id: BigInt(3),
      moodValue: BigInt(5),
      moodLabel: "Excellent",
      timestamp: now - BigInt(172800) * BigInt(1_000_000_000),
      note: "Feeling great!",
    },
    {
      id: BigInt(4),
      moodValue: BigInt(2),
      moodLabel: "Sad",
      timestamp: now - BigInt(259200) * BigInt(1_000_000_000),
      note: undefined,
    },
    {
      id: BigInt(5),
      moodValue: BigInt(4),
      moodLabel: "Happy",
      timestamp: now - BigInt(345600) * BigInt(1_000_000_000),
      note: "Good workout",
    },
  ],
  getPrescriptionScans: async () => [
    {
      id: BigInt(1),
      parsedMedicines: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3x daily" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed" },
      ],
      isSaved: true,
      extractedText: "Amoxicillin 500mg 3x daily\nIbuprofen 400mg as needed",
      imageUrl: undefined,
      timestamp: now,
    },
  ],
  getSymptomChecks: async () => [
    {
      id: BigInt(1),
      severityLevel: SeverityLevel.green,
      conditionSuggestions: ["Common Cold", "Seasonal Allergies"],
      timestamp: now,
      symptomText: "runny nose, mild headache",
      remedies: ["Rest well", "Stay hydrated", "Vitamin C"],
    },
  ],
  getUserProfile: async () => ({
    age: BigInt(28),
    name: "Alex Johnson",
    createdAt: now,
    onboardingComplete: true,
    gender: "prefer not to say",
    healthGoals: ["Weight Loss", "Mental Wellness", "Fitness"],
    lifestyle: Lifestyle.active,
  }),
  markReminderTaken: async () => true,
  removeDietFavorite: async () => true,
  saveHabitData: async () => undefined,
  saveMedicineReminder: async () => BigInt(1),
  savePrescriptionScan: async () => BigInt(1),
  saveUserProfile: async () => undefined,
  updateMedicineReminder: async () => true,
};
