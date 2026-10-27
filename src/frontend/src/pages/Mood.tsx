import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  useAddMoodEntry,
  useAddTimelineEvent,
  useMoodEntries,
} from "../hooks/useBackend";
import type { MoodEmoji, MoodLevel } from "../types/health";

const MOODS: {
  level: MoodLevel;
  emoji: MoodEmoji;
  label: string;
  description: string;
  gradient: string;
  ring: string;
}[] = [
  {
    level: 1,
    emoji: "😢",
    label: "Very Low",
    description: "Struggling today",
    gradient: "from-red-400 to-red-600",
    ring: "ring-red-400",
  },
  {
    level: 2,
    emoji: "😔",
    label: "Low",
    description: "Below average",
    gradient: "from-orange-400 to-orange-600",
    ring: "ring-orange-400",
  },
  {
    level: 3,
    emoji: "😐",
    label: "Okay",
    description: "Getting by",
    gradient: "from-yellow-400 to-yellow-600",
    ring: "ring-yellow-400",
  },
  {
    level: 4,
    emoji: "🙂",
    label: "Good",
    description: "Feeling positive",
    gradient: "from-teal-400 to-teal-600",
    ring: "ring-teal-400",
  },
  {
    level: 5,
    emoji: "😄",
    label: "Excellent",
    description: "On top of the world",
    gradient: "from-blue-400 to-blue-600",
    ring: "ring-blue-400",
  },
];

type RangeOption = 7 | 30 | 90;

const RANGE_LABELS: Record<RangeOption, string> = {
  7: "7 days",
  30: "30 days",
  90: "90 days",
};

function getMoodLabel(level: number) {
  return MOODS.find((m) => m.level === level);
}

function formatDate(ts: number, range: RangeOption) {
  const d = new Date(ts);
  if (range <= 7) {
    return d.toLocaleDateString("en", { weekday: "short" });
  }
  return d.toLocaleDateString("en", { day: "2-digit", month: "2-digit" });
}

