import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Droplets,
  Flame,
  Footprints,
  Moon,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useHabitData, useSaveHabitData } from "../hooks/useBackend";
import type { HabitData } from "../types/health";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().split("T")[0] ?? "";

function progressColor(value: number, max: number): string {
  const pct = value / max;
  if (pct >= 0.9) return "bg-emerald-500";
  if (pct >= 0.6) return "bg-teal-400";
  if (pct >= 0.3) return "bg-amber-400";
  return "bg-rose-400";
}

function sleepLabel(hours: number): { label: string; color: string } {
  if (hours < 6) return { label: "Poor", color: "text-rose-500" };
  if (hours < 7) return { label: "Fair", color: "text-amber-500" };
  if (hours <= 9) return { label: "Good", color: "text-emerald-500" };
  return { label: "Oversleep", color: "text-amber-400" };
}

function stepsMilestone(steps: number): string {
  if (steps >= 10000) return "🏆 Daily goal achieved!";
  if (steps >= 7500) return "💪 Almost there, keep going!";
  if (steps >= 5000) return "🚶 Halfway to your goal";
  if (steps >= 2500) return "👟 Good start, keep moving!";
  return "🎯 Start walking toward your goal";
}

function calcStreak(
  habits: HabitData[],
  metric: "water" | "sleep" | "steps",
): number {
  const sorted = [...habits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  let streak = 0;
  for (const h of sorted) {
    const met =
      metric === "water"
        ? h.waterGlasses >= 6
        : metric === "sleep"
          ? h.sleepHours >= 7
          : h.steps >= 8000;
    if (met) streak++;
    else break;
  }
  return streak;
}

function getDayLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en", { weekday: "short" });
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({
  value,
  max,
  colorClass,
}: { value: number; max: number; colorClass: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Streak Badge ─────────────────────────────────────────────────────────────
function StreakBadge({
  count,
  label,
  color,
}: { count: number; label: string; color: string }) {
  if (count === 0) return null;
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${color} text-xs font-medium`}
    >
      <Flame size={12} className="text-orange-500" />
      <span>
        {count} day{count !== 1 ? "s" : ""} {label}
      </span>
    </div>
  );
}

// ─── Habit Tips ───────────────────────────────────────────────────────────────
const HABIT_TIPS = [
  {
    icon: "💧",
    tip: "Drink a glass of water first thing in the morning to kickstart your metabolism.",
  },
  {
    icon: "🌙",
    tip: "Set a consistent bedtime — even on weekends — to improve sleep quality.",
  },
  {
    icon: "👟",
    tip: "Take the stairs and park farther away to add steps without extra effort.",
  },
  {
    icon: "🧘",
    tip: "A 5-minute stretch after waking up improves circulation and mood.",
  },
];

// ─── Weekly Chart ─────────────────────────────────────────────────────────────
function WaterChart({ data }: { data: HabitData[] }) {
  const chartData = data.map((h) => ({
    day: getDayLabel(h.date),
    value: h.waterGlasses,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barSize={20}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 10]}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: "8px",
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v} glasses`, "Water"]}
        />
        <ReferenceLine
          y={8}
          stroke="#60A5FA"
          strokeDasharray="4 2"
          strokeWidth={1.5}
          label={{ value: "Goal", fontSize: 10, fill: "#60A5FA" }}
        />
        <Bar dataKey="value" radius={[5, 5, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={`water-${entry.day}`}
              fill={
                entry.value >= 8
                  ? "#34D399"
                  : entry.value >= 6
                    ? "#60A5FA"
                    : "#94A3B8"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function SleepChart({ data }: { data: HabitData[] }) {
  const chartData = data.map((h) => ({
    day: getDayLabel(h.date),
    value: h.sleepHours,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barSize={20}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 12]}
        />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: "8px",
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v}h`, "Sleep"]}
        />
        <ReferenceLine
          y={7.5}
          stroke="#818CF8"
          strokeDasharray="4 2"
          strokeWidth={1.5}
          label={{ value: "Goal", fontSize: 10, fill: "#818CF8" }}
        />
        <Bar dataKey="value" radius={[5, 5, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={`sleep-${entry.day}`}
              fill={
                entry.value >= 7
                  ? "#34D399"
                  : entry.value >= 6
                    ? "#FBBF24"
                    : "#F87171"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function StepsChart({ data }: { data: HabitData[] }) {
  const chartData = data.map((h) => ({
    day: getDayLabel(h.date),
    value: h.steps,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barSize={20}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
            borderRadius: "8px",
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v.toLocaleString()}`, "Steps"]}
        />
        <ReferenceLine
          y={10000}
          stroke="#4ADE80"
          strokeDasharray="4 2"
          strokeWidth={1.5}
          label={{ value: "Goal", fontSize: 10, fill: "#4ADE80" }}
        />
        <Bar dataKey="value" radius={[5, 5, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={`steps-${entry.day}`}
              fill={
                entry.value >= 10000
                  ? "#34D399"
                  : entry.value >= 7500
                    ? "#4ADE80"
                    : "#94A3B8"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HabitsPage() {
  const { data: habits, isLoading } = useHabitData();
  const saveHabit = useSaveHabitData();

  const todayData = habits?.find((h) => h.date === todayStr());

  const [water, setWater] = useState<number>(todayData?.waterGlasses ?? 0);
  const [sleep, setSleep] = useState<number>(todayData?.sleepHours ?? 7);
  const [steps, setSteps] = useState<number>(todayData?.steps ?? 0);
  const [saved, setSaved] = useState(false);

  // Sync from loaded data
  useEffect(() => {
    if (todayData) {
      setWater(todayData.waterGlasses);
      setSleep(todayData.sleepHours);
      setSteps(todayData.steps);
    }
  }, [todayData]);

  const handleSave = async () => {
    await saveHabit.mutateAsync({
      date: todayStr(),
      waterGlasses: water,
      sleepHours: sleep,
      steps,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Last 7 days for charts (oldest first)
  const weekData = useMemo(
    () =>
      [...(habits ?? [])]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-7),
    [habits],
  );

  const streaks = useMemo(
    () => ({
      water: calcStreak(habits ?? [], "water"),
      sleep: calcStreak(habits ?? [], "sleep"),
      steps: calcStreak(habits ?? [], "steps"),
    }),
    [habits],
  );

  const { label: sleepQuality, color: sleepColor } = sleepLabel(sleep);

  return (
    <div
      data-ocid="habits.page"
      className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 145), oklch(0.65 0.2 170))",
          }}
        >
          <TrendingUp size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold gradient-text">
            Habit Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your daily wellness habits
          </p>
        </div>
      </div>

      {/* Streak badges */}
      {(streaks.water > 0 || streaks.sleep > 0 || streaks.steps > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          <StreakBadge
            count={streaks.water}
            label="hydration streak"
            color="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
          />
          <StreakBadge
            count={streaks.sleep}
            label="sleep streak"
            color="border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300"
          />
          <StreakBadge
            count={streaks.steps}
            label="steps streak"
            color="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
          />
        </motion.div>
      )}

      {/* Today's Habits */}
      <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-7">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold font-display">Today's Habits</h2>
          {saved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
            >
              <Trophy size={12} /> Saved!
            </motion.span>
          )}
        </div>

        {/* ── Water Intake ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Droplets
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
              <span className="font-medium text-sm">Water Intake</span>
              {water >= 6 && (
                <Badge className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                  Well hydrated! 💧
                </Badge>
              )}
            </div>
            <span className="text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400">
              {water} / 8
            </span>
          </div>
          <ProgressBar
            value={water}
            max={8}
            colorClass={progressColor(water, 8)}
          />
          <div className="flex items-center gap-1.5 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((glass) => (
              <button
                key={`water-glass-${glass}`}
                type="button"
                data-ocid={`habits.water_${glass}.toggle`}
                onClick={() => setWater(glass <= water ? glass - 1 : glass)}
                className={`w-10 h-10 rounded-xl text-lg transition-smooth hover:scale-110 ${
                  glass <= water
                    ? "bg-blue-400 shadow-sm scale-105"
                    : "bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30"
                }`}
                aria-label={`${glass} glasses of water`}
              >
                💧
              </button>
            ))}
          </div>
        </div>

        {/* ── Sleep Hours ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Moon
                  size={14}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
              <span className="font-medium text-sm">Sleep Hours</span>
              <span className={`text-xs font-medium ${sleepColor}`}>
                {sleepQuality}
              </span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-indigo-600 dark:text-indigo-400">
              {sleep}h
            </span>
          </div>
          <ProgressBar
            value={sleep}
            max={9}
            colorClass={
              sleep < 6
                ? "bg-rose-400"
                : sleep < 7
                  ? "bg-amber-400"
                  : "bg-emerald-500"
            }
          />
          <input
            data-ocid="habits.sleep.input"
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
            aria-label="Sleep hours slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0h</span>
            <span className="text-indigo-500 font-medium">Goal: 7–9h</span>
            <span>12h</span>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Footprints
                  size={14}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </div>
              <span className="font-medium text-sm">Steps</span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {steps.toLocaleString()} / 10,000
            </span>
          </div>
          <ProgressBar
            value={steps}
            max={10000}
            colorClass={progressColor(steps, 10000)}
          />
          <p className="text-xs text-muted-foreground">
            {stepsMilestone(steps)}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSteps((s) => Math.max(0, s - 500))}
              className="w-9 h-9 rounded-lg border border-border bg-muted hover:bg-muted/60 flex items-center justify-center text-lg font-bold transition-smooth"
              aria-label="Decrease steps by 500"
            >
              −
            </button>
            <input
              data-ocid="habits.steps.input"
              type="number"
              value={steps}
              onChange={(e) =>
                setSteps(Math.max(0, Number.parseInt(e.target.value) || 0))
              }
              min={0}
              max={99999}
              className="flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-center font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Steps count"
            />
            <button
              type="button"
              onClick={() => setSteps((s) => s + 500)}
              className="w-9 h-9 rounded-lg border border-border bg-muted hover:bg-muted/60 flex items-center justify-center text-lg font-bold transition-smooth"
              aria-label="Increase steps by 500"
            >
              +
            </button>
          </div>
        </div>

        <Button
          data-ocid="habits.save.primary_button"
          className="w-full border-0 text-white h-11"
          style={{ background: "var(--gradient-primary)" }}
          onClick={handleSave}
          disabled={saveHabit.isPending}
        >
          {saveHabit.isPending ? "Saving..." : "Save Today's Habits"}
        </Button>
      </div>

      {/* Weekly Overview */}
      <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4">
        <h2 className="font-semibold font-display flex items-center gap-2">
          <TrendingUp size={16} className="text-muted-foreground" />
          Weekly Overview
        </h2>

        {isLoading ? (
          <Skeleton className="h-52 w-full" />
        ) : weekData.length === 0 ? (
          <div
            data-ocid="habits.chart.empty_state"
            className="h-52 flex flex-col items-center justify-center text-sm text-muted-foreground gap-2"
          >
            <TrendingUp size={32} className="opacity-30" />
            <p>Save today's habits to start your weekly chart</p>
          </div>
        ) : (
          <Tabs defaultValue="water">
            <TabsList className="mb-4">
              <TabsTrigger data-ocid="habits.water_chart.tab" value="water">
                💧 Water
              </TabsTrigger>
              <TabsTrigger data-ocid="habits.sleep_chart.tab" value="sleep">
                🌙 Sleep
              </TabsTrigger>
              <TabsTrigger data-ocid="habits.steps_chart.tab" value="steps">
                👟 Steps
              </TabsTrigger>
            </TabsList>
            <TabsContent value="water">
              <p className="text-xs text-muted-foreground mb-2">
                Daily glasses · Target: 8 glasses
              </p>
              <WaterChart data={weekData} />
            </TabsContent>
            <TabsContent value="sleep">
              <p className="text-xs text-muted-foreground mb-2">
                Sleep hours · Target: 7.5h · Green = good, Yellow = fair, Red =
                poor
              </p>
              <SleepChart data={weekData} />
            </TabsContent>
            <TabsContent value="steps">
              <p className="text-xs text-muted-foreground mb-2">
                Daily steps · Target: 10,000
              </p>
              <StepsChart data={weekData} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Habit Tips */}
      <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4">
        <h2 className="font-semibold font-display flex items-center gap-2">
          <Trophy size={16} className="text-muted-foreground" />
          Healthy Habit Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HABIT_TIPS.map((tip) => (
            <div
              key={tip.tip}
              className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border"
            >
              <span className="text-xl flex-shrink-0">{tip.icon}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
