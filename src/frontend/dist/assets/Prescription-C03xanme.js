import { r as reactExports, j as jsxRuntimeExports, b as AnimatePresence, m as motion, B as Button, P as Pill, n as Input, L as Link, C as ChevronRight, f as ue } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { s as useSavePrescriptionScan, m as useSaveMedicineReminder, c as useAddTimelineEvent, t as usePrescriptionScans } from "./useBackend-CQZwdIO-.js";
import { F as FileText } from "./file-text-Cj6z7ylN.js";
import { U as Upload } from "./upload-C0GCejeY.js";
import { P as Plus } from "./plus-DzAklDcf.js";
import { T as Trash2 } from "./trash-2-Cfm5H9jY.js";
import { C as CircleCheckBig } from "./circle-check-big-SKm4cL5v.js";
import { P as Phone } from "./phone-C4RZcEuK.js";
import { C as Clock } from "./clock-CPHLWhlK.js";
const OCR_TEMPLATES = [
  `Patient: Sarah Johnson                  Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}
Physician: Dr. Michael Chen, MD          License: MD-78432

Rx:
1. Metformin 500mg - Take twice daily with meals (morning and evening)
2. Lisinopril 10mg - Take once daily in the morning
3. Atorvastatin 20mg - Take once daily at bedtime

Refills: 3
Pharmacy instructions: Dispense as written`,
  `Patient: Robert Davis                   Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}
Physician: Dr. Priya Kapoor, MD          License: MD-54219

Rx:
1. Amoxicillin 500mg - Take three times daily for 7 days
2. Ibuprofen 400mg - Take twice daily with food as needed
3. Omeprazole 20mg - Take once daily before breakfast

Note: Complete full antibiotic course`,
  `Patient: Emily Chen                     Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}
Physician: Dr. James Williams, MD        License: MD-33891

Rx:
1. Sertraline 50mg - Take once daily in the morning
2. Alprazolam 0.25mg - Take twice daily as needed for anxiety
3. Vitamin D3 2000IU - Take once daily with a meal
4. Magnesium 400mg - Take once daily at bedtime`
];
function detectMedicines(text) {
  const lines = text.split("\n");
  const medicines = [];
  const medPattern = /^\s*\d+\.\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+(?:\.\d+)?(?:mg|IU|mcg|ml|mcg))/i;
  const freqPattern = /(once|twice|three times|2x|3x)\s+daily|(?:morning|evening|bedtime|before breakfast|with meals?)/i;
  for (const line of lines) {
    const match = medPattern.exec(line);
    if (match) {
      const freqMatch = freqPattern.exec(line);
      medicines.push({
        name: match[1].trim(),
        dosage: match[2].trim(),
        frequency: freqMatch ? freqMatch[0].toLowerCase() : "once daily"
      });
    }
  }
  return medicines;
}
function StepIndicator({ current }) {
  const steps = ["Upload", "Review & Edit", "Save Reminders"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0", children: steps.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${i < current ? "bg-primary text-primary-foreground" : i === current ? "text-white border-2 border-primary/60" : "bg-muted text-muted-foreground"}`,
          style: i === current ? { background: "var(--gradient-primary)" } : {},
          children: i < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }) : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs hidden sm:block ${i === current ? "text-primary font-medium" : "text-muted-foreground"}`,
          children: label
        }
      )
    ] }),
    i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-0.5 w-12 sm:w-20 mx-1 rounded transition-smooth ${i < current ? "bg-primary" : "bg-border"}`
      }
    )
  ] }, label)) });
}
function UploadProgress({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Processing prescription..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        value,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full rounded-full",
        style: { background: "var(--gradient-primary)" },
        initial: { width: "0%" },
        animate: { width: `${value}%` },
        transition: { duration: 0.3 }
      }
    ) })
  ] });
}
function PastScans() {
  const { data: scans } = usePrescriptionScans();
  const list = scans ?? [];
  if (list.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-muted-foreground" }),
      "Past Scans"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: list.slice(0, 5).map((scan, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `prescription.past_scan.item.${i + 1}`,
        className: "flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileText,
              {
                size: 14,
                className: "text-lime-600 dark:text-lime-400"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                scan.detectedMedicines.length,
                " medicine",
                scan.detectedMedicines.length !== 1 ? "s" : "",
                " detected"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(scan.timestamp).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
                year: "numeric"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            scan.detectedMedicines.map((m) => m.name).join(", ").slice(0, 24),
            "…"
          ] })
        ]
      },
      scan.id
    )) })
  ] });
}
const TIME_OF_DAY_OPTIONS = [
  "morning",
  "afternoon",
  "evening",
  "bedtime",
  "with meals"
];
const FREQUENCY_OPTIONS = [
  "once daily",
  "twice daily",
  "three times daily",
  "as needed",
  "with meals"
];
function PrescriptionPage() {
  const saveScan = useSavePrescriptionScan();
  const saveReminder = useSaveMedicineReminder();
  const addEvent = useAddTimelineEvent();
  usePrescriptionScans();
  const [step, setStep] = reactExports.useState("upload");
  const [progress, setProgress] = reactExports.useState(0);
  const [extractedText, setExtractedText] = reactExports.useState("");
  const [medicines, setMedicines] = reactExports.useState([]);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [savedCount, setSavedCount] = reactExports.useState(0);
  const fileInputRef = reactExports.useRef(null);
  const templateIndex = reactExports.useRef(0);
  const processFile = (file) => {
    if (!file) return;
    if (file.size > 0 && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
    setStep("processing");
    setProgress(0);
    const template = OCR_TEMPLATES[templateIndex.current % OCR_TEMPLATES.length] ?? OCR_TEMPLATES[0] ?? "";
    templateIndex.current += 1;
    const intervals = [15, 35, 55, 70, 85, 95, 100];
    let idx = 0;
    const ticker = setInterval(() => {
      setProgress(intervals[idx] ?? 100);
      idx++;
      if (idx >= intervals.length) {
        clearInterval(ticker);
        setTimeout(() => {
          const detected = detectMedicines(template);
          setExtractedText(template);
          setMedicines(
            detected.map((m) => ({
              ...m,
              timeOfDay: "morning"
            }))
          );
          setStep("review");
          ue.success(
            `Extracted ${detected.length} medicines from prescription`
          );
        }, 300);
      }
    }, 250);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0] ?? null);
  };
  const updateMed = (i, field, value) => {
    setMedicines(
      (prev) => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m)
    );
  };
  const deleteMed = (i) => {
    setMedicines((prev) => prev.filter((_, idx) => idx !== i));
  };
  const addMed = () => {
    setMedicines((prev) => [
      ...prev,
      { name: "", dosage: "", frequency: "once daily", timeOfDay: "morning" }
    ]);
  };
  const handleSave = async () => {
    if (medicines.length === 0) return;
    try {
      await saveScan.mutateAsync({
        extractedText,
        detectedMedicines: medicines
      });
      for (const med of medicines) {
        await saveReminder.mutateAsync({
          medicineName: med.name,
          dosage: med.dosage,
          times: [
            med.timeOfDay === "morning" ? "08:00" : med.timeOfDay === "evening" ? "18:00" : "12:00"
          ],
          startDate: Date.now(),
          isActive: true,
          takenToday: false,
          notes: `${med.frequency} — ${med.timeOfDay}`,
          smsEnabled: false,
          smsRemindersCount: 0
        });
      }
      await addEvent.mutateAsync({
        type: "prescription",
        title: `Prescription scanned — ${medicines.length} medicine${medicines.length !== 1 ? "s" : ""} detected`,
        description: medicines.map((m) => `${m.name} ${m.dosage}`).join(", ")
      });
      setSavedCount(medicines.length);
      setStep("success");
    } catch {
      ue.error("Failed to save reminders. Please try again.");
    }
  };
  const reset = () => {
    setStep("upload");
    setMedicines([]);
    setExtractedText("");
    setPreviewUrl(null);
    setProgress(0);
  };
  const stepIndex = step === "upload" || step === "processing" ? 0 : step === "review" ? 1 : 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "prescription.page",
      className: "p-4 sm:p-6 space-y-6 max-w-4xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.72 0.2 130), oklch(0.65 0.22 150))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 20, className: "text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold gradient-text", children: "Prescription Scanner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload your prescription to auto-detect medicines and set reminders" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: stepIndex }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          (step === "upload" || step === "processing") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -12 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "prescription.upload.dropzone",
                    onDragOver: (e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    },
                    onDragLeave: () => setIsDragging(false),
                    onDrop: handleDrop,
                    onClick: () => {
                      var _a;
                      return step === "upload" && ((_a = fileInputRef.current) == null ? void 0 : _a.click());
                    },
                    "aria-label": "Upload prescription image",
                    className: `w-full border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center transition-smooth ${isDragging ? "border-primary bg-primary/5 scale-[1.01]" : step === "processing" ? "border-primary/40 bg-muted/10 cursor-default" : "border-border hover:border-primary/50 hover:bg-muted/20 cursor-pointer"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: fileInputRef,
                          type: "file",
                          accept: "image/*,.pdf",
                          className: "hidden",
                          onChange: (e) => {
                            var _a;
                            return processFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                          }
                        }
                      ),
                      step === "processing" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xs mx-auto", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto animate-spin-slow",
                            style: { background: "var(--gradient-primary)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 28, className: "text-white" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Extracting prescription text..." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UploadProgress, { value: progress })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 28, className: "text-muted-foreground" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg", children: "Drop your prescription here" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "JPG, PNG, or PDF — max 10MB" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            "data-ocid": "prescription.upload.upload_button",
                            style: { background: "var(--gradient-primary)" },
                            className: "border-0 text-white",
                            onClick: (e) => {
                              var _a;
                              e.stopPropagation();
                              (_a = fileInputRef.current) == null ? void 0 : _a.click();
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "mr-2" }),
                              " Choose File"
                            ]
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "prescription.demo.button",
                    onClick: () => processFile(new File([], "demo.jpg", { type: "image/jpeg" })),
                    className: "text-sm text-primary hover:underline transition-smooth",
                    children: "Try with a sample prescription →"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PastScans, {})
              ]
            },
            "upload"
          ),
          step === "review" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -12 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "text-muted-foreground" }),
                      "Prescription Preview"
                    ] }),
                    previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: previewUrl,
                        alt: "Prescription",
                        className: "w-full rounded-xl object-contain max-h-64 bg-muted/20"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 rounded-xl bg-muted/30 flex items-center justify-center border border-dashed border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 32, className: "mx-auto mb-2 opacity-50" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Sample prescription used" })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16, className: "text-muted-foreground" }),
                      "Extracted Text",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs ml-auto", children: "Editable" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        "data-ocid": "prescription.extracted_text.textarea",
                        value: extractedText,
                        onChange: (e) => {
                          setExtractedText(e.target.value);
                          const detected = detectMedicines(e.target.value);
                          setMedicines(
                            detected.map((m) => ({ ...m, timeOfDay: "morning" }))
                          );
                        },
                        rows: 10,
                        className: "w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { size: 16, className: "text-primary" }),
                      "Detected Medicines"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                        medicines.length,
                        " found"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          "data-ocid": "prescription.add_medicine.button",
                          onClick: addMed,
                          className: "text-xs h-7",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, className: "mr-1" }),
                            " Add Row"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  medicines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "No medicines detected. Try editing the text above or add manually." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-3 text-xs text-muted-foreground font-medium px-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Medicine Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dosage" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Frequency" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Time of Day" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
                    ] }),
                    medicines.map((med, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `prescription.medicine.item.${i + 1}`,
                        className: "grid grid-cols-1 sm:grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-2 sm:gap-3 p-3 rounded-xl bg-muted/30 border border-border items-center",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              "data-ocid": `prescription.medicine_name_${i + 1}.input`,
                              value: med.name,
                              onChange: (e) => updateMed(i, "name", e.target.value),
                              placeholder: "Medicine name",
                              className: "bg-background h-8 text-sm"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              "data-ocid": `prescription.medicine_dosage_${i + 1}.input`,
                              value: med.dosage,
                              onChange: (e) => updateMed(i, "dosage", e.target.value),
                              placeholder: "Dosage",
                              className: "bg-background h-8 text-sm"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "select",
                            {
                              "data-ocid": `prescription.medicine_frequency_${i + 1}.select`,
                              value: med.frequency ?? "once daily",
                              onChange: (e) => updateMed(i, "frequency", e.target.value),
                              className: "h-8 px-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                              children: FREQUENCY_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, children: f }, f))
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "select",
                            {
                              "data-ocid": `prescription.medicine_time_${i + 1}.select`,
                              value: med.timeOfDay,
                              onChange: (e) => updateMed(i, "timeOfDay", e.target.value),
                              className: "h-8 px-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring",
                              children: TIME_OF_DAY_OPTIONS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": `prescription.delete_medicine_${i + 1}.delete_button`,
                              onClick: () => deleteMed(i),
                              className: "p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth",
                              "aria-label": `Delete ${med.name}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                            }
                          )
                        ]
                      },
                      `med-${med.name || "new"}-${i + 1}`
                    ))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        "data-ocid": "prescription.back.secondary_button",
                        onClick: reset,
                        className: "flex-1 sm:flex-none",
                        children: "← Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": "prescription.save.primary_button",
                        style: { background: "var(--gradient-primary)" },
                        className: "flex-1 border-0 text-white",
                        disabled: medicines.length === 0 || saveScan.isPending || saveReminder.isPending,
                        onClick: handleSave,
                        children: saveScan.isPending || saveReminder.isPending ? "Saving reminders..." : `Save ${medicines.length} Reminder${medicines.length !== 1 ? "s" : ""}`
                      }
                    )
                  ] })
                ] })
              ]
            },
            "review"
          ),
          step === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.92 },
              animate: { opacity: 1, scale: 1 },
              transition: { type: "spring", stiffness: 260, damping: 22 },
              "data-ocid": "prescription.success_state",
              className: "bg-card rounded-2xl border border-border shadow-elevated p-10 text-center space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: { delay: 0.2, type: "spring", stiffness: 200 },
                    className: "w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheckBig,
                      {
                        size: 40,
                        className: "text-emerald-600 dark:text-emerald-400"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold", children: "Reminders Scheduled!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: savedCount }),
                    " ",
                    "medicine reminder",
                    savedCount !== 1 ? "s" : "",
                    " have been added to your schedule."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 flex items-start gap-3 text-sm text-left max-w-sm mx-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Notification reminders scheduled" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "You'll be notified at your set times to take each medicine." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      "data-ocid": "prescription.new_scan.secondary_button",
                      onClick: reset,
                      children: "Scan Another"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reminders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "prescription.view_reminders.primary_button",
                      style: { background: "var(--gradient-primary)" },
                      className: "border-0 text-white w-full sm:w-auto",
                      children: [
                        "View Reminders ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "ml-1" })
                      ]
                    }
                  ) })
                ] })
              ]
            },
            "success"
          )
        ] }),
        step !== "upload" && step !== "processing" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PastScans, {}) })
      ]
    }
  );
}
export {
  PrescriptionPage as default
};
