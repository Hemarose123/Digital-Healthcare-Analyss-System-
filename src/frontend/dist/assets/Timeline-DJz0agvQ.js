import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, s as Search, n as Input, e as Skeleton, m as motion, b as AnimatePresence, B as Button, l as Bell, A as Activity, H as Heart } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { r as useHealthTimeline } from "./useBackend-CQZwdIO-.js";
import { C as Clock } from "./clock-CPHLWhlK.js";
import { X } from "./x-D2fkv8yI.js";
import { D as Dumbbell } from "./dumbbell-DVksrSyf.js";
import { S as Scan } from "./scan-DJjIDaj-.js";
import { F as FileText } from "./file-text-Cj6z7ylN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
const TYPE_CONFIG = {
  mood: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 15 }),
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    border: "border-l-violet-500",
    label: "Mood"
  },
  symptom: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 15 }),
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    border: "border-l-orange-500",
    label: "Symptom"
  },
  reminder: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 15 }),
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    border: "border-l-amber-500",
    label: "Reminder"
  },
  prescription: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 15 }),
    color: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400",
    border: "border-l-lime-500",
    label: "Prescription"
  },
  habit: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { size: 15 }),
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    border: "border-l-cyan-500",
    label: "Habit"
  },
  exercise: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { size: 15 }),
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    border: "border-l-blue-500",
    label: "Exercise"
  },
  diet: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }),
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    border: "border-l-pink-500",
    label: "Diet"
  }
};
const FILTERS = [
  { key: "all", label: "All" },
  { key: "mood", label: "Mood" },
  { key: "symptom", label: "Symptoms" },
  { key: "reminder", label: "Reminders" },
  { key: "prescription", label: "Prescriptions" },
  { key: "exercise", label: "Exercise" },
  { key: "diet", label: "Diet" },
  { key: "habit", label: "Habits" }
];
function formatDateGroup(ts) {
  const d = new Date(ts);
  const today = /* @__PURE__ */ new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en", { month: "short", day: "numeric" });
}
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
const PAGE_SIZE = 20;
const SAMPLE_EVENTS = [
  {
    id: "s1",
    type: "mood",
    title: "Logged morning mood: 😄 Excellent",
    description: "Feeling energetic and ready for the day",
    timestamp: Date.now() - 1e3 * 60 * 30
  },
  {
    id: "s2",
    type: "habit",
    title: "Habit check-in saved",
    description: "Water: 6/8 · Sleep: 7.5h · Steps: 8,420",
    timestamp: Date.now() - 1e3 * 60 * 90
  },
  {
    id: "s3",
    type: "reminder",
    title: "Medicine: Vitamin D3 — marked as taken",
    description: "1000 IU · Morning dose",
    timestamp: Date.now() - 1e3 * 60 * 120
  },
  {
    id: "s4",
    type: "symptom",
    title: "Symptom check: Mild headache",
    description: "Severity: Yellow · Suggested hydration and rest",
    timestamp: Date.now() - 1e3 * 3600 * 26
  },
  {
    id: "s5",
    type: "prescription",
    title: "Prescription scanned — 3 medicines detected",
    description: "Metformin 500mg, Lisinopril 10mg, Atorvastatin 20mg",
    timestamp: Date.now() - 1e3 * 3600 * 48
  }
];
function EventCard({
  event,
  index
}) {
  const config = TYPE_CONFIG[event.type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.05, duration: 0.3 },
      "data-ocid": `timeline.event.item.${index + 1}`,
      className: `relative bg-card rounded-xl border border-l-4 ${config.border} border-border shadow-subtle p-4 flex gap-3 card-hover`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-[22px] top-5 w-3 h-3 rounded-full border-2 border-primary/40 bg-card hidden sm:block" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`,
            children: config.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm leading-snug", children: event.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs px-2", children: config.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTime(event.timestamp) })
            ] })
          ] }),
          event.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: event.description })
        ] })
      ]
    }
  );
}
function TimelinePage() {
  const { data: events, isLoading } = useHealthTimeline();
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const allEvents = (events ?? []).length > 0 ? events ?? [] : SAMPLE_EVENTS;
  const filtered = reactExports.useMemo(() => {
    let result = [...allEvents].sort((a, b) => b.timestamp - a.timestamp);
    if (filter !== "all") result = result.filter((e) => e.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) => {
          var _a;
          return e.title.toLowerCase().includes(q) || ((_a = e.description) == null ? void 0 : _a.toLowerCase().includes(q));
        }
      );
    }
    return result;
  }, [allEvents, filter, search]);
  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const grouped = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const e of paginated) {
      const key = formatDateGroup(e.timestamp);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(e);
    }
    return map;
  }, [paginated]);
  const isEmpty = filtered.length === 0;
  const hasMore = filtered.length > paginated.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "timeline.page",
      className: "p-4 sm:p-6 space-y-6 max-w-3xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.6 0.15 170), oklch(0.55 0.18 200))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 20, className: "text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold gradient-text", children: "Health Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your complete health activity history" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 16,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "timeline.search.input",
              placeholder: "Search timeline events...",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
                setPage(1);
              },
              className: "pl-9 pr-9 bg-card"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "timeline.filter.tab", className: "flex flex-wrap gap-2", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setFilter(f.key);
              setPage(1);
            },
            className: `px-3 py-1.5 rounded-full text-xs font-medium transition-smooth border ${filter === f.key ? "border-primary/60 text-primary" : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"}`,
            style: filter === f.key ? { background: "oklch(var(--primary) / 0.08)" } : {},
            children: f.label
          },
          f.key
        )) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            "data-ocid": "timeline.events.empty_state",
            className: "text-center py-20 bg-card rounded-2xl border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.6 0.15 170 / 0.15), oklch(0.55 0.24 250 / 0.15))"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32, className: "text-muted-foreground/60" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg mb-1", children: "Your health journey starts here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mx-auto", children: search ? "No events match your search. Try different keywords." : "Start logging moods, symptoms, or habits to build your health history." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: Array.from(grouped.entries()).map(([dateGroup, dateEvents]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest px-2 bg-background", children: dateGroup }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:pl-6 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[5px] top-0 bottom-0 w-px bg-border hidden sm:block" }),
                  dateEvents.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event, index: i }, event.id))
                ] })
              ]
            },
            dateGroup
          )) }),
          hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "timeline.load_more.button",
              variant: "outline",
              onClick: () => setPage((p) => p + 1),
              className: "px-8",
              children: [
                "Load more events (",
                filtered.length - paginated.length,
                " ",
                "remaining)"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  TimelinePage as default
};
