import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAddTimelineEvent } from "@/hooks/useBackend";
import {
  Activity,
  Brain,
  CheckCircle2,
  ClipboardCopy,
  Eye,
  RotateCcw,
  Save,
  Shield,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ImagingResult {
  finding: string;
  confidence: number;
  modality: string;
  insights: string[];
  isNormal: boolean;
  urgency: "routine" | "follow-up" | "consult";
}

interface PastScan {
  id: string;
  finding: string;
  modality: string;
  confidence: number;
  isNormal: boolean;
  date: string;
}

// ─── Simulated CNN Results ────────────────────────────────────────────────────
const IMAGING_RESULTS: ImagingResult[] = [
  {
    finding: "No significant abnormalities detected",
    confidence: 92,
    modality: "Chest X-Ray",
    isNormal: true,
    urgency: "routine",
    insights: [
      "Lung fields appear clear and well-aerated bilaterally",
      "Cardiac silhouette is within normal size limits",
      "No evidence of pleural effusion, pneumothorax, or consolidation",
    ],
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
      "Clinical correlation with patient symptoms is strongly advised",
    ],
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
      "Soft tissue appearance within normal limits",
    ],
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
      "Repeat imaging in 4–6 weeks recommended for comparison",
    ],
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
      "Prompt consultation with a radiologist or specialist is recommended",
    ],
  },
];

const PAST_SCANS: PastScan[] = [
  {
    id: "ps1",
    finding: "No significant abnormalities detected",
    modality: "Chest X-Ray",
    confidence: 94,
    isNormal: true,
    date: "Apr 16, 2026",
  },
  {
    id: "ps2",
    finding: "Normal bone density and structure",
    modality: "Bone X-Ray",
    confidence: 89,
    isNormal: true,
    date: "Apr 8, 2026",
  },
  {
    id: "ps3",
    finding: "Minor density variation observed",
    modality: "CT Scan",
    confidence: 77,
    isNormal: false,
    date: "Mar 28, 2026",
  },
];

const URGENCY_LABELS = {
  routine: "Routine — no immediate action",
  "follow-up": "Follow-up recommended",
  consult: "Specialist consult advised",
};

