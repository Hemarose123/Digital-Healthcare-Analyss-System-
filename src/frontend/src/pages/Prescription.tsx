import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Phone,
  Pill,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddTimelineEvent,
  usePrescriptionScans,
  useSaveMedicineReminder,
  useSavePrescriptionScan,
} from "../hooks/useBackend";
import type { DetectedMedicine } from "../types/health";

// ─── OCR Templates ────────────────────────────────────────────────────────────
const OCR_TEMPLATES = [
  `Patient: Sarah Johnson                  Date: ${new Date().toLocaleDateString()}
Physician: Dr. Michael Chen, MD          License: MD-78432

Rx:
1. Metformin 500mg - Take twice daily with meals (morning and evening)
2. Lisinopril 10mg - Take once daily in the morning
3. Atorvastatin 20mg - Take once daily at bedtime

Refills: 3
Pharmacy instructions: Dispense as written`,

  `Patient: Robert Davis                   Date: ${new Date().toLocaleDateString()}
Physician: Dr. Priya Kapoor, MD          License: MD-54219

Rx:
1. Amoxicillin 500mg - Take three times daily for 7 days
2. Ibuprofen 400mg - Take twice daily with food as needed
3. Omeprazole 20mg - Take once daily before breakfast

Note: Complete full antibiotic course`,

  `Patient: Emily Chen                     Date: ${new Date().toLocaleDateString()}
Physician: Dr. James Williams, MD        License: MD-33891

Rx:
1. Sertraline 50mg - Take once daily in the morning
2. Alprazolam 0.25mg - Take twice daily as needed for anxiety
3. Vitamin D3 2000IU - Take once daily with a meal
4. Magnesium 400mg - Take once daily at bedtime`,
];

