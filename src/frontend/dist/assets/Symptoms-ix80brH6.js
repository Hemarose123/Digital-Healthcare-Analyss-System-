import { r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, b as AnimatePresence, e as Skeleton, f as ue } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { d as useAddSymptomCheck, c as useAddTimelineEvent, e as useSymptomChecks } from "./useBackend-CQZwdIO-.js";
import { C as CircleCheck } from "./circle-check-CYRVmAgy.js";
import { S as Save } from "./save-B3bqvULU.js";
import { C as ClipboardCopy } from "./clipboard-copy-DU4uDK_Z.js";
import { C as ChevronDown } from "./chevron-down-C_l-fhry.js";
const CONDITION_MAP = [
  {
    keywords: ["chest pain", "chest ache", "heart", "palpitation"],
    result: {
      condition: "Cardiac / Respiratory Concern",
      remedies: [
        "Sit upright and rest immediately",
        "Loosen any tight clothing",
        "Take slow, deep breaths"
      ],
      lifestyle: [
        "Seek immediate medical evaluation",
        "Avoid exertion until assessed",
        "Track symptom onset and duration"
      ],
      severity: "red"
    }
  },
  {
    keywords: [
      "can't breathe",
      "difficulty breathing",
      "shortness of breath",
      "breathing"
    ],
    result: {
      condition: "Respiratory Distress",
      remedies: [
        "Sit upright, lean slightly forward",
        "Purse-lip breathing technique",
        "Humidify the air"
      ],
      lifestyle: [
        "Seek urgent medical attention",
        "Avoid triggers (smoke, allergens)",
        "Monitor oxygen levels if possible"
      ],
      severity: "red"
    }
  },
  {
    keywords: ["headache", "migraine", "head pain", "throbbing head"],
    result: {
      condition: "Tension Headache / Migraine",
      remedies: [
        "Rest in a dark, quiet room",
        "Cold compress on forehead",
        "Ginger tea with honey",
        "Stay well-hydrated"
      ],
      lifestyle: [
        "Reduce screen time",
        "Practice stress management",
        "Maintain consistent sleep schedule"
      ],
      severity: "green"
    }
  },
  {
    keywords: ["fever", "temperature", "chills", "hot", "sweating"],
    result: {
      condition: "Fever / Infection",
      remedies: [
        "Rest and increase fluid intake",
        "Lukewarm sponge bath",
        "Light, breathable clothing",
        "Coconut water for electrolytes"
      ],
      lifestyle: [
        "Monitor temperature every 4 hours",
        "Eat light easily digestible foods",
        "Isolate if fever persists > 3 days"
      ],
      severity: "yellow"
    }
  },
  {
    keywords: [
      "cough",
      "cold",
      "sore throat",
      "runny nose",
      "congestion",
      "sneezing"
    ],
    result: {
      condition: "Upper Respiratory Infection",
      remedies: [
        "Honey + lemon in warm water",
        "Steam inhalation with eucalyptus",
        "Gargle with salt water",
        "Elevate head while sleeping"
      ],
      lifestyle: [
        "Rest adequately",
        "Increase vitamin C intake",
        "Avoid cold drinks and dairy"
      ],
      severity: "green"
    }
  },
  {
    keywords: [
      "stomach",
      "nausea",
      "vomit",
      "diarrhea",
      "indigestion",
      "bloating",
      "abdominal"
    ],
    result: {
      condition: "Digestive Disturbance",
      remedies: [
        "Ginger tea or ginger chews",
        "BRAT diet (bananas, rice, applesauce, toast)",
        "Probiotic-rich foods (yogurt, kefir)",
        "Peppermint tea for bloating"
      ],
      lifestyle: [
        "Eat small, frequent meals",
        "Avoid spicy and fatty foods",
        "Stay hydrated with clear fluids"
      ],
      severity: "green"
    }
  },
  {
    keywords: ["anxiety", "stress", "panic", "worry", "nervous", "restless"],
    result: {
      condition: "Stress / Anxiety",
      remedies: [
        "4-7-8 breathing technique",
        "Chamomile or ashwagandha tea",
        "Progressive muscle relaxation",
        "10-minute mindfulness meditation"
      ],
      lifestyle: [
        "Reduce caffeine intake",
        "Establish a calming bedtime routine",
        "Talk to a trusted person or counselor"
      ],
      severity: "green"
    }
  },
  {
    keywords: [
      "fatigue",
      "tired",
      "exhaustion",
      "low energy",
      "weak",
      "lethargic"
    ],
    result: {
      condition: "Chronic Fatigue / Low Energy",
      remedies: [
        "Iron-rich foods (spinach, lentils, red meat)",
        "Stay hydrated throughout the day",
        "B12-rich foods or supplement",
        "Short 20-minute power naps"
      ],
      lifestyle: [
        "Aim for 7-9 hours of quality sleep",
        "Light exercise like walking",
        "Limit screen time before bed"
      ],
      severity: "green"
    }
  },
  {
    keywords: [
      "back pain",
      "back ache",
      "joint pain",
      "muscle pain",
      "neck pain",
      "shoulder pain"
    ],
    result: {
      condition: "Musculoskeletal Discomfort",
      remedies: [
        "Warm compress or heating pad",
        "Gentle stretching and mobility exercises",
        "Turmeric milk for inflammation",
        "Epsom salt bath"
      ],
      lifestyle: [
        "Improve posture and ergonomics",
        "Strengthen core muscles gradually",
        "Avoid prolonged sitting or standing"
      ],
      severity: "green"
    }
  },
  {
    keywords: ["skin", "rash", "itch", "hives", "allergy", "redness"],
    result: {
      condition: "Skin Reaction / Allergy",
      remedies: [
        "Apply cool aloe vera gel",
        "Oatmeal bath for itching",
        "Avoid known allergens",
        "Keep skin moisturized"
      ],
      lifestyle: [
        "Identify and avoid triggers",
        "Use gentle, fragrance-free products",
        "See a dermatologist if persists > 1 week"
      ],
      severity: "yellow"
    }
  }
];
const SEVERITY_OVERRIDE_RED = [
  "chest pain",
  "can't breathe",
  "difficulty breathing",
  "severe",
  "unconscious",
  "paralysis",
  "stroke",
  "heart attack",
  "severe bleeding"
];
const SEVERITY_OVERRIDE_YELLOW = [
  "high fever",
  "persistent",
  "worsening",
  "spreading",
  "not improving"
];
function analyzeSymptoms(text) {
  const lower = text.toLowerCase();
  for (const item of CONDITION_MAP) {
    if (item.keywords.some((k) => lower.includes(k))) {
      let severity = item.result.severity;
      if (SEVERITY_OVERRIDE_RED.some((k) => lower.includes(k)))
        severity = "red";
      else if (SEVERITY_OVERRIDE_YELLOW.some((k) => lower.includes(k)) && severity === "green")
        severity = "yellow";
      return { ...item.result, severity };
    }
  }
  return {
    condition: "General Wellness Advisory",
    remedies: [
      "Rest and stay well-hydrated",
      "Eat balanced, nutritious meals",
      "Monitor symptoms over 24-48 hours",
      "Practice gentle breathing exercises"
    ],
    lifestyle: [
      "Maintain a consistent sleep schedule",
      "Stay active with light exercise",
      "Reduce stress through mindfulness"
    ],
    severity: "green"
  };
}
const SEVERITY_CONFIG = {
  green: {
    label: "Mild — Self-care advised",
    advice: "Your symptoms appear mild. With proper rest, hydration, and the remedies below, you should recover well.",
    dotColor: "bg-green-500",
    badgeCls: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    borderCls: "border-green-200 dark:border-green-900",
    bgCls: "bg-green-50 dark:bg-green-900/10",
    icon: "🟢"
  },
  yellow: {
    label: "Moderate — Monitor closely",
    advice: "Your symptoms warrant attention. Consider seeing a doctor if they persist for more than 48 hours or worsen.",
    dotColor: "bg-yellow-500",
    badgeCls: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    borderCls: "border-yellow-200 dark:border-yellow-900",
    bgCls: "bg-yellow-50 dark:bg-yellow-900/10",
    icon: "🟡"
  },
  red: {
    label: "Severe — Seek immediate help",
    advice: "These symptoms may indicate a serious condition. Please seek immediate medical attention or call emergency services.",
    dotColor: "bg-red-500",
    badgeCls: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    borderCls: "border-red-200 dark:border-red-900",
    bgCls: "bg-red-50 dark:bg-red-900/10",
    icon: "🔴"
  }
};
function SymptomsPage() {
  const [symptoms, setSymptoms] = reactExports.useState("");
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [openHistory, setOpenHistory] = reactExports.useState(null);
  const addCheck = useAddSymptomCheck();
  const addTimeline = useAddTimelineEvent();
  const { data: history, isLoading } = useSymptomChecks();
  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    await new Promise((res) => setTimeout(res, 1400));
    const analysis = analyzeSymptoms(symptoms);
    setResult({ ...analysis, savedToTimeline: false });
    await addCheck.mutateAsync({
      symptoms: symptoms.trim(),
      severity: analysis.severity,
      suggestions: analysis.lifestyle,
      remedies: analysis.remedies
    });
    setIsAnalyzing(false);
  };
  const handleSaveTimeline = async () => {
    if (!result) return;
    await addTimeline.mutateAsync({
      type: "symptom",
      title: `Symptom Check: ${result.condition}`,
      description: `Severity: ${result.severity.toUpperCase()} — ${symptoms.slice(0, 80)}`
    });
    setResult((r) => r ? { ...r, savedToTimeline: true } : r);
    ue.success("Saved to Health Timeline!");
  };
  const handleCopy = () => {
    if (!result) return;
    const text = `Symptom Analysis

Condition: ${result.condition}
Severity: ${result.severity}

Remedies:
${result.remedies.map((r) => `• ${r}`).join("\n")}

Lifestyle Tips:
${result.lifestyle.map((t) => `• ${t}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    ue.success("Results copied to clipboard!");
  };
  const sev = result ? SEVERITY_CONFIG[result.severity] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "symptoms.page",
      className: "p-4 md:p-6 space-y-6 max-w-4xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🩺" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent", children: "AI Symptom Checker" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Natural remedy suggestions · No prescription advice" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "symptom-input",
                    className: "text-sm font-semibold text-foreground block mb-2",
                    children: "Describe your symptoms in detail"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "symptom-input",
                      "data-ocid": "symptoms.input.textarea",
                      value: symptoms,
                      onChange: (e) => {
                        if (e.target.value.length <= 500) setSymptoms(e.target.value);
                      },
                      placeholder: "e.g. I have a persistent headache and mild fever for the past 2 days, along with fatigue...",
                      rows: 4,
                      className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors placeholder:text-muted-foreground/60 text-sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `absolute bottom-3 right-3 text-xs ${symptoms.length >= 450 ? "text-orange-500" : "text-muted-foreground/50"}`,
                      children: [
                        symptoms.length,
                        "/500"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "symptoms.check.primary_button",
                    className: "gradient-primary border-0 text-white font-semibold shadow-subtle hover:shadow-elevated transition-shadow",
                    disabled: !symptoms.trim() || isAnalyzing,
                    onClick: handleAnalyze,
                    children: isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" }),
                      "Analyzing symptoms..."
                    ] }) : "Analyze Symptoms 🔍"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Powered by keyword-based NLP simulation" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": "symptoms.analyzing.loading_state",
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
            className: "bg-card rounded-2xl border border-border shadow-subtle p-8 flex flex-col items-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🧠" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Analyzing your symptoms..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Identifying conditions and natural remedies" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full gradient-primary animate-bounce",
                  style: { animationDelay: `${i * 0.15}s` }
                },
                i
              )) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: result && sev && !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": "symptoms.result.success_state",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `rounded-2xl border ${sev.borderCls} ${sev.bgCls} p-6 space-y-4`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                        className: `w-14 h-14 rounded-full ${sev.dotColor} flex items-center justify-center text-white font-bold text-xl shadow-elevated flex-shrink-0 ${result.severity === "red" ? "animate-pulse" : ""}`,
                        children: sev.icon
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: result.condition }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${sev.badgeCls} border-0 font-semibold`, children: sev.label })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: sev.advice })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🌿" }),
                    " Natural Remedies"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: result.remedies.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.li,
                    {
                      "data-ocid": `symptoms.remedy.item.${i + 1}`,
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: i * 0.06 },
                      className: "flex items-start gap-2.5 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            size: 15,
                            className: "text-accent flex-shrink-0 mt-0.5"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r })
                      ]
                    },
                    r
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "💡" }),
                    " Lifestyle Tips"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: result.lifestyle.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.li,
                    {
                      "data-ocid": `symptoms.suggestion.item.${i + 1}`,
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: i * 0.06 },
                      className: "flex items-start gap-2.5 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 font-bold", children: "→" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t })
                      ]
                    },
                    t
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "symptoms.save_timeline.button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-2",
                    onClick: handleSaveTimeline,
                    disabled: result.savedToTimeline || addTimeline.isPending,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                      result.savedToTimeline ? "Saved to Timeline ✓" : "Save to Timeline"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "symptoms.copy.button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-2",
                    onClick: handleCopy,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { size: 14 }),
                      "Copy Results"
                    ]
                  }
                )
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "bg-card rounded-2xl border border-border shadow-subtle p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4", children: "Recent Symptom Checks" }),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) }) : (history ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "symptoms.history.empty_state",
                  className: "py-6 flex flex-col items-center gap-2 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl opacity-30", children: "🔍" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No symptom checks yet." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (history ?? []).slice(0, 5).map((c, i) => {
                const sc = SEVERITY_CONFIG[c.severity];
                const isOpen = openHistory === c.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `symptoms.history.item.${i + 1}`,
                    className: "rounded-xl border border-border overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: "w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-left",
                          onClick: () => setOpenHistory(isOpen ? null : c.id),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `w-3 h-3 rounded-full flex-shrink-0 ${sc.dotColor}`
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: c.symptoms }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(c.timestamp).toLocaleDateString("en", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              }) })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                className: `${sc.badgeCls} border-0 text-xs flex-shrink-0`,
                                children: c.severity
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              ChevronDown,
                              {
                                size: 14,
                                className: `text-muted-foreground transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { height: 0 },
                          animate: { height: "auto" },
                          exit: { height: 0 },
                          className: "overflow-hidden",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-1 space-y-2 border-t border-border bg-muted/20", children: c.remedies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: "Remedies" }),
                            c.remedies.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground", children: [
                              "• ",
                              r
                            ] }, r))
                          ] }) })
                        }
                      ) })
                    ]
                  },
                  c.id
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
  SymptomsPage as default
};