function pickResult(): ImagingResult {
  return IMAGING_RESULTS[Math.floor(Math.random() * IMAGING_RESULTS.length)];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MedicalImagingPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ImagingResult | null>(null);
  const [savedToTimeline, setSavedToTimeline] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addTimeline = useAddTimelineEvent();

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
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
    await new Promise((r) => setTimeout(r, 3000));
    setResult(pickResult());
    setAnalyzing(false);
    setSavedToTimeline(false);
  }

  function handleCopyShareable() {
    if (!result) return;
    const text = `AI Medical Imaging Report\n\nFinding: ${result.finding}\nModality: ${result.modality}\nAI Confidence: ${result.confidence}%\nStatus: ${result.isNormal ? "Within normal range" : "Requires review"}\n\nInsights:\n${result.insights.map((ins, i) => `${i + 1}. ${ins}`).join("\n")}\n\nDisclaimer: AI-simulated result. Not a medical diagnosis. Consult a licensed radiologist.`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Report copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    });
  }

  function handleSaveTimeline() {
    if (!result) return;
    addTimeline.mutate(
      {
        type: "symptom",
        title: `Medical Imaging: ${result.finding}`,
        description: `${result.modality} · ${result.confidence}% confidence · ${URGENCY_LABELS[result.urgency]}`,
      },
      {
        onSuccess: () => {
          setSavedToTimeline(true);
          toast.success("Saved to Health Timeline!");
        },
      },
    );
  }

  function handleReset() {
    setPreview(null);
    setResult(null);
    setSavedToTimeline(false);
    setProgress(0);
    setAnalyzing(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }

  return (
    <div
      className="min-h-screen bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]"
      data-ocid="medical_imaging.page"
    >
      {/* ── MacOS Style Header ────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-blue-400 to-blue-500 shadow-sm flex items-center justify-center border border-white/20">
            <Brain className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-black/90 dark:text-white/90">
              Medical Imaging Analysis
            </h1>
            <p className="text-[11px] font-semibold text-black/40 dark:text-white/40 tracking-widest uppercase">
              AI-Powered CNN Diagnostics
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8 max-w-4xl mx-auto">
        {/* ── Upload Section ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 dark:border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex items-center gap-2 bg-white/40 dark:bg-black/20">
              <Upload className="w-4 h-4 text-blue-500" />
              <h2 className="font-semibold text-sm">Upload Scan</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex gap-2 flex-wrap">
                {["X-Ray", "MRI", "CT Scan", "Ultrasound", "DICOM"].map((m) => (
                  <Badge
                    key={m}
                    variant="secondary"
                    className="text-[10px] uppercase tracking-wider font-semibold bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-black/70 dark:text-white/70 rounded-lg py-1 px-3 border-0 transition-colors cursor-default"
                  >
                    {m}
                  </Badge>
                ))}
              </div>

              {/* Dropzone */}
              <button
                type="button"
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => !preview && inputRef.current?.click()}
                className={`relative rounded-3xl transition-all duration-300 w-full min-h-[280px] flex items-center justify-center overflow-hidden ${
                  isDragging
                    ? "bg-blue-500/10 border-2 border-blue-500/50 scale-[0.99]"
                    : preview
                      ? "bg-black/[0.02] dark:bg-white/[0.02] cursor-default border border-black/5 dark:border-white/5"
                      : "bg-white/80 dark:bg-black/20 border border-black/10 dark:border-white/10 hover:shadow-lg cursor-pointer hover:border-black/20 group"
                }`}
              >
                {preview ? (
                  <div className="relative w-full h-full p-4 flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Medical scan"
                      className="max-w-full max-h-[340px] object-contain rounded-2xl shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors shadow-lg hover:scale-105 active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mx-auto shadow-inner border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Activity className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-[15px] text-black/80 dark:text-white/80">
                        Drag & Drop or Click to Upload
                      </p>
                      <p className="text-[13px] text-black/40 dark:text-white/40 mt-1.5 font-medium">
                        Supports PNG, JPG, DICOM up to 20 MB
                      </p>
                    </div>
                  </div>
                )}
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/*,.dcm"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />

              {preview && progress < 100 && (
                <div className="space-y-2.5 bg-black/[0.03] dark:bg-white/[0.03] p-5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex justify-between text-[13px] font-semibold text-black/60 dark:text-white/60">
                    <span>Uploading scan data...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2 bg-black/10 dark:bg-white/10"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border-black/10 dark:border-white/10 shadow-sm text-[13px] font-semibold h-11 px-5 hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2 opacity-70" />
                  Choose File
                </Button>
                <Button
                  type="button"
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 text-[13px] font-semibold h-11 px-6 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
                  disabled={!preview || analyzing || progress < 100}
                  onClick={analyzeImage}
                >
                  {analyzing ? (
                    <>
                      <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Run Analysis
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Analysis Loading ───────────────────────────────────────── */}
        <AnimatePresence>
          {analyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/60 dark:bg-black/40 backdrop-blur-3xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-500/20 p-10 flex flex-col items-center justify-center text-center space-y-5"
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[3px] border-black/5 dark:border-white/5" />
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 animate-spin" />
                <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
              <div>
                <p className="font-semibold text-lg text-black/80 dark:text-white/80">
                  Processing Neural Network
                </p>
                <p className="text-[14px] text-black/50 dark:text-white/50 mt-1 font-medium">
                  Scanning for abnormalities and analyzing tissue density...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Analysis Result ────────────────────────────────────────── */}
        <AnimatePresence>
          {result && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white/80 dark:bg-black/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-white dark:border-white/10 overflow-hidden relative">
                {/* Decorative glowing orb */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="space-y-4 flex-1">
                      <div>
                        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0 text-[10px] uppercase tracking-widest font-bold mb-3 rounded-md px-2.5 py-1">
                          {result.modality}
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-black/90 dark:text-white/90 leading-snug">
                          {result.finding}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap pt-1">
                        <div
                          className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 ${result.isNormal ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-orange-500/10 text-orange-700 dark:text-orange-400"}`}
                        >
                          {result.isNormal ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Shield className="w-4 h-4" />
                          )}
                          {result.isNormal ? "Normal Range" : "Review Required"}
                        </div>
                        <div
                          className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold ${result.urgency === "routine" ? "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60" : result.urgency === "follow-up" ? "bg-yellow-500/10 text-yellow-700" : "bg-red-500/10 text-red-700"}`}
                        >
                          {URGENCY_LABELS[result.urgency]}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 min-w-[160px] text-center border border-black/5 dark:border-white/5 shadow-sm backdrop-blur-sm">
                      <p className="text-5xl font-light tracking-tighter text-blue-500 mb-1">
                        {result.confidence}
                        <span className="text-2xl">%</span>
                      </p>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
                        AI Confidence
                      </p>
                      <Progress
                        value={result.confidence}
                        className="h-1.5 bg-black/10 dark:bg-white/10 mt-4"
                      />
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5">
                    <h4 className="text-[12px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-5 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Detailed Insights
                    </h4>
                    <div className="grid gap-4">
                      {result.insights.map((ins, i) => (
                        <div
                          key={ins}
                          className="flex items-start gap-4 bg-white/50 dark:bg-black/40 rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                              {i + 1}
                            </span>
                          </div>
                          <p className="text-[15px] font-medium text-black/70 dark:text-white/70 leading-relaxed">
                            {ins}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-10">
                    <Button
                      type="button"
                      className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 text-[13px] font-semibold h-11 px-6 transition-all hover:shadow-lg active:scale-95"
                      disabled={savedToTimeline || addTimeline.isPending}
                      onClick={handleSaveTimeline}
                    >
                      {savedToTimeline ? (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {savedToTimeline
                        ? "Saved to Timeline"
                        : "Save to Timeline"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl border-black/10 dark:border-white/10 shadow-sm text-[13px] font-semibold h-11 px-5 hover:bg-black/5 dark:hover:bg-white/5 bg-white/50 dark:bg-transparent"
                      onClick={handleCopyShareable}
                    >
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <ClipboardCopy className="w-4 h-4 mr-2 opacity-70" />
                      )}
                      Share Report
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="rounded-xl text-[13px] font-semibold h-11 px-5 hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60 ml-auto"
                      onClick={handleReset}
                    >
                      <RotateCcw className="w-4 h-4 mr-2 opacity-70" />
                      New Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Disclaimer ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3 p-5 bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-black/30 dark:text-white/30 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-black/50 dark:text-white/50 leading-relaxed font-medium">
              <strong className="text-black/70 dark:text-white/70">
                Disclaimer:
              </strong>{" "}
              This tool uses an AI simulation for demonstration purposes. It
              does not provide medical diagnoses. Always consult a certified
              healthcare professional.
            </p>
          </div>
        </motion.div>

        {/* ── Past Analyses Gallery ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 dark:border-white/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20">
              <h2 className="font-semibold text-[15px] text-black/80 dark:text-white/80">
                Analysis History
              </h2>
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {PAST_SCANS.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-6 md:px-8 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${scan.isNormal ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400" : "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400"}`}
                    >
                      {scan.isNormal ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Activity className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-black/80 dark:text-white/80 leading-snug group-hover:text-blue-500 transition-colors">
                        {scan.finding}
                      </p>
                      <div className="flex items-center gap-2.5 mt-1.5">
                        <Badge className="bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/60 border-0 text-[10px] uppercase tracking-wider font-bold rounded-md px-2 py-0.5 hover:bg-black/10 cursor-default">
                          {scan.modality}
                        </Badge>
                        <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                        <span className="text-[12px] font-medium text-black/40 dark:text-white/40">
                          {scan.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right pl-4 hidden sm:block">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest ${scan.isNormal ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"}`}
                    >
                      {scan.confidence}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
