import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAddTimelineEvent } from "@/hooks/useBackend";
import {
  Camera,
  CheckCircle2,
  ClipboardList,
  Droplet,
  RefreshCcw,
  Save,
  Scan,
  Shield,
  Sparkles,
  Trash2,
  Upload,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import cameraImg from "../assets/camera.png";
import skinSectionImg from "../assets/skin_section.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkinCondition {
  name: string;
  confidence: number;
  severity: "mild" | "moderate" | "severe";
  remedies: { title: string; desc: string; icon: string }[];
  description: string;
  archetype: string;
  hydration: number;
  stats: { label: string; value: string }[];
}

// ─── Simulated AI Database ────────────────────────────────────────────────────
const SKIN_CONDITIONS: SkinCondition[] = [
  {
    name: "Mild Rosacea",
    confidence: 98.4,
    severity: "mild",
    archetype: "Combination T-Zone",
    hydration: 82,
    description:
      "Clinical analysis indicates mild erythematous patches with significant epidermal dehydration. Neural mesh mapping confirms localized inflammation.",
    stats: [
      { label: "Epidermal Depth", value: "0.05 mm" },
      { label: "Melanin Index", value: "Low-Medium" },
      { label: "Elasticity (R2)", value: "0.78" },
    ],
    remedies: [
      {
        title: "Cooling Support",
        desc: "Aloe Vera gel and Green Tea compresses to reduce redness.",
        icon: "🌿",
      },
      {
        title: "Barrier Repair",
        desc: "Pure Jojoba oil to mimic natural sebum and lock in moisture.",
        icon: "🧪",
      },
    ],
  },
  {
    name: "Acne Vulgaris",
    confidence: 94.2,
    severity: "moderate",
    archetype: "Oily / Sensitive",
    hydration: 65,
    description:
      "Detection of multiple closed comedones and inflammatory papules. Pores show signs of lipid congestion in the sebaceous regions.",
    stats: [
      { label: "Pore Density", value: "High" },
      { label: "Sebum Level", value: "Elevated" },
      { label: "Bacterial Index", value: "Moderate" },
    ],
    remedies: [
      {
        title: "Clarifying Therapy",
        desc: "Salicylic acid cleansers and non-comedogenic hydration.",
        icon: "🧴",
      },
      {
        title: "Blemish Control",
        desc: "Diluted tea tree oil for targeted antibacterial action.",
        icon: "✨",
      },
    ],
  },
];

