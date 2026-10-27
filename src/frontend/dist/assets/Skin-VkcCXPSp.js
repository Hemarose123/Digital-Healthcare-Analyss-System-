import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, b as AnimatePresence, B as Button, k as Utensils, f as ue } from "./index-pQ9MGfeR.js";
import { C as Card, a as CardContent } from "./card-Diso-OOn.js";
import { c as useAddTimelineEvent } from "./useBackend-CQZwdIO-.js";
import { U as Upload } from "./upload-C0GCejeY.js";
import { C as CircleCheck } from "./circle-check-CYRVmAgy.js";
import { S as Save } from "./save-B3bqvULU.js";
import { T as Trash2 } from "./trash-2-Cfm5H9jY.js";
import { S as Scan } from "./scan-DJjIDaj-.js";
import { S as Shield } from "./shield-CH1a4zoY.js";
import { S as Sparkles } from "./sparkles-Dw6FHAZU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
];
const Droplet = createLucideIcon("droplet", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode);
const cameraImg = "/assets/camera-BiCvVkbX.png";
const skinSectionImg = "/assets/skin_section-DPf1amZN.png";
const SKIN_CONDITIONS = [
  {
    name: "Mild Rosacea",
    confidence: 98.4,
    severity: "mild",
    archetype: "Combination T-Zone",
    hydration: 82,
    description: "Clinical analysis indicates mild erythematous patches with significant epidermal dehydration. Neural mesh mapping confirms localized inflammation.",
    stats: [
      { label: "Epidermal Depth", value: "0.05 mm" },
      { label: "Melanin Index", value: "Low-Medium" },
      { label: "Elasticity (R2)", value: "0.78" }
    ],
    remedies: [
      {
        title: "Cooling Support",
        desc: "Aloe Vera gel and Green Tea compresses to reduce redness.",
        icon: "🌿"
      },
      {
        title: "Barrier Repair",
        desc: "Pure Jojoba oil to mimic natural sebum and lock in moisture.",
        icon: "🧪"
      }
    ]
  },
  {
    name: "Acne Vulgaris",
    confidence: 94.2,
    severity: "moderate",
    archetype: "Oily / Sensitive",
    hydration: 65,
    description: "Detection of multiple closed comedones and inflammatory papules. Pores show signs of lipid congestion in the sebaceous regions.",
    stats: [
      { label: "Pore Density", value: "High" },
      { label: "Sebum Level", value: "Elevated" },
      { label: "Bacterial Index", value: "Moderate" }
    ],
    remedies: [
      {
        title: "Clarifying Therapy",
        desc: "Salicylic acid cleansers and non-comedogenic hydration.",
        icon: "🧴"
      },
      {
        title: "Blemish Control",
        desc: "Diluted tea tree oil for targeted antibacterial action.",
        icon: "✨"
      }
    ]
  }
];
function SkinPage() {
  const [preview, setPreview] = reactExports.useState(null);
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [savedToTimeline, setSavedToTimeline] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const addTimeline = useAddTimelineEvent();
  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      setPreview((_a = e.target) == null ? void 0 : _a.result);
      setResult(null);
      setSavedToTimeline(false);
    };
    reader.readAsDataURL(file);
  }
  async function analyzeImage() {
    if (!preview) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 3e3));
    setResult(
      SKIN_CONDITIONS[Math.floor(Math.random() * SKIN_CONDITIONS.length)]
    );
    setAnalyzing(false);
    setSavedToTimeline(false);
  }
  function handleSaveTimeline() {
    if (!result) return;
    addTimeline.mutate(
      {
        type: "symptom",
        title: `Skin Analysis: ${result.name}`,
        description: `AI confidence: ${result.confidence}% · Condition: ${result.name}`
      },
      {
        onSuccess: () => {
          setSavedToTimeline(true);
          ue.success("Analysis saved to clinical timeline!");
        }
      }
    );
  }
  function handleReset() {
    setPreview(null);
    setResult(null);
    setSavedToTimeline(false);
    setAnalyzing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "main",
    {
      className: "min-h-screen pb-20 animate-in fade-in duration-1000",
      "data-ocid": "skin.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                className: "text-5xl font-black tracking-tight text-slate-800 mb-2",
                children: "Skin AI Analyzer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg font-medium", children: "Deep dermal scanning using neural mesh topography." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-2.5 bg-white shadow-sm border border-slate-100 rounded-full flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500", children: "Scanner Ready" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-8 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[40px] border-0 shadow-2xl bg-white/40 backdrop-blur-2xl overflow-hidden relative min-h-[550px] border border-white/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-1 h-full flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 rounded-[36px] border-2 border-dashed border-blue-100/50 bg-white/60 flex flex-col items-center justify-center relative p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.9 },
                  className: "flex flex-col items-center gap-8 cursor-pointer group",
                  onClick: () => {
                    var _a;
                    return (_a = inputRef.current) == null ? void 0 : _a.click();
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: cameraImg,
                          alt: "Scanner",
                          className: "w-56 h-56 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-700"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-blue-400/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-400/20 transition-all" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Initialize Mesh Scan" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 max-w-xs", children: "Upload a macro photo of the skin area for deep neural analysis." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          className: "mt-6 rounded-2xl h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                            "Choose Photo"
                          ]
                        }
                      )
                    ] })
                  ]
                },
                "empty"
              ) : analyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "flex flex-col items-center gap-8",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: preview,
                          alt: "Preview",
                          className: "w-full h-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-blue-500/20 animate-pulse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_#3b82f6] animate-scan-line" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Analyzing Dermal Layers" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 justify-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 animate-bounce" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" })
                      ] })
                    ] })
                  ]
                },
                "analyzing"
              ) : result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  className: "flex flex-col items-center gap-6 text-center w-full max-w-lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 40 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-3xl font-black text-slate-800 mb-2", children: [
                        "Diagnosis: ",
                        result.name
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 leading-relaxed", children: result.description })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          onClick: handleSaveTimeline,
                          disabled: savedToTimeline,
                          className: "rounded-2xl h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
                            savedToTimeline ? "Saved to Timeline" : "Save Analysis"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          onClick: handleReset,
                          variant: "outline",
                          className: "rounded-2xl h-12 px-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-4 h-4 mr-2" }),
                            "New Scan"
                          ]
                        }
                      )
                    ] })
                  ]
                },
                "result"
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "flex flex-col items-center gap-8",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: preview,
                          alt: "Preview",
                          className: "w-full h-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleReset,
                          className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 hover:bg-white transition-all shadow-lg",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 20 })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 mb-2", children: "Image Loaded" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "Scan area is ready for neural processing." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          onClick: analyzeImage,
                          className: "mt-6 rounded-2xl h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { className: "w-4 h-4 mr-2" }),
                            "Start Deep Scan"
                          ]
                        }
                      )
                    ] })
                  ]
                },
                "ready"
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "file",
                  className: "hidden",
                  accept: "image/*",
                  onChange: (e) => {
                    var _a;
                    const file = (_a = e.target.files) == null ? void 0 : _a[0];
                    if (file) handleFile(file);
                  }
                }
              )
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ResultCard,
                {
                  title: "Hydration",
                  value: (result == null ? void 0 : result.hydration) || 0,
                  unit: "%",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "text-blue-500" }),
                  color: "blue",
                  progress: result == null ? void 0 : result.hydration
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ResultCard,
                {
                  title: "Detected Archetype",
                  value: (result == null ? void 0 : result.archetype) || "—",
                  unit: "",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "text-emerald-500" }),
                  color: "emerald"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ResultCard,
                {
                  title: "Analysis Confidence",
                  value: (result == null ? void 0 : result.confidence) || 0,
                  unit: "%",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "text-amber-500" }),
                  color: "amber",
                  isConfidence: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[40px] border-0 shadow-sm bg-white overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-slate-800", children: "AI Personal Recommendations" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RecItem,
                  {
                    emoji: "🧴",
                    title: "Soothing Serum",
                    desc: "Targeted anti-redness formula for sensitive profiles.",
                    color: "blue"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RecItem,
                  {
                    emoji: "💧",
                    title: "Hydrating Mist",
                    desc: "Nano-particle hydration for deep dermal penetration.",
                    color: "cyan"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RecItem,
                  {
                    emoji: "🛡️",
                    title: "Barrier Shield",
                    desc: "Ceramide-rich protection for damaged skin barriers.",
                    color: "emerald"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RecItem,
                  {
                    emoji: "✨",
                    title: "Glow Tonic",
                    desc: "Gentle exfoliation for enhanced cellular turnover.",
                    color: "amber"
                  }
                )
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-4 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[40px] border-0 shadow-sm bg-white overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8", children: "Condition Topology" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full aspect-square relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: skinSectionImg,
                    alt: "Skin Model",
                    className: "w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mt-8 space-y-3", children: ((result == null ? void 0 : result.stats) || [
                { label: "Epidermal Depth", value: "—" },
                { label: "Melanin Index", value: "—" },
                { label: "Elasticity (R2)", value: "—" }
              ]).map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between items-center p-4 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: stat.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-800", children: stat.value })
                  ]
                },
                stat.label
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[40px] border-0 shadow-sm bg-blue-50/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 space-y-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 18 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800", children: "Natural Remedies" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: ((result == null ? void 0 : result.remedies) || [
                  {
                    title: "Cooling Support",
                    desc: "Initialize scan to view personalized remedies.",
                    icon: "🌿"
                  },
                  {
                    title: "Barrier Repair",
                    desc: "Scan to see recommended ingredients.",
                    icon: "🧪"
                  }
                ]).map((rem) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform", children: rem.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800 leading-tight mb-1", children: rem.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-400 leading-relaxed", children: rem.desc })
                  ] })
                ] }, rem.title)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { size: 18 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800", children: "Skin Care Diet" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform", children: "🥗" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800 leading-tight mb-1", children: "Anti-Inflammatory" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-400 leading-relaxed", children: "Fatty fish (Omega-3), leafy greens, and hydrating berries." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform", children: "☕" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800 leading-tight mb-1", children: "Dietary Triggers" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-400 leading-relaxed", children: "Avoid spicy foods and excessive caffeine to prevent flushing." })
                    ] })
                  ] })
                ] })
              ] })
            ] }) })
          ] })
        ] })
      ] })
    }
  );
}
function ResultCard({
  title,
  value,
  unit,
  icon,
  color,
  progress,
  isConfidence
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[32px] border-0 shadow-sm bg-white overflow-hidden group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col justify-between h-44", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-10 h-10 rounded-2xl flex items-center justify-center bg-${color}-50 group-hover:scale-110 transition-transform`,
          children: icon
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-slate-400", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-3xl font-black text-${color}-600 tracking-tight`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-slate-400", children: unit })
      ] }),
      progress !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-50 h-1.5 rounded-full mt-4 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full bg-${color}-500 transition-all duration-1000`,
          style: { width: `${progress}%` }
        }
      ) }),
      isConfidence && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-6 mt-4 flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-12 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-24 h-24 border-[10px] border-slate-100 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute w-24 h-24 border-[10px] border-blue-500 rounded-full",
            style: {
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
              transform: `rotate(${180 + value * 1.8}deg)`
            }
          }
        )
      ] }) })
    ] })
  ] }) });
}
function RecItem({
  emoji,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50/50 p-4 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-sm transition-all group cursor-pointer flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform",
        children: emoji
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800 mb-0.5", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-slate-400 leading-tight", children: desc })
    ] })
  ] });
}
export {
  SkinPage as default
};