// ─── Medicine Parser ──────────────────────────────────────────────────────────
function detectMedicines(text: string): DetectedMedicine[] {
  const lines = text.split("\n");
  const medicines: DetectedMedicine[] = [];
  const medPattern =
    /^\s*\d+\.\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+(?:\.\d+)?(?:mg|IU|mcg|ml|mcg))/i;
  const freqPattern =
    /(once|twice|three times|2x|3x)\s+daily|(?:morning|evening|bedtime|before breakfast|with meals?)/i;

  for (const line of lines) {
    const match = medPattern.exec(line);
    if (match) {
      const freqMatch = freqPattern.exec(line);
      medicines.push({
        name: match[1].trim(),
        dosage: match[2].trim(),
        frequency: freqMatch ? freqMatch[0].toLowerCase() : "once daily",
      });
    }
  }
  return medicines;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  const steps = ["Upload", "Review & Edit", "Save Reminders"];
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${
                i < current
                  ? "bg-primary text-primary-foreground"
                  : i === current
                    ? "text-white border-2 border-primary/60"
                    : "bg-muted text-muted-foreground"
              }`}
              style={
                i === current ? { background: "var(--gradient-primary)" } : {}
              }
            >
              {i < current ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span
              className={`text-xs hidden sm:block ${
                i === current
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 sm:w-20 mx-1 rounded transition-smooth ${
                i < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function UploadProgress({ value }: { value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Processing prescription...</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-primary)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// ─── Past Scans ───────────────────────────────────────────────────────────────
function PastScans() {
  const { data: scans } = usePrescriptionScans();
  const list = scans ?? [];
  if (list.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <Clock size={16} className="text-muted-foreground" />
        Past Scans
      </h3>
      <div className="space-y-2">
        {list.slice(0, 5).map((scan, i) => (
          <div
            key={scan.id}
            data-ocid={`prescription.past_scan.item.${i + 1}`}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                <FileText
                  size={14}
                  className="text-lime-600 dark:text-lime-400"
                />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {scan.detectedMedicines.length} medicine
                  {scan.detectedMedicines.length !== 1 ? "s" : ""} detected
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(scan.timestamp).toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {scan.detectedMedicines
                .map((m) => m.name)
                .join(", ")
                .slice(0, 24)}
              …
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Step = "upload" | "processing" | "review" | "success";
type EditableMed = DetectedMedicine & {
  timeOfDay: string;
};

const TIME_OF_DAY_OPTIONS = [
  "morning",
  "afternoon",
  "evening",
  "bedtime",
  "with meals",
];
const FREQUENCY_OPTIONS = [
  "once daily",
  "twice daily",
  "three times daily",
  "as needed",
  "with meals",
];

export default function PrescriptionPage() {
  const saveScan = useSavePrescriptionScan();
  const saveReminder = useSaveMedicineReminder();
  const addEvent = useAddTimelineEvent();
  usePrescriptionScans();

  const [step, setStep] = useState<Step>("upload");
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [medicines, setMedicines] = useState<EditableMed[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const templateIndex = useRef(0);

  const processFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 0 && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
    setStep("processing");
    setProgress(0);

    // Simulate OCR progress
    const template =
      OCR_TEMPLATES[templateIndex.current % OCR_TEMPLATES.length] ??
      OCR_TEMPLATES[0] ??
      "";
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
              timeOfDay: "morning",
            })),
          );
          setStep("review");
          toast.success(
            `Extracted ${detected.length} medicines from prescription`,
          );
        }, 300);
      }
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0] ?? null);
  };

  const updateMed = (i: number, field: keyof EditableMed, value: string) => {
    setMedicines((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)),
    );
  };

  const deleteMed = (i: number) => {
    setMedicines((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addMed = () => {
    setMedicines((prev) => [
      ...prev,
      { name: "", dosage: "", frequency: "once daily", timeOfDay: "morning" },
    ]);
  };

  const handleSave = async () => {
    if (medicines.length === 0) return;
    try {
      await saveScan.mutateAsync({
        extractedText,
        detectedMedicines: medicines,
      });
      for (const med of medicines) {
        await saveReminder.mutateAsync({
          medicineName: med.name,
          dosage: med.dosage,
          times: [
            med.timeOfDay === "morning"
              ? "08:00"
              : med.timeOfDay === "evening"
                ? "18:00"
                : "12:00",
          ],
          startDate: Date.now(),
          isActive: true,
          takenToday: false,
          notes: `${med.frequency} — ${med.timeOfDay}`,
          smsEnabled: false,
          smsRemindersCount: 0,
        });
      }
      await addEvent.mutateAsync({
        type: "prescription",
        title: `Prescription scanned — ${medicines.length} medicine${medicines.length !== 1 ? "s" : ""} detected`,
        description: medicines.map((m) => `${m.name} ${m.dosage}`).join(", "),
      });
      setSavedCount(medicines.length);
      setStep("success");
    } catch {
      toast.error("Failed to save reminders. Please try again.");
    }
  };

  const reset = () => {
    setStep("upload");
    setMedicines([]);
    setExtractedText("");
    setPreviewUrl(null);
    setProgress(0);
  };

  const stepIndex =
    step === "upload" || step === "processing" ? 0 : step === "review" ? 1 : 2;

  return (
    <div
      data-ocid="prescription.page"
      className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.2 130), oklch(0.65 0.22 150))",
            }}
          >
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold gradient-text">
              Prescription Scanner
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload your prescription to auto-detect medicines and set
              reminders
            </p>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center">
        <StepIndicator current={stepIndex} />
      </div>

      {/* ── Step 1: Upload ── */}
      <AnimatePresence mode="wait">
        {(step === "upload" || step === "processing") && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
          >
            <button
              type="button"
              data-ocid="prescription.upload.dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => step === "upload" && fileInputRef.current?.click()}
              aria-label="Upload prescription image"
              className={`w-full border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center transition-smooth ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : step === "processing"
                    ? "border-primary/40 bg-muted/10 cursor-default"
                    : "border-border hover:border-primary/50 hover:bg-muted/20 cursor-pointer"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => processFile(e.target.files?.[0] ?? null)}
              />
              {step === "processing" ? (
                <div className="space-y-6 max-w-xs mx-auto">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto animate-spin-slow"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <FileText size={28} className="text-white" />
                  </div>
                  <p className="font-semibold">
                    Extracting prescription text...
                  </p>
                  <UploadProgress value={progress} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                    <Upload size={28} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      Drop your prescription here
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG, or PDF — max 10MB
                    </p>
                  </div>
                  <Button
                    data-ocid="prescription.upload.upload_button"
                    style={{ background: "var(--gradient-primary)" }}
                    className="border-0 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Upload size={16} className="mr-2" /> Choose File
                  </Button>
                </div>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                data-ocid="prescription.demo.button"
                onClick={() =>
                  processFile(new File([], "demo.jpg", { type: "image/jpeg" }))
                }
                className="text-sm text-primary hover:underline transition-smooth"
              >
                Try with a sample prescription →
              </button>
            </div>

            <PastScans />
          </motion.div>
        )}

        {/* ── Step 2: Review & Edit ── */}
        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Image preview */}
              <div className="bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3">
                <h2 className="font-semibold flex items-center gap-2">
                  <Upload size={16} className="text-muted-foreground" />
                  Prescription Preview
                </h2>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Prescription"
                    className="w-full rounded-xl object-contain max-h-64 bg-muted/20"
                  />
                ) : (
                  <div className="h-52 rounded-xl bg-muted/30 flex items-center justify-center border border-dashed border-border">
                    <div className="text-center text-muted-foreground">
                      <FileText size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Sample prescription used</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Extracted text */}
              <div className="bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3">
                <h2 className="font-semibold flex items-center gap-2">
                  <FileText size={16} className="text-muted-foreground" />
                  Extracted Text
                  <Badge variant="secondary" className="text-xs ml-auto">
                    Editable
                  </Badge>
                </h2>
                <textarea
                  data-ocid="prescription.extracted_text.textarea"
                  value={extractedText}
                  onChange={(e) => {
                    setExtractedText(e.target.value);
                    const detected = detectMedicines(e.target.value);
                    setMedicines(
                      detected.map((m) => ({ ...m, timeOfDay: "morning" })),
                    );
                  }}
                  rows={10}
                  className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Parsed Medicines Table */}
            <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  <Pill size={16} className="text-primary" />
                  Detected Medicines
                </h2>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{medicines.length} found</Badge>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-ocid="prescription.add_medicine.button"
                    onClick={addMed}
                    className="text-xs h-7"
                  >
                    <Plus size={12} className="mr-1" /> Add Row
                  </Button>
                </div>
              </div>

              {medicines.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No medicines detected. Try editing the text above or add
                  manually.
                </p>
              ) : (
                <div className="space-y-3">
                  {/* Header row */}
                  <div className="hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-3 text-xs text-muted-foreground font-medium px-2">
                    <span>Medicine Name</span>
                    <span>Dosage</span>
                    <span>Frequency</span>
                    <span>Time of Day</span>
                    <span />
                  </div>

                  {medicines.map((med, i) => (
                    <div
                      key={`med-${med.name || "new"}-${i + 1}`}
                      data-ocid={`prescription.medicine.item.${i + 1}`}
                      className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1.5fr_1.5fr_auto] gap-2 sm:gap-3 p-3 rounded-xl bg-muted/30 border border-border items-center"
                    >
                      <Input
                        data-ocid={`prescription.medicine_name_${i + 1}.input`}
                        value={med.name}
                        onChange={(e) => updateMed(i, "name", e.target.value)}
                        placeholder="Medicine name"
                        className="bg-background h-8 text-sm"
                      />
                      <Input
                        data-ocid={`prescription.medicine_dosage_${i + 1}.input`}
                        value={med.dosage}
                        onChange={(e) => updateMed(i, "dosage", e.target.value)}
                        placeholder="Dosage"
                        className="bg-background h-8 text-sm"
                      />
                      <select
                        data-ocid={`prescription.medicine_frequency_${i + 1}.select`}
                        value={med.frequency ?? "once daily"}
                        onChange={(e) =>
                          updateMed(i, "frequency", e.target.value)
                        }
                        className="h-8 px-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        {FREQUENCY_OPTIONS.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      <select
                        data-ocid={`prescription.medicine_time_${i + 1}.select`}
                        value={med.timeOfDay}
                        onChange={(e) =>
                          updateMed(i, "timeOfDay", e.target.value)
                        }
                        className="h-8 px-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        {TIME_OF_DAY_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        data-ocid={`prescription.delete_medicine_${i + 1}.delete_button`}
                        onClick={() => deleteMed(i)}
                        className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth"
                        aria-label={`Delete ${med.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  data-ocid="prescription.back.secondary_button"
                  onClick={reset}
                  className="flex-1 sm:flex-none"
                >
                  ← Back
                </Button>
                <Button
                  data-ocid="prescription.save.primary_button"
                  style={{ background: "var(--gradient-primary)" }}
                  className="flex-1 border-0 text-white"
                  disabled={
                    medicines.length === 0 ||
                    saveScan.isPending ||
                    saveReminder.isPending
                  }
                  onClick={handleSave}
                >
                  {saveScan.isPending || saveReminder.isPending
                    ? "Saving reminders..."
                    : `Save ${medicines.length} Reminder${medicines.length !== 1 ? "s" : ""}`}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Success ── */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            data-ocid="prescription.success_state"
            className="bg-card rounded-2xl border border-border shadow-elevated p-10 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto"
            >
              <CheckCircle
                size={40}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </motion.div>

            <div>
              <h2 className="text-2xl font-display font-bold">
                Reminders Scheduled!
              </h2>
              <p className="text-muted-foreground mt-2">
                <span className="font-semibold text-primary">{savedCount}</span>{" "}
                medicine reminder
                {savedCount !== 1 ? "s" : ""} have been added to your schedule.
              </p>
            </div>

            {/* SMS simulation card */}
            <div className="bg-muted/40 rounded-xl p-4 flex items-start gap-3 text-sm text-left max-w-sm mx-auto">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone size={14} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Notification reminders scheduled</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You'll be notified at your set times to take each medicine.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                data-ocid="prescription.new_scan.secondary_button"
                onClick={reset}
              >
                Scan Another
              </Button>
              <Link to="/reminders">
                <Button
                  data-ocid="prescription.view_reminders.primary_button"
                  style={{ background: "var(--gradient-primary)" }}
                  className="border-0 text-white w-full sm:w-auto"
                >
                  View Reminders <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past scans at bottom (only on upload step) */}
      {step !== "upload" && step !== "processing" && (
        <div className="pt-2">
          <PastScans />
        </div>
      )}
    </div>
  );
}