export default function SkinPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinCondition | null>(null);
  const [savedToTimeline, setSavedToTimeline] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addTimeline = useAddTimelineEvent();

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setResult(null);
      setSavedToTimeline(false);
    };
    reader.readAsDataURL(file);
  }

  async function analyzeImage() {
    if (!preview) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 3000));
    setResult(
      SKIN_CONDITIONS[Math.floor(Math.random() * SKIN_CONDITIONS.length)],
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
        description: `AI confidence: ${result.confidence}% · Condition: ${result.name}`,
      },
      {
        onSuccess: () => {
          setSavedToTimeline(true);
          toast.success("Analysis saved to clinical timeline!");
        },
      },
    );
  }

  function handleReset() {
    setPreview(null);
    setResult(null);
    setSavedToTimeline(false);
    setAnalyzing(false);
  }

  return (
    <main
      className="min-h-screen pb-20 animate-in fade-in duration-1000"
      data-ocid="skin.page"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-black tracking-tight text-slate-800 mb-2"
            >
              Skin AI Analyzer
            </motion.h1>
            <p className="text-slate-400 text-lg font-medium">
              Deep dermal scanning using neural mesh topography.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-2.5 bg-white shadow-sm border border-slate-100 rounded-full flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Scanner Ready
              </span>
            </div>
          </div>
        </div>

        {/* Bento Grid Interface */}
        <div className="grid grid-cols-12 gap-8">
          {/* Centerpiece: 3D Scan Interface */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <Card className="rounded-[40px] border-0 shadow-2xl bg-white/40 backdrop-blur-2xl overflow-hidden relative min-h-[550px] border border-white/50">
              <CardContent className="p-1 h-full flex flex-col">
                <div className="flex-1 rounded-[36px] border-2 border-dashed border-blue-100/50 bg-white/60 flex flex-col items-center justify-center relative p-8">
                  {/* 3D Model / Preview Area */}
                  <AnimatePresence mode="wait">
                    {!preview ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-8 cursor-pointer group"
                        onClick={() => inputRef.current?.click()}
                      >
                        <div className="relative">
                          <img
                            src={cameraImg}
                            alt="Scanner"
                            className="w-56 h-56 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-400/20 transition-all" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">
                            Initialize Mesh Scan
                          </h3>
                          <p className="text-sm text-slate-400 max-w-xs">
                            Upload a macro photo of the skin area for deep
                            neural analysis.
                          </p>
                          <Button
                            type="button"
                            className="mt-6 rounded-2xl h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Photo
                          </Button>
                        </div>
                      </motion.div>
                    ) : analyzing ? (
                      <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-8"
                      >
                        <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_#3b82f6] animate-scan-line" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">
                            Analyzing Dermal Layers
                          </h3>
                          <div className="flex gap-1.5 justify-center">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </motion.div>
                    ) : result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6 text-center w-full max-w-lg"
                      >
                        <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2">
                          <CheckCircle2 size={40} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-slate-800 mb-2">
                            Diagnosis: {result.name}
                          </h3>
                          <p className="text-slate-500 leading-relaxed">
                            {result.description}
                          </p>
                        </div>
                        <div className="flex gap-4 mt-4">
                          <Button
                            onClick={handleSaveTimeline}
                            disabled={savedToTimeline}
                            className="rounded-2xl h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {savedToTimeline
                              ? "Saved to Timeline"
                              : "Save Analysis"}
                          </Button>
                          <Button
                            onClick={handleReset}
                            variant="outline"
                            className="rounded-2xl h-12 px-8 border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                          >
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            New Scan
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-8"
                      >
                        <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleReset}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 hover:bg-white transition-all shadow-lg"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">
                            Image Loaded
                          </h3>
                          <p className="text-sm text-slate-400">
                            Scan area is ready for neural processing.
                          </p>
                          <Button
                            type="button"
                            onClick={analyzeImage}
                            className="mt-6 rounded-2xl h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200"
                          >
                            <Scan className="w-4 h-4 mr-2" />
                            Start Deep Scan
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lower Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResultCard
                title="Hydration"
                value={result?.hydration || 0}
                unit="%"
                icon={<Droplet className="text-blue-500" />}
                color="blue"
                progress={result?.hydration}
              />
              <ResultCard
                title="Detected Archetype"
                value={result?.archetype || "—"}
                unit=""
                icon={<Shield className="text-emerald-500" />}
                color="emerald"
              />
              <ResultCard
                title="Analysis Confidence"
                value={result?.confidence || 0}
                unit="%"
                icon={<Sparkles className="text-amber-500" />}
                color="amber"
                isConfidence
              />
            </div>

            {/* AI Recommendations */}
            <Card className="rounded-[40px] border-0 shadow-sm bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    AI Personal Recommendations
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RecItem
                    emoji="🧴"
                    title="Soothing Serum"
                    desc="Targeted anti-redness formula for sensitive profiles."
                    color="blue"
                  />
                  <RecItem
                    emoji="💧"
                    title="Hydrating Mist"
                    desc="Nano-particle hydration for deep dermal penetration."
                    color="cyan"
                  />
                  <RecItem
                    emoji="🛡️"
                    title="Barrier Shield"
                    desc="Ceramide-rich protection for damaged skin barriers."
                    color="emerald"
                  />
                  <RecItem
                    emoji="✨"
                    title="Glow Tonic"
                    desc="Gentle exfoliation for enhanced cellular turnover."
                    color="amber"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: 3D Model & Detailed Diagnostics */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Skin Cross Section Model */}
            <Card className="rounded-[40px] border-0 shadow-sm bg-white overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
                  Condition Topology
                </h4>
                <div className="w-full aspect-square relative group">
                  <img
                    src={skinSectionImg}
                    alt="Skin Model"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent" />
                </div>
                <div className="w-full mt-8 space-y-3">
                  {(
                    result?.stats || [
                      { label: "Epidermal Depth", value: "—" },
                      { label: "Melanin Index", value: "—" },
                      { label: "Elasticity (R2)", value: "—" },
                    ]
                  ).map((stat) => (
                    <div
                      key={stat.label}
                      className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Natural Remedies & Diet */}
            <Card className="rounded-[40px] border-0 shadow-sm bg-blue-50/50 overflow-hidden">
              <CardContent className="p-8 space-y-10">
                {/* Remedies */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <ClipboardList size={18} />
                    </div>
                    <h4 className="font-bold text-slate-800">
                      Natural Remedies
                    </h4>
                  </div>
                  <div className="space-y-5">
                    {(
                      result?.remedies || [
                        {
                          title: "Cooling Support",
                          desc: "Initialize scan to view personalized remedies.",
                          icon: "🌿",
                        },
                        {
                          title: "Barrier Repair",
                          desc: "Scan to see recommended ingredients.",
                          icon: "🧪",
                        },
                      ]
                    ).map((rem) => (
                      <div key={rem.title} className="flex gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {rem.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-tight mb-1">
                            {rem.title}
                          </p>
                          <p className="text-xs font-medium text-slate-400 leading-relaxed">
                            {rem.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Utensils size={18} />
                    </div>
                    <h4 className="font-bold text-slate-800">Skin Care Diet</h4>
                  </div>
                  <div className="space-y-5">
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        🥗
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">
                          Anti-Inflammatory
                        </p>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed">
                          Fatty fish (Omega-3), leafy greens, and hydrating
                          berries.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        ☕
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">
                          Dietary Triggers
                        </p>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed">
                          Avoid spicy foods and excessive caffeine to prevent
                          flushing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResultCard({
  title,
  value,
  unit,
  icon,
  color,
  progress,
  isConfidence,
}: any) {
  return (
    <Card className="rounded-[32px] border-0 shadow-sm bg-white overflow-hidden group">
      <CardContent className="p-6 flex flex-col justify-between h-44">
        <div className="flex items-center justify-between">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-${color}-50 group-hover:scale-110 transition-transform`}
          >
            {icon}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {title}
          </p>
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-3xl font-black text-${color}-600 tracking-tight`}
            >
              {value}
            </span>
            <span className="text-sm font-bold text-slate-400">{unit}</span>
          </div>
          {progress !== undefined && (
            <div className="w-full bg-slate-50 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full bg-${color}-500 transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {isConfidence && (
            <div className="relative w-full h-6 mt-4 flex flex-col items-center">
              <div className="relative w-24 h-12 overflow-hidden">
                <div className="absolute w-24 h-24 border-[10px] border-slate-100 rounded-full" />
                <div
                  className="absolute w-24 h-24 border-[10px] border-blue-500 rounded-full"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                    transform: `rotate(${180 + value * 1.8}deg)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RecItem({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
  color?: string;
}) {
  return (
    <div className="bg-slate-50/50 p-4 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-sm transition-all group cursor-pointer flex items-center gap-4">
      <div
        className={
          "w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
        }
      >
        {emoji}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-800 mb-0.5">{title}</p>
        <p className="text-[11px] font-medium text-slate-400 leading-tight">
          {desc}
        </p>
      </div>
    </div>
  );
}
