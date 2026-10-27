import { r as reactExports, j as jsxRuntimeExports, m as motion, b as AnimatePresence, B as Button, e as Skeleton, f as ue } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { b as useMoodEntries, a as useAddMoodEntry, c as useAddTimelineEvent } from "./useBackend-CQZwdIO-.js";
import { R as ResponsiveContainer, T as Tooltip, o as ReferenceLine } from "./generateCategoricalChart-C3DVtk1M.js";
import { L as LineChart, a as Line } from "./LineChart-BJWWMH35.js";
import { C as CartesianGrid } from "./CartesianGrid-tZn-NWhG.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BcFCfMJl.js";
const MOODS = [
  {
    level: 1,
    emoji: "😢",
    label: "Very Low",
    description: "Struggling today",
    gradient: "from-red-400 to-red-600",
    ring: "ring-red-400"
  },
  {
    level: 2,
    emoji: "😔",
    label: "Low",
    description: "Below average",
    gradient: "from-orange-400 to-orange-600",
    ring: "ring-orange-400"
  },
  {
    level: 3,
    emoji: "😐",
    label: "Okay",
    description: "Getting by",
    gradient: "from-yellow-400 to-yellow-600",
    ring: "ring-yellow-400"
  },
  {
    level: 4,
    emoji: "🙂",
    label: "Good",
    description: "Feeling positive",
    gradient: "from-teal-400 to-teal-600",
    ring: "ring-teal-400"
  },
  {
    level: 5,
    emoji: "😄",
    label: "Excellent",
    description: "On top of the world",
    gradient: "from-blue-400 to-blue-600",
    ring: "ring-blue-400"
  }
];
const RANGE_LABELS = {
  7: "7 days",
  30: "30 days",
  90: "90 days"
};
function getMoodLabel(level) {
  return MOODS.find((m) => m.level === level);
}
function formatDate(ts, range) {
  const d = new Date(ts);
  if (range <= 7) {
    return d.toLocaleDateString("en", { weekday: "short" });
  }
  return d.toLocaleDateString("en", { day: "2-digit", month: "2-digit" });
}
function MoodPage() {
  var _a, _b;
  const { data: entries, isLoading } = useMoodEntries();
  const addMood = useAddMoodEntry();
  const addTimeline = useAddTimelineEvent();
  const [selected, setSelected] = reactExports.useState(null);
  const [note, setNote] = reactExports.useState("");
  const [range, setRange] = reactExports.useState(30);
  const [justLogged, setJustLogged] = reactExports.useState(false);
  const handleLog = async () => {
    if (!selected) return;
    const moodItem = MOODS.find((m) => m.level === selected);
    await addMood.mutateAsync({
      mood: selected,
      emoji: moodItem.emoji,
      note: note || void 0
    });
    await addTimeline.mutateAsync({
      type: "mood",
      title: `Mood: ${moodItem.label}`,
      description: note || `Logged mood as ${moodItem.label} (${moodItem.emoji})`
    });
    ue.success(`Mood logged: ${moodItem.emoji} ${moodItem.label}`);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 3e3);
    setSelected(null);
    setNote("");
  };
  const cutoff = Date.now() - range * 24 * 60 * 60 * 1e3;
  const chartData = reactExports.useMemo(() => {
    return (entries ?? []).filter((e) => e.timestamp >= cutoff).sort((a, b) => a.timestamp - b.timestamp).map((e) => ({
      date: formatDate(e.timestamp, range),
      mood: e.mood,
      rawTs: e.timestamp
    }));
  }, [entries, cutoff, range]);
  const avgMood = chartData.length > 0 ? Math.round(
    chartData.reduce((s, d) => s + d.mood, 0) / chartData.length * 10
  ) / 10 : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "mood.page",
      className: "p-4 md:p-6 space-y-6 max-w-4xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🌟" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold gradient-text", children: "Mood Tracker" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track your emotional wellbeing over time" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "How are you feeling right now?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: justLogged && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.8 },
                    className: "text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full",
                    children: "✓ Logged!"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 sm:gap-3", children: MOODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  "data-ocid": `mood.emoji_${m.level}.radio`,
                  onClick: () => setSelected(m.level),
                  whileHover: { scale: 1.08 },
                  whileTap: { scale: 0.95 },
                  animate: selected === m.level ? { scale: 1.12 } : { scale: 1 },
                  className: `flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected === m.level ? `border-transparent ring-2 ${m.ring} bg-gradient-to-br ${m.gradient} text-white shadow-elevated` : "border-border hover:border-primary/40 bg-background"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-2xl sm:text-3xl leading-none ${selected === m.level ? "drop-shadow-sm" : ""}`,
                        children: m.emoji
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] sm:text-xs font-semibold ${selected === m.level ? "text-white" : "text-muted-foreground"}`,
                        children: m.label
                      }
                    )
                  ]
                },
                m.level
              )) }),
              selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  className: "text-sm text-muted-foreground text-center",
                  children: (_a = MOODS.find((m) => m.level === selected)) == null ? void 0 : _a.description
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "mood-note",
                    className: "text-xs font-medium text-muted-foreground",
                    children: "Add a note (optional)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "mood-note",
                    "data-ocid": "mood.note.textarea",
                    value: note,
                    onChange: (e) => setNote(e.target.value),
                    placeholder: "How are you feeling? (optional)",
                    rows: 2,
                    maxLength: 300,
                    className: "w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors placeholder:text-muted-foreground/60"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-xs text-muted-foreground", children: [
                  note.length,
                  "/300"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "mood.log.primary_button",
                  className: "gradient-primary border-0 text-white w-full sm:w-auto font-semibold shadow-subtle hover:shadow-elevated transition-shadow",
                  disabled: !selected || addMood.isPending,
                  onClick: handleLog,
                  children: addMood.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" }),
                    "Logging..."
                  ] }) : "Log Mood 🌟"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.2 },
            className: "bg-card rounded-2xl border border-border shadow-subtle p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Mood History" }),
                  avgMood !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Avg:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
                      avgMood,
                      "/5"
                    ] }),
                    " · ",
                    (_b = getMoodLabel(Math.round(avgMood))) == null ? void 0 : _b.emoji
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": "mood.range.toggle",
                    className: "flex rounded-xl overflow-hidden border border-border",
                    children: Object.keys(RANGE_LABELS).map(
                      (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `mood.range_${r}.tab`,
                          onClick: () => setRange(Number(r)),
                          className: `px-3 py-1.5 text-xs font-medium transition-colors ${range === Number(r) ? "gradient-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
                          children: RANGE_LABELS[r]
                        },
                        r
                      )
                    )
                  }
                )
              ] }),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl" }) : chartData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "mood.history.empty_state",
                  className: "h-52 flex flex-col items-center justify-center gap-3 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl opacity-40", children: "📊" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "No mood data for this period" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Log your first mood above to see your chart here!" })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                LineChart,
                {
                  data: chartData,
                  margin: { top: 8, right: 8, left: -20, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "#e2e8f0",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "date",
                        tick: { fontSize: 10 },
                        axisLine: false,
                        tickLine: false,
                        interval: range === 7 ? 0 : range === 30 ? 4 : 9
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        domain: [1, 5],
                        ticks: [1, 2, 3, 4, 5],
                        tick: { fontSize: 10 },
                        axisLine: false,
                        tickLine: false,
                        tickFormatter: (v) => {
                          var _a2;
                          return ((_a2 = getMoodLabel(v)) == null ? void 0 : _a2.emoji) ?? String(v);
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        contentStyle: {
                          borderRadius: "12px",
                          fontSize: 12,
                          border: "1px solid #e2e8f0"
                        },
                        formatter: (val) => {
                          var _a2, _b2;
                          return [
                            `${((_a2 = getMoodLabel(val)) == null ? void 0 : _a2.emoji) ?? ""} ${((_b2 = getMoodLabel(val)) == null ? void 0 : _b2.label) ?? val}`,
                            "Mood"
                          ];
                        }
                      }
                    ),
                    avgMood !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ReferenceLine,
                      {
                        y: avgMood,
                        stroke: "#3b82f6",
                        strokeOpacity: 0.3,
                        strokeDasharray: "4 4"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Line,
                      {
                        type: "monotone",
                        dataKey: "mood",
                        stroke: "var(--health-blue)",
                        strokeWidth: 3,
                        dot: {
                          fill: "var(--health-blue)",
                          r: 4,
                          strokeWidth: 2,
                          stroke: "#fff"
                        },
                        activeDot: {
                          r: 6,
                          fill: "var(--health-teal)",
                          stroke: "#fff",
                          strokeWidth: 2
                        }
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.3 },
            className: "bg-card rounded-2xl border border-border shadow-subtle p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4", children: "Recent Entries" }),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) }) : (entries ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "mood.recent.empty_state",
                  className: "py-8 flex flex-col items-center gap-2 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl opacity-30", children: "😶" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No entries yet. Start by logging your mood above!" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (entries ?? []).slice(0, 10).map((e, i) => {
                const m = MOODS.find((x) => x.level === e.mood);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    "data-ocid": `mood.entry.item.${i + 1}`,
                    initial: { opacity: 0, x: -8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.04 },
                    className: "flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${(m == null ? void 0 : m.gradient) ?? "from-primary to-accent"} shadow-subtle flex-shrink-0`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: m == null ? void 0 : m.emoji })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: m == null ? void 0 : m.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Badge,
                            {
                              variant: "secondary",
                              className: "text-xs px-1.5 py-0",
                              children: [
                                e.mood,
                                "/5"
                              ]
                            }
                          )
                        ] }),
                        e.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: e.note })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground text-right flex-shrink-0", children: [
                        new Date(e.timestamp).toLocaleDateString("en", {
                          month: "short",
                          day: "numeric"
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        new Date(e.timestamp).toLocaleTimeString("en", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      ] })
                    ]
                  },
                  e.id
                );
              }) })
            ]
          }
        )
      ]
    }
  );
}
export {
  MoodPage as default
};
