import { c as createLucideIcon, a as useHealthStore, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, e as Skeleton, A as Activity, H as Heart, f as ue } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { b as useMoodEntries, l as useMedicineReminders, v as useHabitData, r as useHealthTimeline } from "./useBackend-CQZwdIO-.js";
import { F as FileText } from "./file-text-Cj6z7ylN.js";
import { C as CircleCheckBig } from "./circle-check-big-SKm4cL5v.js";
import { C as ClipboardCopy } from "./clipboard-copy-DU4uDK_Z.js";
import { L as LoaderCircle } from "./loader-circle-BvT_2oqR.js";
import { R as ResponsiveContainer, T as Tooltip } from "./generateCategoricalChart-C3DVtk1M.js";
import { L as LineChart, a as Line } from "./LineChart-BJWWMH35.js";
import { C as CartesianGrid } from "./CartesianGrid-tZn-NWhG.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BcFCfMJl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
function HealthScoreRing({ score }) {
  const r = 44;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * (score / 100);
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Needs Work";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: 120,
        height: 120,
        viewBox: "0 0 120 120",
        role: "img",
        "aria-label": `Health score: ${score} out of 100`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
            "Health Score: ",
            score,
            "/100"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rptGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3B82F6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#14B8A6" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: 60,
              cy: 60,
              r,
              fill: "none",
              stroke: "#e5e7eb",
              strokeWidth: 10
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: 60,
              cy: 60,
              r,
              fill: "none",
              stroke: "url(#rptGradient)",
              strokeWidth: 10,
              strokeLinecap: "round",
              strokeDasharray: `${filled} ${circumference - filled}`,
              strokeDashoffset: circumference * 0.25,
              style: { transition: "stroke-dasharray 1s ease-in-out" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: 60,
              y: 56,
              textAnchor: "middle",
              fontSize: 22,
              fontWeight: "bold",
              fill: "currentColor",
              children: score
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 60, y: 72, textAnchor: "middle", fontSize: 10, fill: "#6b7280", children: "/ 100" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: label })
  ] });
}
function ProgressBar({
  value,
  max,
  color
}) {
  const pct = Math.min(100, Math.round(value / max * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-[#e5e7eb] overflow-hidden print:bg-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-full rounded-full transition-all duration-700",
      style: { width: `${pct}%`, background: color }
    }
  ) });
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h3",
    {
      className: "font-display font-semibold text-xs uppercase tracking-widest mb-3",
      style: { color: "#3B82F6" },
      children
    }
  );
}
function getWellnessTips(avgMood, avgWater, avgSleep) {
  const tips = [];
  if (avgMood < 3)
    tips.push(
      "Your mood trend indicates elevated stress. Consider 10 minutes of deep breathing or guided meditation daily."
    );
  else
    tips.push(
      "Your mood has been positive. Keep up consistent journaling and mindfulness to sustain this momentum."
    );
  if (avgWater < 6)
    tips.push(
      "You're averaging below the recommended 8 glasses of water. Carry a reusable bottle and set hourly reminders to hydrate."
    );
  else
    tips.push(
      "Excellent hydration! Staying well-hydrated supports energy levels, digestion, and skin health."
    );
  if (avgSleep < 7)
    tips.push(
      "Your sleep average is below the 7–9 hour recommendation. Try a consistent sleep schedule and limit screens 1 hour before bed."
    );
  else
    tips.push(
      "Your sleep hours are healthy. Maintain a relaxing bedtime routine to optimize sleep quality further."
    );
  return tips.slice(0, 3);
}
const eventEmoji = {
  mood: "😊",
  symptom: "🩺",
  reminder: "💊",
  prescription: "📋",
  habit: "📊",
  exercise: "🏃",
  diet: "🥗"
};
function ReportPage() {
  const { userProfile } = useHealthStore();
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [isCopied, setIsCopied] = reactExports.useState(false);
  const { data: moods, isLoading: moodsLoading } = useMoodEntries();
  const { data: reminders, isLoading: remindersLoading } = useMedicineReminders();
  const { data: habits, isLoading: habitsLoading } = useHabitData();
  const { data: timeline, isLoading: timelineLoading } = useHealthTimeline();
  const isLoading = moodsLoading || remindersLoading || habitsLoading || timelineLoading;
  const avgMoodRaw = (moods == null ? void 0 : moods.length) ? moods.reduce((s, m) => s + m.mood, 0) / moods.length : 3;
  const avgMood = Number(avgMoodRaw.toFixed(1));
  const avgWaterRaw = (habits == null ? void 0 : habits.length) ? habits.reduce((s, h) => s + h.waterGlasses, 0) / habits.length : 0;
  const avgWater = Number(avgWaterRaw.toFixed(1));
  const avgSleepRaw = (habits == null ? void 0 : habits.length) ? habits.reduce((s, h) => s + h.sleepHours, 0) / habits.length : 0;
  const avgSleep = Number(avgSleepRaw.toFixed(1));
  const avgStepsRaw = (habits == null ? void 0 : habits.length) ? habits.reduce((s, h) => s + h.steps, 0) / habits.length : 0;
  const avgSteps = Math.round(avgStepsRaw);
  const moodScore = Math.round(avgMood / 5 * 25);
  const waterScore = Math.round(Math.min(1, avgWater / 8) * 25);
  const sleepScore = Math.round(Math.min(1, avgSleep / 8) * 25);
  const stepsScore = Math.round(Math.min(1, avgSteps / 1e4) * 25);
  const healthScore = moodScore + waterScore + sleepScore + stepsScore;
  const moodChartData = (moods ?? []).slice(0, 7).reverse().map((m, i) => ({
    day: `D${i + 1}`,
    mood: m.mood
  }));
  const activeReminders = (reminders ?? []).filter((r) => r.isActive);
  const takenCount = activeReminders.filter((r) => r.takenToday).length;
  const adherencePct = activeReminders.length ? Math.round(takenCount / activeReminders.length * 100) : 0;
  const recentEvents = (timeline ?? []).slice(0, 5);
  const wellnessTips = getWellnessTips(avgMood, avgWater, avgSleep);
  const reportDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const handleDownloadPDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
      ue.success("Report ready — use your browser's Save as PDF option");
    }, 600);
  };
  const handleCopyForDoctor = async () => {
    const text = `AI HEALTH COMPANION — REPORT (${reportDate})
Patient: ${(userProfile == null ? void 0 : userProfile.name) ?? "Anonymous"} | Age: ${(userProfile == null ? void 0 : userProfile.age) ?? "—"} | Lifestyle: ${(userProfile == null ? void 0 : userProfile.lifestyle) ?? "—"}
Health Goals: ${((userProfile == null ? void 0 : userProfile.goals) ?? []).map((g) => g.replace("_", " ")).join(", ")}
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
      ue.success("Health summary copied to clipboard");
      setTimeout(() => setIsCopied(false), 3e3);
    } catch {
      ue.error("Failed to copy — please try again");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "report.page",
        className: "p-4 sm:p-6 space-y-6 max-w-4xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "flex items-start justify-between flex-wrap gap-4 no-print",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg gradient-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16, className: "text-white" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Health Report" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground ml-10", children: "Your comprehensive AI-generated wellness summary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      "data-ocid": "report.share.secondary_button",
                      onClick: handleCopyForDoctor,
                      className: "gap-2 transition-smooth",
                      children: [
                        isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 15, className: "text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { size: 15 }),
                        "Share with Doctor"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "report.download.primary_button",
                      className: "gradient-primary border-0 text-white gap-2 transition-smooth hover:opacity-90",
                      onClick: handleDownloadPDF,
                      disabled: isGenerating,
                      children: [
                        isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
                        isGenerating ? "Generating…" : "Download PDF Report"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-2xl" }, k)) }) : (
            /* ── Report card (printable) ─────────────────────────────────────── */
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                id: "health-report",
                "data-ocid": "report.content.card",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.1 },
                className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden print-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-primary p-6 text-white relative overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "absolute right-6 top-4 w-24 h-24" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 22, className: "text-white" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold", children: "AI Health Companion" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/75", children: "Personal Health Report" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between flex-wrap gap-2 text-sm text-white/80", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "📅 Generated: ",
                        reportDate
                      ] }),
                      userProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-white", children: [
                        "👤 ",
                        userProfile.name
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Health Score" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-muted/30 rounded-xl p-5 print-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthScoreRing, { score: healthScore }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid grid-cols-2 gap-3 w-full", children: [
                          {
                            label: "Mood",
                            score: moodScore,
                            max: 25,
                            color: "#818CF8"
                          },
                          {
                            label: "Hydration",
                            score: waterScore,
                            max: 25,
                            color: "#38BDF8"
                          },
                          {
                            label: "Sleep",
                            score: sleepScore,
                            max: 25,
                            color: "#A78BFA"
                          },
                          {
                            label: "Activity",
                            score: stepsScore,
                            max: 25,
                            color: "#34D399"
                          }
                        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                              s.score,
                              "/25"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ProgressBar,
                            {
                              value: s.score,
                              max: s.max,
                              color: s.color
                            }
                          )
                        ] }, s.label)) })
                      ] })
                    ] }),
                    userProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Patient Profile & Health Goals" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4", children: [
                        { label: "Name", value: userProfile.name },
                        { label: "Age", value: `${userProfile.age} yrs` },
                        {
                          label: "Gender",
                          value: userProfile.gender.replace("_", " ")
                        },
                        { label: "Lifestyle", value: userProfile.lifestyle }
                      ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "bg-muted/30 rounded-lg p-3 text-sm print-border",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-0.5", children: f.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold capitalize", children: f.value })
                          ]
                        },
                        f.label
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: userProfile.goals.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "capitalize text-xs px-3 py-1",
                          children: g.replace("_", " ")
                        },
                        g
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Mood Summary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-5 print-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Average Mood This Month" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold gradient-text", children: [
                              avgMood,
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-muted-foreground font-normal", children: [
                                " ",
                                "/ 5"
                              ] })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Total Entries" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (moods == null ? void 0 : moods.length) ?? 0 })
                          ] })
                        ] }),
                        moodChartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          LineChart,
                          {
                            data: moodChartData,
                            margin: { top: 4, right: 4, bottom: 4, left: -20 },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: { fontSize: 10 } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [1, 5], tick: { fontSize: 10 } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Tooltip,
                                {
                                  contentStyle: { fontSize: 12 },
                                  formatter: (v) => [`${v}/5`, "Mood"]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Line,
                                {
                                  type: "monotone",
                                  dataKey: "mood",
                                  stroke: "#3B82F6",
                                  strokeWidth: 2.5,
                                  dot: { r: 3, fill: "#3B82F6" }
                                }
                              )
                            ]
                          }
                        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No mood entries yet" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Habit Statistics" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 bg-muted/30 rounded-xl p-5 print-border", children: [
                        [
                          {
                            emoji: "💧",
                            label: "Daily Water Intake",
                            value: avgWater,
                            max: 8,
                            unit: "glasses",
                            target: "8 glasses",
                            color: "#38BDF8"
                          },
                          {
                            emoji: "🌙",
                            label: "Average Sleep",
                            value: avgSleep,
                            max: 9,
                            unit: "hrs",
                            target: "7–9 hrs",
                            color: "#A78BFA"
                          },
                          {
                            emoji: "👟",
                            label: "Daily Steps",
                            value: avgSteps,
                            max: 1e4,
                            unit: "steps",
                            target: "10,000 steps",
                            color: "#34D399"
                          }
                        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              h.emoji,
                              " ",
                              h.label
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                              typeof h.value === "number" && h.unit === "steps" ? h.value.toLocaleString() : h.value,
                              " ",
                              h.unit,
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                                "/ ",
                                h.target
                              ] })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ProgressBar,
                            {
                              value: h.value,
                              max: h.max,
                              color: h.color
                            }
                          )
                        ] }, h.label)),
                        (habits == null ? void 0 : habits.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-2", children: "No habit data recorded yet" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Medicine Adherence" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-xl p-5 print-border", children: activeReminders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Adherence Rate" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold gradient-text", children: [
                              adherencePct,
                              "%"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Taken Today" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold", children: [
                              takenCount,
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-muted-foreground font-normal", children: [
                                " ",
                                "/ ",
                                activeReminders.length
                              ] })
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ProgressBar,
                          {
                            value: takenCount,
                            max: activeReminders.length,
                            color: "#14B8A6"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: activeReminders.slice(0, 5).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            "data-ocid": `report.medication.item.${i + 1}`,
                            className: "flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border text-sm print-border",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "💊" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium flex-1 truncate", children: r.medicineName }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: r.dosage }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.times.join(", ") }),
                              r.takenToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium", children: "Taken" })
                            ]
                          },
                          r.id
                        )) })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-3", children: "No active medicine reminders" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Recent Health Events" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentEvents.length > 0 ? recentEvents.map((evt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `report.event.item.${i + 1}`,
                          className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border text-sm print-border",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none mt-0.5", children: eventEmoji[evt.type] ?? "📌" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: evt.title }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: evt.description })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: new Date(evt.timestamp).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric"
                            }) })
                          ]
                        },
                        evt.id
                      )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4 bg-muted/30 rounded-xl", children: "No timeline events recorded yet" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "AI-Personalised Wellness Tips" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: wellnessTips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `report.tip.item.${i + 1}`,
                          className: "flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border text-sm print-border",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold", children: i + 1 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-foreground", children: tip })
                          ]
                        },
                        tip
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-5 space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                          "Generated by AI Health Companion · ",
                          reportDate
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: "https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=health-report",
                            target: "_blank",
                            rel: "noreferrer",
                            className: "hover:underline transition-smooth",
                            children: "Built with caffeine.ai"
                          }
                        ) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-xs", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-amber-800 dark:text-amber-300 mb-1", children: "⚠️ Medical Disclaimer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-700 dark:text-amber-400 leading-relaxed", children: "This report is generated for personal wellness tracking purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis, treatment, or medical decisions." })
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          ),
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4 },
              className: "flex gap-3 justify-end flex-wrap no-print",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    "data-ocid": "report.copy.secondary_button",
                    onClick: handleCopyForDoctor,
                    className: "gap-2 transition-smooth",
                    children: [
                      isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 15, className: "text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { size: 15 }),
                      isCopied ? "Copied!" : "Copy for Doctor"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "report.print.primary_button",
                    className: "gradient-primary border-0 text-white gap-2 transition-smooth hover:opacity-90",
                    onClick: handleDownloadPDF,
                    disabled: isGenerating,
                    children: [
                      isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
                      isGenerating ? "Generating…" : "Download PDF"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  ReportPage as default
};
