import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAddMoodEntry, useSaveProfile } from "../hooks/useBackend";
import { useHealthStore } from "../store/useHealthStore";
import type { Gender, HealthGoal, Lifestyle, MoodLevel } from "../types/health";

// ─── Constants ────────────────────────────────────────────────────────────────
const STEP_LABELS = ["Welcome", "Profile", "Goals", "Mood", "Confirm"] as const;

const GOALS: { id: HealthGoal; label: string; emoji: string; desc: string }[] =
  [
    {
      id: "weight_loss",
      label: "Weight Loss",
      emoji: "⚖️",
      desc: "Reach your ideal body weight",
    },
    {
      id: "mental_wellness",
      label: "Mental Wellness",
      emoji: "🧘",
      desc: "Reduce stress and anxiety",
    },
    {
      id: "fitness",
      label: "Fitness",
      emoji: "💪",
      desc: "Build strength and endurance",
    },
    {
      id: "nutrition",
      label: "Nutrition",
      emoji: "🥗",
      desc: "Improve your eating habits",
    },
    {
      id: "disease_prevention",
      label: "Disease Prevention",
      emoji: "🛡️",
      desc: "Stay ahead of health risks",
    },
    {
      id: "pcos",
      label: "PCOS Management",
      emoji: "🌸",
      desc: "Balance hormones and manage PCOS",
    },
    {
      id: "hormonal_health",
      label: "Hormonal Balance",
      emoji: "⚖️",
      desc: "Support your endocrine health",
    },
    {
      id: "better_sleep" as HealthGoal,
      label: "Better Sleep",
      emoji: "😴",
      desc: "Improve sleep quality",
    },
  ];

const MOODS: {
  level: MoodLevel;
  emoji: string;
  label: string;
  color: string;
}[] = [
  { level: 1, emoji: "😞", label: "Very Low", color: "#ef4444" },
  { level: 2, emoji: "😐", label: "Low", color: "#f97316" },
  { level: 3, emoji: "🙂", label: "Okay", color: "#eab308" },
  { level: 4, emoji: "😊", label: "Good", color: "#22c55e" },
  { level: 5, emoji: "😁", label: "Excellent", color: "#14b8a6" },
];

const LIFESTYLES: {
  id: Lifestyle;
  emoji: string;
  label: string;
  desc: string;
}[] = [
  {
    id: "sedentary",
    emoji: "🪑",
    label: "Sedentary",
    desc: "Mostly desk work, little activity",
  },
  {
    id: "active",
    emoji: "🚶",
    label: "Active",
    desc: "Regular movement and exercise",
  },
  {
    id: "athletic",
    emoji: "🏃",
    label: "Athletic",
    desc: "Intense training routines",
  },
];

