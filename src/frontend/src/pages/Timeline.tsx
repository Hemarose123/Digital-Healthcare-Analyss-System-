import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Bell,
  Clock,
  Dumbbell,
  Eye,
  FileText,
  Heart,
  Scan,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useHealthTimeline } from "../hooks/useBackend";
import type { TimelineEventType } from "../types/health";

// ─── Type Configuration ───────────────────────────────────────────────────────
const TYPE_CONFIG: Record<
  TimelineEventType,
  { icon: React.ReactNode; color: string; border: string; label: string }
> = {
  mood: {
    icon: <Heart size={15} />,
    color:
      "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    border: "border-l-violet-500",
    label: "Mood",
  },
  symptom: {
    icon: <Activity size={15} />,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    border: "border-l-orange-500",
    label: "Symptom",
  },
  reminder: {
    icon: <Bell size={15} />,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    border: "border-l-amber-500",
    label: "Reminder",
  },
  prescription: {
    icon: <FileText size={15} />,
    color: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400",
    border: "border-l-lime-500",
    label: "Prescription",
  },
  habit: {
    icon: <Scan size={15} />,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    border: "border-l-cyan-500",
    label: "Habit",
  },
  exercise: {
    icon: <Dumbbell size={15} />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    border: "border-l-blue-500",
    label: "Exercise",
  },
  diet: {
    icon: <Eye size={15} />,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    border: "border-l-pink-500",
    label: "Diet",
  },
};

type FilterType = "all" | TimelineEventType;

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mood", label: "Mood" },
  { key: "symptom", label: "Symptoms" },
  { key: "reminder", label: "Reminders" },
  { key: "prescription", label: "Prescriptions" },
  { key: "exercise", label: "Exercise" },
  { key: "diet", label: "Diet" },
  { key: "habit", label: "Habits" },
];

// ─── Date helpers ─────────────────────────────────────────────────────────────
function formatDateGroup(ts: number): string {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en", { month: "short", day: "numeric" });
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PAGE_SIZE = 20;

// ─── SAMPLE DATA (shown when timeline is empty) ───────────────────────────────
const SAMPLE_EVENTS = [
  {
    id: "s1",
    type: "mood" as TimelineEventType,
    title: "Logged morning mood: 😄 Excellent",
    description: "Feeling energetic and ready for the day",
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    id: "s2",
    type: "habit" as TimelineEventType,
    title: "Habit check-in saved",
    description: "Water: 6/8 · Sleep: 7.5h · Steps: 8,420",
    timestamp: Date.now() - 1000 * 60 * 90,
  },
  {
    id: "s3",
    type: "reminder" as TimelineEventType,
    title: "Medicine: Vitamin D3 — marked as taken",
    description: "1000 IU · Morning dose",
    timestamp: Date.now() - 1000 * 60 * 120,
  },
  {
    id: "s4",
    type: "symptom" as TimelineEventType,
    title: "Symptom check: Mild headache",
    description: "Severity: Yellow · Suggested hydration and rest",
    timestamp: Date.now() - 1000 * 3600 * 26,
  },
  {
    id: "s5",
    type: "prescription" as TimelineEventType,
    title: "Prescription scanned — 3 medicines detected",
    description: "Metformin 500mg, Lisinopril 10mg, Atorvastatin 20mg",
    timestamp: Date.now() - 1000 * 3600 * 48,
  },
];

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
}: {
  event: (typeof SAMPLE_EVENTS)[0];
  index: number;
}) {
  const config = TYPE_CONFIG[event.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      data-ocid={`timeline.event.item.${index + 1}`}
      className={`relative bg-card rounded-xl border border-l-4 ${config.border} border-border shadow-subtle p-4 flex gap-3 card-hover`}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[22px] top-5 w-3 h-3 rounded-full border-2 border-primary/40 bg-card hidden sm:block" />

      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}
      >
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <p className="font-medium text-sm leading-snug">{event.title}</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="secondary" className="text-xs px-2">
              {config.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatTime(event.timestamp)}
            </span>
          </div>
        </div>
        {event.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {event.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TimelinePage() {
  const { data: events, isLoading } = useHealthTimeline();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Merge real events with samples when empty
  const allEvents = (events ?? []).length > 0 ? (events ?? []) : SAMPLE_EVENTS;

  const filtered = useMemo(() => {
    let result = [...allEvents].sort((a, b) => b.timestamp - a.timestamp);
    if (filter !== "all") result = result.filter((e) => e.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [allEvents, filter, search]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const e of paginated) {
      const key = formatDateGroup(e.timestamp);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return map;
  }, [paginated]);

  const isEmpty = filtered.length === 0;
  const hasMore = filtered.length > paginated.length;

  return (
    <div
      data-ocid="timeline.page"
      className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.15 170), oklch(0.55 0.18 200))",
            }}
          >
            <Clock size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold gradient-text">
              Health Timeline
            </h1>
            <p className="text-sm text-muted-foreground">
              Your complete health activity history
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          data-ocid="timeline.search.input"
          placeholder="Search timeline events..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="pl-9 pr-9 bg-card"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div data-ocid="timeline.filter.tab" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              setFilter(f.key);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth border ${
              filter === f.key
                ? "border-primary/60 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
            style={
              filter === f.key
                ? { background: "oklch(var(--primary) / 0.08)" }
                : {}
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {["a", "b", "c", "d", "e"].map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : isEmpty ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          data-ocid="timeline.events.empty_state"
          className="text-center py-20 bg-card rounded-2xl border border-border"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.15 170 / 0.15), oklch(0.55 0.24 250 / 0.15))",
            }}
          >
            <Clock size={32} className="text-muted-foreground/60" />
          </div>
          <p className="font-semibold text-lg mb-1">
            Your health journey starts here
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            {search
              ? "No events match your search. Try different keywords."
              : "Start logging moods, symptoms, or habits to build your health history."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {Array.from(grouped.entries()).map(([dateGroup, dateEvents]) => (
              <motion.div
                key={dateGroup}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Date group header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2 bg-background">
                    {dateGroup}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Events for this date */}
                <div className="relative sm:pl-6 space-y-3">
                  {/* Vertical line */}
                  <div className="absolute left-[5px] top-0 bottom-0 w-px bg-border hidden sm:block" />

                  {dateEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Load more */}
          {hasMore && (
            <div className="text-center">
              <Button
                data-ocid="timeline.load_more.button"
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                className="px-8"
              >
                Load more events ({filtered.length - paginated.length}{" "}
                remaining)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
