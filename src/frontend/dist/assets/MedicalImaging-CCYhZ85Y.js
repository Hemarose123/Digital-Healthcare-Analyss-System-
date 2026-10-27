import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as cn, m as motion, A as Activity, B as Button, b as AnimatePresence, f as ue } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { P as Primitive } from "./index-BIxCvO3c.js";
import { c as useAddTimelineEvent } from "./useBackend-CQZwdIO-.js";
import { B as Brain } from "./brain-C0KL9AEt.js";
import { U as Upload } from "./upload-C0GCejeY.js";
import { X } from "./x-D2fkv8yI.js";
import { C as CircleCheck } from "./circle-check-CYRVmAgy.js";
import { S as Shield } from "./shield-CH1a4zoY.js";
import { S as Save } from "./save-B3bqvULU.js";
import { C as ClipboardCopy } from "./clipboard-copy-DU4uDK_Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const IMAGING_RESULTS = [
  {
    finding: "No significant abnormalities detected",
    confidence: 92,
    modality: "Chest X-Ray",
    isNormal: true,
    urgency: "routine",
    insights: [
      "Lung fields appear clear and well-aerated bilaterally",
      "Cardiac silhouette is within normal size limits",
      "No evidence of pleural effusion, pneumothorax, or consolidation"
    ]
  },
  {
    finding: "Minor density variation observed in lower region",
    confidence: 81,
    modality: "CT Scan",
    isNormal: false,
    urgency: "follow-up",
    insights: [
      "Small area of increased attenuation noted in the lower lobe",
      "Pattern may represent early inflammatory response or minor atelectasis",
      "Clinical correlation with patient symptoms is strongly advised"
    ]
  },
  {
    finding: "Normal bone density and structure",
    confidence: 89,
    modality: "Bone X-Ray",
    isNormal: true,
    urgency: "routine",
    insights: [
      "Bone mineral density within expected range for patient profile",
      "No visible fractures, lytic lesions, or structural abnormalities",
      "Soft tissue appearance within normal limits"
    ]
  },
  {
    finding: "Subtle tissue irregularity noted — recommend follow-up",
    confidence: 76,
    modality: "MRI Scan",
    isNormal: false,
    urgency: "follow-up",
    insights: [
      "Mild T2 signal change observed in the region of interest",
      "Findings may indicate early edema or minor soft tissue injury",
      "Repeat imaging in 4–6 weeks recommended for comparison"
    ]
  },
  {
    finding: "Possible early-stage changes — consult specialist",
    confidence: 78,
    modality: "CT Scan",
    isNormal: false,
    urgency: "consult",
    insights: [
      "Pattern of density change warrants further clinical evaluation",
      "Differential diagnosis includes early inflammatory or reactive changes",
      "Prompt consultation with a radiologist or specialist is recommended"
    ]
  }
];
const PAST_SCANS = [
  {
    id: "ps1",
    finding: "No significant abnormalities detected",
    modality: "Chest X-Ray",
    confidence: 94,
    isNormal: true,
    date: "Apr 16, 2026"
  },
  {
    id: "ps2",
    finding: "Normal bone density and structure",
    modality: "Bone X-Ray",
    confidence: 89,
    isNormal: true,
    date: "Apr 8, 2026"
  },
  {
    id: "ps3",
    finding: "Minor density variation observed",
    modality: "CT Scan",
    confidence: 77,
    isNormal: false,
    date: "Mar 28, 2026"
  }
];
const URGENCY_LABELS = {
  routine: "Routine — no immediate action",
  "follow-up": "Follow-up recommended",
  consult: "Specialist consult advised"
};
function pickResult() {
  return IMAGING_RESULTS[Math.floor(Math.random() * IMAGING_RESULTS.length)];
}
function MedicalImagingPage() {
  const [preview, setPreview] = reactExports.useState(null);
  const [progress, setProgress] = reactExports.useState(0);
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [savedToTimeline, setSavedToTimeline] = reactExports.useState(false);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const addTimeline = useAddTimelineEvent();
  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      setPreview((_a = e.target) == null ? void 0 : _a.result);
      setResult(null);
      setSavedToTimeline(false);
      simulateUpload();
    };
    reader.readAsDataURL(file);
  }
  async function simulateUpload() {
    setProgress(0);
    const steps = [15, 40, 70, 95, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 450));
      setProgress(step);
    }
  }
  async function analyzeImage() {
    if (!preview) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 3e3));
    setResult(pickResult());
    setAnalyzing(false);
    setSavedToTimeline(false);
  }
  function handleCopyShareable() {
    if (!result) return;
    const text = `AI Medical Imaging Report

Finding: ${result.finding}
Modality: ${result.modality}
AI Confidence: ${result.confidence}%
Status: ${result.isNormal ? "Within normal range" : "Requires review"}

Insights:
${result.insights.map((ins, i) => `${i + 1}. ${ins}`).join("\n")}

Disclaimer: AI-simulated result. Not a medical diagnosis. Consult a licensed radiologist.`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      ue.success("Report copied to clipboard!");
      setTimeout(() => setCopied(false), 3e3);
    });
  }
  function handleSaveTimeline() {
    if (!result) return;
    addTimeline.mutate(
      {
        type: "symptom",
        title: `Medical Imaging: ${result.finding}`,
        description: `${result.modality} · ${result.confidence}% confidence · ${URGENCY_LABELS[result.urgency]}`
      },
      {
        onSuccess: () => {
          setSavedToTimeline(true);
          ue.success("Saved to Health Timeline!");
        }
      }
    );
  }
  function handleReset() {
    setPreview(null);
    setResult(null);
    setSavedToTimeline(false);
    setProgress(0);
    setAnalyzing(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file == null ? void 0 : file.type.startsWith("image/")) handleFile(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]",
      "data-ocid": "medical_imaging.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 shadow-sm flex items-center justify-center border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-white drop-shadow-sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-black/90 dark:text-white/90", children: "Medical Imaging Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-black/40 dark:text-white/40 tracking-widest uppercase", children: "AI-Powered CNN Diagnostics" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 space-y-8 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 dark:border-white/5 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center gap-2 bg-white/40 dark:bg-black/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-blue-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm", children: "Upload Scan" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["X-Ray", "MRI", "CT Scan", "Ultrasound", "DICOM"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-[10px] uppercase tracking-wider font-semibold bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-black/70 dark:text-white/70 rounded-lg py-1 px-3 border-0 transition-colors cursor-default",
                      children: m
                    },
                    m
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onDrop: handleDrop,
                      onDragOver: (e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      },
                      onDragLeave: () => setIsDragging(false),
                      onClick: () => {
                        var _a;
                        return !preview && ((_a = inputRef.current) == null ? void 0 : _a.click());
                      },
                      className: `relative rounded-3xl transition-all duration-300 w-full min-h-[280px] flex items-center justify-center overflow-hidden ${isDragging ? "bg-blue-500/10 border-2 border-blue-500/50 scale-[0.99]" : preview ? "bg-black/[0.02] dark:bg-white/[0.02] cursor-default border border-black/5 dark:border-white/5" : "bg-white/80 dark:bg-black/20 border border-black/10 dark:border-white/10 hover:shadow-lg cursor-pointer hover:border-black/20 group"}`,
                      children: preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full p-4 flex items-center justify-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: preview,
                            alt: "Medical scan",
                            className: "max-w-full max-h-[340px] object-contain rounded-2xl shadow-sm"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: (e) => {
                              e.stopPropagation();
                              handleReset();
                            },
                            className: "absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors shadow-lg hover:scale-105 active:scale-95",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 p-8", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mx-auto shadow-inner border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 text-blue-500" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[15px] text-black/80 dark:text-white/80", children: "Drag & Drop or Click to Upload" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-black/40 dark:text-white/40 mt-1.5 font-medium", children: "Supports PNG, JPG, DICOM up to 20 MB" })
                        ] })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: inputRef,
                      type: "file",
                      accept: "image/*,.dcm",
                      className: "hidden",
                      onChange: (e) => {
                        var _a;
                        const f = (_a = e.target.files) == null ? void 0 : _a[0];
                        if (f) handleFile(f);
                      }
                    }
                  ),
                  preview && progress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 bg-black/[0.03] dark:bg-white/[0.03] p-5 rounded-2xl border border-black/5 dark:border-white/5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[13px] font-semibold text-black/60 dark:text-white/60", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading scan data..." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        progress,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Progress,
                      {
                        value: progress,
                        className: "h-2 bg-black/10 dark:bg-white/10"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        className: "rounded-xl border-black/10 dark:border-white/10 shadow-sm text-[13px] font-semibold h-11 px-5 hover:bg-black/5 dark:hover:bg-white/5",
                        onClick: () => {
                          var _a;
                          return (_a = inputRef.current) == null ? void 0 : _a.click();
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2 opacity-70" }),
                          "Choose File"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        className: "rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 text-[13px] font-semibold h-11 px-6 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95",
                        disabled: !preview || analyzing || progress < 100,
                        onClick: analyzeImage,
                        children: analyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                          "Analyzing..."
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 mr-2" }),
                          "Run Analysis"
                        ] })
                      }
                    )
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: analyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
              className: "bg-white/60 dark:bg-black/40 backdrop-blur-3xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-500/20 p-10 flex flex-col items-center justify-center text-center space-y-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-20 h-20 flex items-center justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-[3px] border-black/5 dark:border-white/5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-8 h-8 text-blue-500 animate-pulse" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg text-black/80 dark:text-white/80", children: "Processing Neural Network" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] text-black/50 dark:text-white/50 mt-1 font-medium", children: "Scanning for abnormalities and analyzing tissue density..." })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: result && !analyzing && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 dark:bg-black/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-white dark:border-white/10 overflow-hidden relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 relative z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 text-[10px] uppercase tracking-widest font-bold mb-3 rounded-md px-2.5 py-1", children: result.modality }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-semibold tracking-tight text-black/90 dark:text-white/90 leading-snug", children: result.finding })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap pt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: `px-3 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 ${result.isNormal ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-orange-500/10 text-orange-700 dark:text-orange-400"}`,
                            children: [
                              result.isNormal ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                              result.isNormal ? "Normal Range" : "Review Required"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `px-3 py-1.5 rounded-lg text-[13px] font-semibold ${result.urgency === "routine" ? "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60" : result.urgency === "follow-up" ? "bg-yellow-500/10 text-yellow-700" : "bg-red-500/10 text-red-700"}`,
                            children: URGENCY_LABELS[result.urgency]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/50 dark:bg-white/5 rounded-2xl p-6 min-w-[160px] text-center border border-black/5 dark:border-white/5 shadow-sm backdrop-blur-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl font-light tracking-tighter text-blue-500 mb-1", children: [
                        result.confidence,
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "%" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40", children: "AI Confidence" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Progress,
                        {
                          value: result.confidence,
                          className: "h-1.5 bg-black/10 dark:bg-white/10 mt-4"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-8 border-t border-black/5 dark:border-white/5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[12px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-5 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4" }),
                      "Detailed Insights"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: result.insights.map((ins, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-4 bg-white/50 dark:bg-black/40 rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-blue-600 dark:text-blue-400", children: i + 1 }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] font-medium text-black/70 dark:text-white/70 leading-relaxed", children: ins })
                        ]
                      },
                      ins
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        className: "rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 text-[13px] font-semibold h-11 px-6 transition-all hover:shadow-lg active:scale-95",
                        disabled: savedToTimeline || addTimeline.isPending,
                        onClick: handleSaveTimeline,
                        children: [
                          savedToTimeline ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
                          savedToTimeline ? "Saved to Timeline" : "Save to Timeline"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        className: "rounded-xl border-black/10 dark:border-white/10 shadow-sm text-[13px] font-semibold h-11 px-5 hover:bg-black/5 dark:hover:bg-white/5 bg-white/50 dark:bg-transparent",
                        onClick: handleCopyShareable,
                        children: [
                          copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-4 h-4 mr-2 opacity-70" }),
                          "Share Report"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        className: "rounded-xl text-[13px] font-semibold h-11 px-5 hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60 ml-auto",
                        onClick: handleReset,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-2 opacity-70" }),
                          "New Analysis"
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-5 bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-black/30 dark:text-white/30 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[13px] text-black/50 dark:text-white/50 leading-relaxed font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-black/70 dark:text-white/70", children: "Disclaimer:" }),
                  " ",
                  "This tool uses an AI simulation for demonstration purposes. It does not provide medical diagnoses. Always consult a certified healthcare professional."
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/5 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 py-6 border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-[15px] text-black/80 dark:text-white/80", children: "Analysis History" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-black/5 dark:divide-white/5", children: PAST_SCANS.map((scan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-6 md:px-8 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${scan.isNormal ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400" : "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400"}`,
                            children: scan.isNormal ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-6 h-6" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] font-semibold text-black/80 dark:text-white/80 leading-snug group-hover:text-blue-500 transition-colors", children: scan.finding }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mt-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60 border-0 text-[10px] uppercase tracking-wider font-bold rounded-md px-2 py-0.5 hover:bg-black/10 cursor-default", children: scan.modality }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-medium text-black/40 dark:text-white/40", children: scan.date })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right pl-4 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest ${scan.isNormal ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"}`,
                          children: [
                            scan.confidence,
                            "% Match"
                          ]
                        }
                      ) })
                    ]
                  },
                  scan.id
                )) })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
export {
  MedicalImagingPage as default
};