const GENDERS: { id: Gender; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  return (
    <div
      className="flex items-center gap-1.5 mb-8"
      aria-label="Onboarding progress"
    >
      {STEP_LABELS.map((label, i) => {
        const isDone = i < step;
        const isActive = i === step;
        return (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isDone
                  ? "gradient-primary text-white shadow-md"
                  : isActive
                    ? "gradient-primary text-white shadow-md ring-4 ring-[#3b82f6]/20"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {isDone ? <Check size={14} strokeWidth={3} /> : i + 1}
              {isActive && (
                <span className="absolute inset-0 rounded-full animate-ping opacity-30 gradient-primary" />
              )}
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className="h-0.5 w-8 sm:w-12 rounded-full transition-all duration-500"
                style={{
                  background:
                    i < step
                      ? "linear-gradient(90deg, #3b82f6, #14b8a6)"
                      : "oklch(var(--muted))",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Slide animation variants ─────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveProfile();
  const addMoodEntry = useAddMoodEntry();
  const { setUserProfile, setAuthenticated } = useHealthStore();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1); // animation direction
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<Gender>("prefer_not_to_say");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("active");
  const [goals, setGoals] = useState<HealthGoal[]>([]);
  const [mood, setMood] = useState<MoodLevel>(4);
  const [moodNote, setMoodNote] = useState("");

  const goNext = () => {
    setDir(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };

  const toggleGoal = (g: HealthGoal) => {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  };

  const handleFinish = async () => {
    const validGoals = goals.filter(
      (g): g is Exclude<HealthGoal, "better_sleep"> =>
        g !== ("better_sleep" as HealthGoal),
    ) as HealthGoal[];

    const profile = await saveProfile.mutateAsync({
      name,
      age,
      gender,
      lifestyle,
      goals: validGoals,
      initialMood: mood,
    });

    await addMoodEntry.mutateAsync({
      mood,
      emoji: MOODS.find((m) => m.level === mood)?.emoji as
        | "😄"
        | "🙂"
        | "😐"
        | "😔"
        | "😢",
      note: moodNote || undefined,
    });

    setUserProfile(profile);
    setAuthenticated(true, "local-user");
    navigate({ to: "/dashboard" });
  };

  const selectedMood = MOODS.find((m) => m.level === mood);

  return (
    <div
      data-ocid="onboarding.page"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.96 0.012 230) 0%, oklch(0.98 0.006 240) 100%)",
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          transform: "translate(-40%, -40%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          transform: "translate(40%, 40%)",
        }}
      />

      {/* Card container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Logo & title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-elevated mb-3">
            <span className="text-2xl">❤️</span>
          </div>
          <p className="text-muted-foreground text-sm">AI Health Companion</p>
        </div>

        {/* Progress */}
        <div className="flex justify-center">
          <ProgressBar step={step} />
        </div>

        {/* Step card */}
        <div className="bg-card border border-border rounded-2xl shadow-elevated overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-7 sm:p-8"
            >
              {/* ── Step 0: Welcome ───────────────────────────────────────── */}
              {step === 0 && (
                <div className="text-center space-y-5">
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-5xl shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(20,184,166,0.12) 100%)",
                    }}
                  >
                    🌟
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                      Welcome to AI Health Companion
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Your personal AI-powered health platform. Let's set up
                      your profile in just 4 quick steps to personalize your
                      experience.
                    </p>
                  </div>
                  <div className="space-y-2 text-left">
                    {[
                      "Personalized health insights",
                      "AI symptom checking",
                      "Mood & habit tracking",
                      "Smart reminders",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-white" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button
                    data-ocid="onboarding.welcome.primary_button"
                    className="w-full gradient-primary border-0 text-white font-semibold py-5"
                    onClick={goNext}
                  >
                    Continue with Internet Identity
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Secured by Internet Identity — no passwords required
                  </p>
                </div>
              )}

              {/* ── Step 1: Personal Details ──────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      Personal Details
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Help us personalize your health plan
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ob-name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="ob-name"
                      data-ocid="onboarding.name.input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ob-age"
                      className="text-sm font-medium text-foreground"
                    >
                      Age <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="ob-age"
                      data-ocid="onboarding.age.input"
                      type="number"
                      value={age}
                      onChange={(e) =>
                        setAge(
                          Math.max(1, Math.min(120, Number(e.target.value))),
                        )
                      }
                      min={1}
                      max={120}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Gender
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {GENDERS.map((g) => (
                        <button
                          type="button"
                          key={g.id}
                          data-ocid={`onboarding.gender_${g.id}.radio`}
                          onClick={() => setGender(g.id)}
                          className={`px-3 py-2.5 rounded-xl border text-sm transition-all ${
                            gender === g.id
                              ? "gradient-primary text-white border-transparent shadow-sm"
                              : "border-border hover:border-primary/50 text-foreground bg-background"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Lifestyle
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {LIFESTYLES.map((l) => (
                        <button
                          type="button"
                          key={l.id}
                          data-ocid={`onboarding.lifestyle_${l.id}.radio`}
                          onClick={() => setLifestyle(l.id)}
                          className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-sm transition-all ${
                            lifestyle === l.id
                              ? "gradient-primary text-white border-transparent shadow-sm"
                              : "border-border hover:border-primary/50 text-foreground bg-background"
                          }`}
                        >
                          <span className="text-xl">{l.emoji}</span>
                          <span className="font-medium text-xs">{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button
                      variant="outline"
                      onClick={goBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      data-ocid="onboarding.profile.primary_button"
                      className="flex-1 gradient-primary border-0 text-white"
                      disabled={!name.trim() || age < 1}
                      onClick={goNext}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Health Goals ──────────────────────────────────── */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      Health Goals
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Select all that apply — choose at least one
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {GOALS.map((g) => {
                      const selected = goals.includes(g.id);
                      return (
                        <button
                          type="button"
                          key={g.id}
                          data-ocid={`onboarding.goal_${g.id}.checkbox`}
                          onClick={() => toggleGoal(g.id)}
                          className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left ${
                            selected
                              ? "gradient-primary text-white border-transparent shadow-md"
                              : "border-border hover:border-primary/50 bg-background"
                          }`}
                        >
                          <span className="text-2xl flex-shrink-0">
                            {g.emoji}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`font-semibold text-sm ${selected ? "text-white" : "text-foreground"}`}
                            >
                              {g.label}
                            </div>
                            <div
                              className={`text-xs mt-0.5 ${selected ? "text-white/75" : "text-muted-foreground"}`}
                            >
                              {g.desc}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 transition-all ${
                              selected
                                ? "bg-white/30 border-white/50"
                                : "border-border"
                            }`}
                          >
                            {selected && (
                              <Check
                                size={11}
                                className="text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button
                      variant="outline"
                      onClick={goBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      data-ocid="onboarding.goals.primary_button"
                      className="flex-1 gradient-primary border-0 text-white"
                      disabled={goals.length === 0}
                      onClick={goNext}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Mood ──────────────────────────────────────────── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      How are you feeling today?
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Your initial mood helps us personalize your journey
                    </p>
                  </div>

                  <div className="flex justify-between gap-2">
                    {MOODS.map((m) => (
                      <motion.button
                        key={m.level}
                        type="button"
                        data-ocid={`onboarding.mood_${m.level}.radio`}
                        onClick={() => setMood(m.level)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 flex flex-col items-center gap-2 py-5 rounded-2xl border transition-all ${
                          mood === m.level
                            ? "border-transparent shadow-md"
                            : "border-border hover:border-primary/40 bg-background"
                        }`}
                        style={
                          mood === m.level
                            ? {
                                background: `linear-gradient(135deg, ${m.color}22 0%, ${m.color}11 100%)`,
                                borderColor: m.color,
                              }
                            : {}
                        }
                      >
                        <span className="text-3xl">{m.emoji}</span>
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color: mood === m.level ? m.color : undefined,
                          }}
                        >
                          {m.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="ob-mood-note"
                      className="text-sm font-medium text-foreground"
                    >
                      Anything on your mind?{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="ob-mood-note"
                      data-ocid="onboarding.mood_note.textarea"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      placeholder="How are you feeling today?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={goBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      data-ocid="onboarding.mood.primary_button"
                      className="flex-1 gradient-primary border-0 text-white"
                      onClick={goNext}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 4: Confirmation ──────────────────────────────────── */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {selectedMood?.emoji ?? "🎉"}
                    </div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      You're all set, {name || "there"}!
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Here's a summary of your profile
                    </p>
                  </div>

                  <div className="bg-muted/40 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-semibold text-foreground">
                        {name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Age</span>
                      <span className="font-semibold text-foreground">
                        {age}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lifestyle</span>
                      <span className="font-semibold text-foreground capitalize">
                        {lifestyle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Today's Mood
                      </span>
                      <span className="font-semibold">
                        {selectedMood?.emoji} {selectedMood?.label}
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="text-muted-foreground text-sm block mb-2">
                        Goals
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {goals.map((g) => {
                          const found = GOALS.find((gd) => gd.id === g);
                          return (
                            <span
                              key={g}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            >
                              {found?.emoji} {found?.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={goBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      data-ocid="onboarding.confirm.primary_button"
                      className="flex-1 gradient-primary border-0 text-white font-semibold"
                      onClick={handleFinish}
                      disabled={saveProfile.isPending || addMoodEntry.isPending}
                    >
                      {saveProfile.isPending
                        ? "Setting up..."
                        : "Complete & Start Journey 🚀"}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step counter hint */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Step {step + 1} of {STEP_LABELS.length}
        </p>
      </div>
    </div>
  );
}
