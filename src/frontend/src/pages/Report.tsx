import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  CheckCircle,
  ClipboardCopy,
  Download,
  FileText,
  Heart,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  useHabitData,
  useHealthTimeline,
  useMedicineReminders,
  useMoodEntries,
} from "../hooks/useBackend";
import { useHealthStore } from "../store/useHealthStore";

// ─── Health Score Ring ────────────────────────────────────────────────────────
function HealthScoreRing({ score }: { score: number }) {
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * (score / 100);
  const label =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Fair"
          : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={120}
        height={120}
        viewBox="0 0 120 120"
        role="img"
        aria-label={`Health score: ${score} out of 100`}
      >
        <title>Health Score: {score}/100</title>
        <defs>
          <linearGradient id="rptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
        <circle
          cx={60}
          cy={60}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={10}
        />
        <circle
          cx={60}
          cy={60}
          r={r}
          fill="none"
          stroke="url(#rptGradient)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeDashoffset={circumference * 0.25}
          style={{ transition: "stroke-dasharray 1s ease-in-out" }}
        />
        <text
          x={60}
          y={56}
          textAnchor="middle"
          fontSize={22}
          fontWeight="bold"
          fill="currentColor"
        >
          {score}
        </text>
        <text x={60} y={72} textAnchor="middle" fontSize={10} fill="#6b7280">
          / 100
        </text>
      </svg>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({
  value,
  max,
  color,
}: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-2 rounded-full bg-[#e5e7eb] overflow-hidden print:bg-gray-200">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-display font-semibold text-xs uppercase tracking-widest mb-3"
      style={{ color: "#3B82F6" }}
    >
      {children}
    </h3>
  );
}

// ─── Wellness Tips ─────────────────────────────────────────────────────────────
function getWellnessTips(
  avgMood: number,
  avgWater: number,
  avgSleep: number,
): string[] {
  const tips: string[] = [];
  if (avgMood < 3)
    tips.push(
      "Your mood trend indicates elevated stress. Consider 10 minutes of deep breathing or guided meditation daily.",
    );
  else
    tips.push(
      "Your mood has been positive. Keep up consistent journaling and mindfulness to sustain this momentum.",
    );

  if (avgWater < 6)
    tips.push(
      "You're averaging below the recommended 8 glasses of water. Carry a reusable bottle and set hourly reminders to hydrate.",
    );
  else
    tips.push(
      "Excellent hydration! Staying well-hydrated supports energy levels, digestion, and skin health.",
    );

  if (avgSleep < 7)
    tips.push(
      "Your sleep average is below the 7–9 hour recommendation. Try a consistent sleep schedule and limit screens 1 hour before bed.",
    );
  else
    tips.push(
      "Your sleep hours are healthy. Maintain a relaxing bedtime routine to optimize sleep quality further.",
    );

  return tips.slice(0, 3);
}

// ─── Timeline Event Icon ──────────────────────────────────────────────────────
const eventEmoji: Record<string, string> = {
  mood: "😊",
  symptom: "🩺",
  reminder: "💊",
  prescription: "📋",
  habit: "📊",
  exercise: "🏃",
  diet: "🥗",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReportPage() {
  const { userProfile } = useHealthStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data: moods, isLoading: moodsLoading } = useMoodEntries();
  const { data: reminders, isLoading: remindersLoading } =
    useMedicineReminders();
  const { data: habits, isLoading: habitsLoading } = useHabitData();
  const { data: timeline, isLoading: timelineLoading } = useHealthTimeline();

  const isLoading =
    moodsLoading || remindersLoading || habitsLoading || timelineLoading;

  // ─── Computed values ─────────────────────────────────────────────────────────
  const avgMoodRaw = moods?.length
    ? moods.reduce((s, m) => s + m.mood, 0) / moods.length
    : 3;
  const avgMood = Number(avgMoodRaw.toFixed(1));

  const avgWaterRaw = habits?.length
    ? habits.reduce((s, h) => s + h.waterGlasses, 0) / habits.length
    : 0;
  const avgWater = Number(avgWaterRaw.toFixed(1));

  const avgSleepRaw = habits?.length
    ? habits.reduce((s, h) => s + h.sleepHours, 0) / habits.length
    : 0;
  const avgSleep = Number(avgSleepRaw.toFixed(1));

  const avgStepsRaw = habits?.length
    ? habits.reduce((s, h) => s + h.steps, 0) / habits.length
    : 0;
  const avgSteps = Math.round(avgStepsRaw);

  // Health score calc
  const moodScore = Math.round((avgMood / 5) * 25);
  const waterScore = Math.round(Math.min(1, avgWater / 8) * 25);
  const sleepScore = Math.round(Math.min(1, avgSleep / 8) * 25);
  const stepsScore = Math.round(Math.min(1, avgSteps / 10000) * 25);
  const healthScore = moodScore + waterScore + sleepScore + stepsScore;

  // Mood chart – last 7 entries
  const moodChartData = (moods ?? [])
    .slice(0, 7)
    .reverse()
    .map((m, i) => ({
      day: `D${i + 1}`,
      mood: m.mood,
    }));

  const activeReminders = (reminders ?? []).filter((r) => r.isActive);
  const takenCount = activeReminders.filter((r) => r.takenToday).length;
  const adherencePct = activeReminders.length
    ? Math.round((takenCount / activeReminders.length) * 100)
    : 0;

  const recentEvents = (timeline ?? []).slice(0, 5);
  const wellnessTips = getWellnessTips(avgMood, avgWater, avgSleep);
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleDownloadPDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
      toast.success("Report ready — use your browser's Save as PDF option");
    }, 600);
  };

  const handleCopyForDoctor = async () => {
    const text = `AI HEALTH COMPANION — REPORT (${reportDate})
Patient: ${userProfile?.name ?? "Anonymous"} | Age: ${userProfile?.age ?? "—"} | Lifestyle: ${userProfile?.lifestyle ?? "—"}
Health Goals: ${(userProfile?.goals ?? []).map((g) => g.replace("_", " ")).join(", ")}
Health Score: ${healthScore}/100
Avg Mood: ${avgMood}/5 | Avg Water: ${avgWater} glasses/day | Avg Sleep: ${avgSleep} hrs | Avg Steps: ${avgSteps.toLocaleString()}
Active Medications: ${activeReminders.map((r) => `${r.medicineName} ${r.dosage}`).join(", ") || "None"}
Medicine Adherence: ${adherencePct}%

Wellness Tips:
${wellnessTips.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Generated by AI Health Companion — for personal wellness tracking only. Consult a qualified healthcare professional for medical decisions.`;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Health summary copied to clipboard");
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      toast.error("Failed to copy — please try again");
    }
  };

  return (
    <>
      {/* ── Print styles injected via style tag ─────────────────────────── */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #health-report, #health-report * { visibility: visible; }
          #health-report {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          .no-print { display: none !important; }
          .print-white { background: white !important; color: black !important; }
          .print-border { border: 1px solid #e5e7eb !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div
        data-ocid="report.page"
        className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto"
      >
        {/* ── Page header ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between flex-wrap gap-4 no-print"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <FileText size={16} className="text-white" />
              </div>
              <h1 className="text-2xl font-display font-bold">Health Report</h1>
            </div>
            <p className="text-sm text-muted-foreground ml-10">
              Your comprehensive AI-generated wellness summary
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              data-ocid="report.share.secondary_button"
              onClick={handleCopyForDoctor}
              className="gap-2 transition-smooth"
            >
              {isCopied ? (
                <CheckCircle size={15} className="text-accent" />
              ) : (
                <ClipboardCopy size={15} />
              )}
              Share with Doctor
            </Button>
            <Button
              data-ocid="report.download.primary_button"
              className="gradient-primary border-0 text-white gap-2 transition-smooth hover:opacity-90"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}
              {isGenerating ? "Generating…" : "Download PDF Report"}
            </Button>
          </div>
        </motion.div>

        {/* ── Loading skeletons ────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="space-y-4">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : (
          /* ── Report card (printable) ─────────────────────────────────────── */
          <motion.div
            id="health-report"
            data-ocid="report.content.card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden print-white"
          >
            {/* ── 1. HEADER ───────────────────────────────────────────── */}
            <div className="gradient-primary p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Activity className="absolute right-6 top-4 w-24 h-24" />
              </div>
              <div className="relative flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Heart size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold">
                    AI Health Companion
                  </h2>
                  <p className="text-sm text-white/75">
                    Personal Health Report
                  </p>
                </div>
              </div>
              <div className="relative flex items-center justify-between flex-wrap gap-2 text-sm text-white/80">
                <span>📅 Generated: {reportDate}</span>
                {userProfile && (
                  <span className="font-semibold text-white">
                    👤 {userProfile.name}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* ── 2. HEALTH SCORE ──────────────────────────────────── */}
              <div>
                <SectionTitle>Health Score</SectionTitle>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-muted/30 rounded-xl p-5 print-border">
                  <HealthScoreRing score={healthScore} />
                  <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                    {[
                      {
                        label: "Mood",
                        score: moodScore,
                        max: 25,
                        color: "#818CF8",
                      },
                      {
                        label: "Hydration",
                        score: waterScore,
                        max: 25,
                        color: "#38BDF8",
                      },
                      {
                        label: "Sleep",
                        score: sleepScore,
                        max: 25,
                        color: "#A78BFA",
                      },
                      {
                        label: "Activity",
                        score: stepsScore,
                        max: 25,
                        color: "#34D399",
                      },
                    ].map((s) => (
                      <div key={s.label} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            {s.label}
                          </span>
                          <span className="font-semibold">{s.score}/25</span>
                        </div>
                        <ProgressBar
                          value={s.score}
                          max={s.max}
                          color={s.color}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 3. PATIENT PROFILE + HEALTH GOALS ────────────────── */}
              {userProfile && (
                <div>
                  <SectionTitle>Patient Profile & Health Goals</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Name", value: userProfile.name },
                      { label: "Age", value: `${userProfile.age} yrs` },
                      {
                        label: "Gender",
                        value: userProfile.gender.replace("_", " "),
                      },
                      { label: "Lifestyle", value: userProfile.lifestyle },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="bg-muted/30 rounded-lg p-3 text-sm print-border"
                      >
                        <p className="text-muted-foreground text-xs mb-0.5">
                          {f.label}
                        </p>
                        <p className="font-semibold capitalize">{f.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.goals.map((g) => (
                      <Badge
                        key={g}
                        variant="secondary"
                        className="capitalize text-xs px-3 py-1"
                      >
                        {g.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 4. MOOD SUMMARY ──────────────────────────────────── */}
              <div>
                <SectionTitle>Mood Summary</SectionTitle>
                <div className="bg-muted/30 rounded-xl p-5 print-border">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Average Mood This Month
                      </p>
                      <p className="text-3xl font-display font-bold gradient-text">
                        {avgMood}
                        <span className="text-base text-muted-foreground font-normal">
                          {" "}
                          / 5
                        </span>
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        Total Entries
                      </p>
                      <p className="text-2xl font-bold">{moods?.length ?? 0}</p>
                    </div>
                  </div>
                  {moodChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart
                        data={moodChartData}
                        margin={{ top: 4, right: 4, bottom: 4, left: -20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                        <YAxis domain={[1, 5]} tick={{ fontSize: 10 }} />
                        <Tooltip
                          contentStyle={{ fontSize: 12 }}
                          formatter={(v: number) => [`${v}/5`, "Mood"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="mood"
                          stroke="#3B82F6"
                          strokeWidth={2.5}
                          dot={{ r: 3, fill: "#3B82F6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No mood entries yet
                    </p>
                  )}
                </div>
              </div>

              {/* ── 5. HABIT STATISTICS ──────────────────────────────── */}
              <div>
                <SectionTitle>Habit Statistics</SectionTitle>
                <div className="space-y-4 bg-muted/30 rounded-xl p-5 print-border">
                  {[
                    {
                      emoji: "💧",
                      label: "Daily Water Intake",
                      value: avgWater,
                      max: 8,
                      unit: "glasses",
                      target: "8 glasses",
                      color: "#38BDF8",
                    },
                    {
                      emoji: "🌙",
                      label: "Average Sleep",
                      value: avgSleep,
                      max: 9,
                      unit: "hrs",
                      target: "7–9 hrs",
                      color: "#A78BFA",
                    },
                    {
                      emoji: "👟",
                      label: "Daily Steps",
                      value: avgSteps,
                      max: 10000,
                      unit: "steps",
                      target: "10,000 steps",
                      color: "#34D399",
                    },
                  ].map((h) => (
                    <div key={h.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {h.emoji} {h.label}
                        </span>
                        <span className="font-semibold">
                          {typeof h.value === "number" && h.unit === "steps"
                            ? h.value.toLocaleString()
                            : h.value}{" "}
                          {h.unit}
                          <span className="text-xs text-muted-foreground ml-1">
                            / {h.target}
                          </span>
                        </span>
                      </div>
                      <ProgressBar
                        value={h.value}
                        max={h.max}
                        color={h.color}
                      />
                    </div>
                  ))}
                  {habits?.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No habit data recorded yet
                    </p>
                  )}
                </div>
              </div>

              {/* ── 6. MEDICINE ADHERENCE ────────────────────────────── */}
              <div>
                <SectionTitle>Medicine Adherence</SectionTitle>
                <div className="bg-muted/30 rounded-xl p-5 print-border">
                  {activeReminders.length > 0 ? (
                    <>
                      <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Adherence Rate
                          </p>
                          <p className="text-2xl font-bold gradient-text">
                            {adherencePct}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Taken Today
                          </p>
                          <p className="text-2xl font-bold">
                            {takenCount}
                            <span className="text-base text-muted-foreground font-normal">
                              {" "}
                              / {activeReminders.length}
                            </span>
                          </p>
                        </div>
                      </div>
                      <ProgressBar
                        value={takenCount}
                        max={activeReminders.length}
                        color="#14B8A6"
                      />
                      <div className="mt-4 space-y-2">
                        {activeReminders.slice(0, 5).map((r, i) => (
                          <div
                            key={r.id}
                            data-ocid={`report.medication.item.${i + 1}`}
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border text-sm print-border"
                          >
                            <span className="text-base">💊</span>
                            <span className="font-medium flex-1 truncate">
                              {r.medicineName}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {r.dosage}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {r.times.join(", ")}
                            </span>
                            {r.takenToday && (
                              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                                Taken
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-3">
                      No active medicine reminders
                    </p>
                  )}
                </div>
              </div>

              {/* ── 7. RECENT HEALTH EVENTS ──────────────────────────── */}
              <div>
                <SectionTitle>Recent Health Events</SectionTitle>
                <div className="space-y-2">
                  {recentEvents.length > 0 ? (
                    recentEvents.map((evt, i) => (
                      <div
                        key={evt.id}
                        data-ocid={`report.event.item.${i + 1}`}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border text-sm print-border"
                      >
                        <span className="text-lg leading-none mt-0.5">
                          {eventEmoji[evt.type] ?? "📌"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{evt.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {evt.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(evt.timestamp).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4 bg-muted/30 rounded-xl">
                      No timeline events recorded yet
                    </p>
                  )}
                </div>
              </div>

              {/* ── 8. WELLNESS TIPS ─────────────────────────────────── */}
              <div>
                <SectionTitle>AI-Personalised Wellness Tips</SectionTitle>
                <div className="space-y-3">
                  {wellnessTips.map((tip, i) => (
                    <div
                      key={tip}
                      data-ocid={`report.tip.item.${i + 1}`}
                      className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border text-sm print-border"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <p className="leading-relaxed text-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 9. FOOTER ────────────────────────────────────────── */}
              <div className="border-t border-border pt-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">
                    Generated by AI Health Companion · {reportDate}
                  </span>
                  <span>
                    <a
                      href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=health-report"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline transition-smooth"
                    >
                      Built with caffeine.ai
                    </a>
                  </span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs">
                  <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                    ⚠️ Medical Disclaimer
                  </p>
                  <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
                    This report is generated for personal wellness tracking
                    purposes only and does not constitute medical advice. Always
                    consult a qualified healthcare professional for diagnosis,
                    treatment, or medical decisions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Bottom action bar ──────────────────────────────────────────── */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 justify-end flex-wrap no-print"
          >
            <Button
              variant="outline"
              data-ocid="report.copy.secondary_button"
              onClick={handleCopyForDoctor}
              className="gap-2 transition-smooth"
            >
              {isCopied ? (
                <CheckCircle size={15} className="text-accent" />
              ) : (
                <ClipboardCopy size={15} />
              )}
              {isCopied ? "Copied!" : "Copy for Doctor"}
            </Button>
            <Button
              data-ocid="report.print.primary_button"
              className="gradient-primary border-0 text-white gap-2 transition-smooth hover:opacity-90"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}
              {isGenerating ? "Generating…" : "Download PDF"}
            </Button>
          </motion.div>
        )}
      </div>
    </>
  );
}
