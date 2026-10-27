import { c as createLucideIcon, a as useHealthStore, r as reactExports, j as jsxRuntimeExports, m as motion, bG as ShieldAlert, B as Button, H as Heart, A as Activity } from "./index-pQ9MGfeR.js";
import { C as Card, a as CardContent } from "./card-Diso-OOn.js";
import { C as CircleCheckBig } from "./circle-check-big-SKm4cL5v.js";
import { D as Droplets } from "./droplets-DLw62bPf.js";
import { T as TrendingUp } from "./trending-up-CRZQx78H.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function getBMICategory(bmi) {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      color: "#38BDF8",
      risk: "Low–Moderate",
      icon: "⚠️"
    };
  if (bmi < 25)
    return { label: "Normal", color: "#34D399", risk: "Low", icon: "✅" };
  if (bmi < 30)
    return {
      label: "Overweight",
      color: "#FBBF24",
      risk: "Moderate",
      icon: "⚠️"
    };
  return { label: "Obese", color: "#F87171", risk: "High", icon: "🔴" };
}
function estimateBioAge(age, bmi, lifestyle, sleepHrs, stressLevel) {
  let delta = 0;
  if (bmi < 18.5 || bmi >= 30) delta += 3;
  else if (bmi >= 25) delta += 1.5;
  if (lifestyle === "sedentary") delta += 4;
  else if (lifestyle === "active") delta -= 2;
  else if (lifestyle === "athletic") delta -= 4;
  if (sleepHrs < 6) delta += 3;
  else if (sleepHrs >= 7 && sleepHrs <= 9) delta -= 1.5;
  delta += (stressLevel - 3) * 0.8;
  return Math.max(10, Math.round(age + delta));
}
function calcWaterIntake(weightKg) {
  const ml = Math.round(weightKg * 35);
  const litres = (ml / 1e3).toFixed(2);
  const glasses = Math.ceil(ml / 250);
  return { ml, litres, glasses };
}
function Field({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step = 1,
  type = "number"
}) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "text-xs font-bold text-slate-500 uppercase tracking-widest",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type,
          value,
          min,
          max,
          step,
          onChange: (e) => onChange(Number(e.target.value)),
          className: "w-full h-11 px-4 pr-16 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
        }
      ),
      unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase", children: unit })
    ] })
  ] });
}
function ResultCard({
  icon,
  label,
  value,
  sub,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
        style: { background: `${color}20` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color }, children: icon })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-slate-800", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: sub })
    ] })
  ] });
}
function BMIGauge({ bmi }) {
  const clampedBmi = Math.min(40, Math.max(10, bmi));
  const pct = (clampedBmi - 10) / 30 * 100;
  const zones = [
    { label: "Under", color: "#38BDF8", end: 25 },
    { label: "Normal", color: "#34D399", end: 50 },
    { label: "Over", color: "#FBBF24", end: 75 },
    { label: "Obese", color: "#F87171", end: 100 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-5 rounded-full overflow-hidden flex", children: [
      zones.map((z) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex-1 first:rounded-l-full last:rounded-r-full",
          style: { background: z.color, opacity: 0.3 }
        },
        z.label
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 bottom-0 w-1.5 rounded-full bg-slate-800 shadow-lg transition-all duration-700",
          style: { left: `calc(${pct}% - 3px)` }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-bold text-slate-400 uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Underweight" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Normal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overweight" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Obese" })
    ] })
  ] });
}
function Section({
  title,
  icon,
  children,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-[28px] border-0 shadow-sm bg-white overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800", children: title })
        ] }),
        children
      ] }) })
    }
  );
}
function HealthRiskPage() {
  const { userProfile } = useHealthStore();
  const [weight, setWeight] = reactExports.useState(userProfile ? 70 : 70);
  const [height, setHeight] = reactExports.useState(170);
  const [bmiResult, setBmiResult] = reactExports.useState(null);
  const [bioAge, setBioAge] = reactExports.useState((userProfile == null ? void 0 : userProfile.age) ?? 25);
  const [lifestyle, setLifestyle] = reactExports.useState(
    (userProfile == null ? void 0 : userProfile.lifestyle) ?? "active"
  );
  const [sleepHrs, setSleepHrs] = reactExports.useState(7);
  const [stressLevel, setStressLevel] = reactExports.useState(3);
  const [bioAgeResult, setBioAgeResult] = reactExports.useState(null);
  const [waterWeight, setWaterWeight] = reactExports.useState(70);
  const [waterResult, setWaterResult] = reactExports.useState(null);
  const handleBMI = () => {
    const hm = height / 100;
    setBmiResult(Math.round(weight / (hm * hm) * 10) / 10);
  };
  const handleBioAge = () => {
    const currentBmi = bmiResult ?? (() => {
      const hm = height / 100;
      return Math.round(weight / (hm * hm) * 10) / 10;
    })();
    setBioAgeResult(
      estimateBioAge(bioAge, currentBmi, lifestyle, sleepHrs, stressLevel)
    );
  };
  const handleWater = () => setWaterResult(calcWaterIntake(waterWeight));
  const bmiCat = bmiResult !== null ? getBMICategory(bmiResult) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 26, className: "text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-slate-800 tracking-tight", children: "Health Risk Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium mt-0.5", children: "BMI · Biological Age · Personalised Water Intake" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.15 },
        className: "flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "text-amber-500 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 leading-relaxed", children: [
            "These calculators are for ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "wellness awareness only" }),
            " and do not constitute medical advice. Consult a qualified healthcare professional for clinical decisions."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Section,
        {
          title: "BMI Calculator",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { size: 20 }),
          delay: 0.1,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  label: "Weight",
                  value: weight,
                  onChange: setWeight,
                  unit: "kg",
                  min: 20,
                  max: 250
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  label: "Height",
                  value: height,
                  onChange: setHeight,
                  unit: "cm",
                  min: 100,
                  max: 250
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleBMI,
                className: "w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity border-0 mb-6",
                children: "Calculate BMI"
              }
            ),
            bmiResult !== null && bmiCat && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-center p-5 rounded-2xl",
                      style: { background: `${bmiCat.color}15` },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-4xl font-black",
                            style: { color: bmiCat.color },
                            children: bmiResult
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-slate-600 mt-1", children: [
                          bmiCat.icon,
                          " ",
                          bmiCat.label
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-1", children: [
                          "Health Risk:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", style: { color: bmiCat.color }, children: bmiCat.risk })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BMIGauge, { bmi: bmiResult }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
                    { range: "< 18.5", label: "Underweight", color: "#38BDF8" },
                    {
                      range: "18.5 – 24.9",
                      label: "Normal weight",
                      color: "#34D399"
                    },
                    { range: "25 – 29.9", label: "Overweight", color: "#FBBF24" },
                    { range: "≥ 30", label: "Obese", color: "#F87171" }
                  ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 p-2 rounded-lg bg-slate-50",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                            style: { background: r.color }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-700", children: r.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: r.range })
                        ] })
                      ]
                    },
                    r.label
                  )) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Section,
        {
          title: "Biological Age Estimator",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 20 }),
          delay: 0.2,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  label: "Chronological Age",
                  value: bioAge,
                  onChange: setBioAge,
                  unit: "yrs",
                  min: 10,
                  max: 100
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Field,
                {
                  label: "Sleep per Night",
                  value: sleepHrs,
                  onChange: setSleepHrs,
                  unit: "hrs",
                  min: 3,
                  max: 12,
                  step: 0.5
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lifestyle-picker",
                  className: "text-xs font-bold text-slate-500 uppercase tracking-widest",
                  children: "Lifestyle"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "lifestyle-picker", className: "grid grid-cols-3 gap-2", children: ["sedentary", "active", "athletic"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLifestyle(l),
                  className: `py-2.5 rounded-xl text-xs font-bold capitalize transition-all border ${lifestyle === l ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20" : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300"}`,
                  children: l
                },
                l
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "stress-slider",
                    className: "text-xs font-bold text-slate-500 uppercase tracking-widest",
                    children: "Stress Level"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-blue-500", children: [
                  stressLevel,
                  "/5"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "stress-slider",
                  type: "range",
                  min: 1,
                  max: 5,
                  step: 1,
                  value: stressLevel,
                  onChange: (e) => setStressLevel(Number(e.target.value)),
                  className: "w-full accent-blue-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-slate-400 font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Low" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Moderate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "High" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleBioAge,
                className: "w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity border-0 mb-6",
                children: "Estimate Biological Age"
              }
            ),
            bioAgeResult !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `p-5 rounded-2xl text-center ${bioAgeResult < bioAge ? "bg-green-50" : bioAgeResult === bioAge ? "bg-blue-50" : "bg-amber-50"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: `text-4xl font-black ${bioAgeResult < bioAge ? "text-green-500" : bioAgeResult === bioAge ? "text-blue-500" : "text-amber-500"}`,
                            children: [
                              bioAgeResult,
                              " yrs"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-600 mt-1", children: "Estimated Biological Age" }),
                        bioAgeResult < bioAge && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-600 mt-2 font-medium", children: [
                          "🎉 Your body is ~",
                          bioAge - bioAgeResult,
                          " years younger than your actual age!"
                        ] }),
                        bioAgeResult > bioAge && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-600 mt-2 font-medium", children: "⚠️ Your lifestyle may be ageing you faster. Consider better sleep & lower stress." }),
                        bioAgeResult === bioAge && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600 mt-2 font-medium", children: "✅ Your biological age matches your actual age." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: [
                    {
                      label: "Better sleep (7–9 hrs)",
                      impact: "−2 years",
                      ok: sleepHrs >= 7 && sleepHrs <= 9
                    },
                    {
                      label: "Active lifestyle",
                      impact: "−2 to −4 yrs",
                      ok: lifestyle !== "sedentary"
                    },
                    {
                      label: "Healthy BMI (18.5–24.9)",
                      impact: "−1.5 years",
                      ok: bmiResult !== null && bmiResult >= 18.5 && bmiResult < 25
                    },
                    {
                      label: "Low stress (≤ 2/5)",
                      impact: "−0.8 years",
                      ok: stressLevel <= 2
                    }
                  ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50",
                      children: [
                        tip.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheckBig,
                          {
                            size: 14,
                            className: "text-green-500 flex-shrink-0"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          TriangleAlert,
                          {
                            size: 14,
                            className: "text-amber-400 flex-shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-600 flex-1", children: tip.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-blue-500", children: tip.impact })
                      ]
                    },
                    tip.label
                  )) })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        title: "Daily Water Intake Calculator",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 20 }),
        delay: 0.3,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mb-5 leading-relaxed", children: [
              "Water requirement is calculated using the standard formula:",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 font-bold text-blue-500", children: "35 ml × body weight (kg)" }),
              ". For example, a person weighing ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "60 kg" }),
              " needs about ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "2.1 L/day" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Field,
              {
                label: "Your Body Weight",
                value: waterWeight,
                onChange: setWaterWeight,
                unit: "kg",
                min: 10,
                max: 300
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleWater,
                className: "mt-5 w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity border-0",
                children: "Calculate Water Intake"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-3", children: "Quick Reference" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [20, 30, 40, 50, 60, 70, 80, 90, 100].map((kg) => {
                const w = calcWaterIntake(kg);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center justify-between px-4 py-2 rounded-xl text-xs transition-colors ${waterWeight === kg ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-600", children: [
                        kg,
                        " kg"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500", children: [
                        w.litres,
                        " L"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
                        "~",
                        w.glasses,
                        " glasses"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
                        w.ml,
                        " ml"
                      ] })
                    ]
                  },
                  kg
                );
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: waterResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-2xl text-white text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 36, className: "mx-auto mb-3 opacity-80" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl font-black", children: [
                    waterResult.litres,
                    " L"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-80 mt-1", children: [
                    "Daily water intake for ",
                    waterWeight,
                    " kg"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ResultCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 18 }),
                    label: "In Millilitres",
                    value: `${waterResult.ml.toLocaleString()} ml`,
                    sub: "Total daily target",
                    color: "#38BDF8"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ResultCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18 }),
                    label: "In Glasses (250 ml each)",
                    value: `${waterResult.glasses} glasses`,
                    sub: "Spread across the day",
                    color: "#34D399"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ResultCard,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
                    label: "Per Hour (awake 16 hrs)",
                    value: `${(waterResult.ml / 16).toFixed(0)} ml`,
                    sub: "Hourly hydration goal",
                    color: "#818CF8"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-blue-50 border border-blue-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-blue-700 mb-2", children: "💡 Hydration Tips" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-xs text-blue-600", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Drink a glass of water first thing in the morning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Increase intake by 500 ml on workout days" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Hot weather adds ~500 ml to your daily need" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Fruits & vegetables contribute ~20% of total intake" })
                  ] })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-64 flex flex-col items-center justify-center text-slate-300 rounded-2xl border-2 border-dashed border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 40, className: "mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Enter your weight and click calculate" })
          ] }) })
        ] })
      }
    )
  ] });
}
export {
  HealthRiskPage as default
};