export default function MoodPage() {
  const { data: entries, isLoading } = useMoodEntries();
  const addMood = useAddMoodEntry();
  const addTimeline = useAddTimelineEvent();
  const [selected, setSelected] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState("");
  const [range, setRange] = useState<RangeOption>(30);
  const [justLogged, setJustLogged] = useState(false);

  const handleLog = async () => {
    if (!selected) return;
    const moodItem = MOODS.find((m) => m.level === selected)!;
    await addMood.mutateAsync({
      mood: selected,
      emoji: moodItem.emoji,
      note: note || undefined,
    });
    await addTimeline.mutateAsync({
      type: "mood",
      title: `Mood: ${moodItem.label}`,
      description:
        note || `Logged mood as ${moodItem.label} (${moodItem.emoji})`,
    });
    toast.success(`Mood logged: ${moodItem.emoji} ${moodItem.label}`);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 3000);
    setSelected(null);
    setNote("");
  };

  const cutoff = Date.now() - range * 24 * 60 * 60 * 1000;
  const chartData = useMemo(() => {
    return (entries ?? [])
      .filter((e) => e.timestamp >= cutoff)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((e) => ({
        date: formatDate(e.timestamp, range),
        mood: e.mood,
        rawTs: e.timestamp,
      }));
  }, [entries, cutoff, range]);

  const avgMood =
    chartData.length > 0
      ? Math.round(
          (chartData.reduce((s, d) => s + d.mood, 0) / chartData.length) * 10,
        ) / 10
      : null;

  return (
    <div
      data-ocid="mood.page"
      className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-subtle">
          <span className="text-2xl">🌟</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold gradient-text">
            Mood Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your emotional wellbeing over time
          </p>
        </div>
      </motion.div>

      {/* Mood Logging Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            How are you feeling right now?
          </h2>
          <AnimatePresence>
            {justLogged && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full"
              >
                ✓ Logged!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Emoji Row */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {MOODS.map((m) => (
            <motion.button
              key={m.level}
              type="button"
              data-ocid={`mood.emoji_${m.level}.radio`}
              onClick={() => setSelected(m.level)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={selected === m.level ? { scale: 1.12 } : { scale: 1 }}
              className={`flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected === m.level
                  ? `border-transparent ring-2 ${m.ring} bg-gradient-to-br ${m.gradient} text-white shadow-elevated`
                  : "border-border hover:border-primary/40 bg-background"
              }`}
            >
              <span
                className={`text-2xl sm:text-3xl leading-none ${selected === m.level ? "drop-shadow-sm" : ""}`}
              >
                {m.emoji}
              </span>
              <span
                className={`text-[10px] sm:text-xs font-semibold ${selected === m.level ? "text-white" : "text-muted-foreground"}`}
              >
                {m.label}
              </span>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-muted-foreground text-center"
          >
            {MOODS.find((m) => m.level === selected)?.description}
          </motion.p>
        )}

        {/* Note textarea */}
        <div className="space-y-1.5">
          <label
            htmlFor="mood-note"
            className="text-xs font-medium text-muted-foreground"
          >
            Add a note (optional)
          </label>
          <textarea
            id="mood-note"
            data-ocid="mood.note.textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you feeling? (optional)"
            rows={2}
            maxLength={300}
            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors placeholder:text-muted-foreground/60"
          />
          <div className="text-right text-xs text-muted-foreground">
            {note.length}/300
          </div>
        </div>

        <Button
          data-ocid="mood.log.primary_button"
          className="gradient-primary border-0 text-white w-full sm:w-auto font-semibold shadow-subtle hover:shadow-elevated transition-shadow"
          disabled={!selected || addMood.isPending}
          onClick={handleLog}
        >
          {addMood.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Logging...
            </span>
          ) : (
            "Log Mood 🌟"
          )}
        </Button>
      </motion.div>

      {/* Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-card rounded-2xl border border-border shadow-subtle p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="font-semibold text-foreground">Mood History</h2>
            {avgMood !== null && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Avg:{" "}
                <span className="font-semibold text-primary">{avgMood}/5</span>
                {" · "}
                {getMoodLabel(Math.round(avgMood))?.emoji}
              </p>
            )}
          </div>
          <div
            data-ocid="mood.range.toggle"
            className="flex rounded-xl overflow-hidden border border-border"
          >
            {(Object.keys(RANGE_LABELS) as unknown as RangeOption[]).map(
              (r) => (
                <button
                  type="button"
                  key={r}
                  data-ocid={`mood.range_${r}.tab`}
                  onClick={() => setRange(Number(r) as RangeOption)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    range === Number(r)
                      ? "gradient-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {RANGE_LABELS[r]}
                </button>
              ),
            )}
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-52 w-full rounded-xl" />
        ) : chartData.length === 0 ? (
          <div
            data-ocid="mood.history.empty_state"
            className="h-52 flex flex-col items-center justify-center gap-3 text-center"
          >
            <span className="text-5xl opacity-40">📊</span>
            <div>
              <p className="font-medium text-muted-foreground">
                No mood data for this period
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Log your first mood above to see your chart here!
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={range === 7 ? 0 : range === 30 ? 4 : 9}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  getMoodLabel(v)?.emoji ?? String(v)
                }
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  fontSize: 12,
                  border: "1px solid #e2e8f0",
                }}
                formatter={(val: number) => [
                  `${getMoodLabel(val)?.emoji ?? ""} ${getMoodLabel(val)?.label ?? val}`,
                  "Mood",
                ]}
              />
              {avgMood !== null && (
                <ReferenceLine
                  y={avgMood}
                  stroke="#3b82f6"
                  strokeOpacity={0.3}
                  strokeDasharray="4 4"
                />
              )}
              <Line
                type="monotone"
                dataKey="mood"
                stroke="var(--health-blue)"
                strokeWidth={3}
                dot={{
                  fill: "var(--health-blue)",
                  r: 4,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 6,
                  fill: "var(--health-teal)",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-card rounded-2xl border border-border shadow-subtle p-6"
      >
        <h2 className="font-semibold mb-4">Recent Entries</h2>
        {isLoading ? (
          <div className="space-y-3">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : (entries ?? []).length === 0 ? (
          <div
            data-ocid="mood.recent.empty_state"
            className="py-8 flex flex-col items-center gap-2 text-center"
          >
            <span className="text-4xl opacity-30">😶</span>
            <p className="text-sm text-muted-foreground">
              No entries yet. Start by logging your mood above!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {(entries ?? []).slice(0, 10).map((e, i) => {
              const m = MOODS.find((x) => x.level === e.mood);
              return (
                <motion.div
                  key={e.id}
                  data-ocid={`mood.entry.item.${i + 1}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${m?.gradient ?? "from-primary to-accent"} shadow-subtle flex-shrink-0`}
                  >
                    <span className="text-xl">{m?.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{m?.label}</p>
                      <Badge
                        variant="secondary"
                        className="text-xs px-1.5 py-0"
                      >
                        {e.mood}/5
                      </Badge>
                    </div>
                    {e.note && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {e.note}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground text-right flex-shrink-0">
                    {new Date(e.timestamp).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    {new Date(e.timestamp).toLocaleTimeString("en", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
