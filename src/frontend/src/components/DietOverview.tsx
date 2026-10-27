import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function DietOverview() {
  // State for the AI Meal Scanner
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    name: string;
    confidence: number;
    calories: number;
    protein: number;
    fat: number;
    fiber: number;
    carbs: number;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      startAiScan();
    };
    reader.readAsDataURL(file);
  };

  const startAiScan = async () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate AI Vision Analysis delay
    await new Promise((r) => setTimeout(r, 2500));

    // Dynamic generated results
    setScanResult({
      name: "Grilled Chicken & Veggie Bowl",
      confidence: 94,
      calories: 420,
      protein: 38,
      fat: 15,
      fiber: 8,
      carbs: 22,
    });

    setIsScanning(false);
    toast.success("Meal analyzed successfully!", { icon: "✨" });
  };

  return (
    <>
      <style>{`
        .glass-panel {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        .specular-highlight {
            border-top: 1px solid rgba(255, 255, 255, 0.6);
            border-left: 1px solid rgba(255, 255, 255, 0.6);
        }
        .progress-ring-circle {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
      `}</style>

      <div className="grid grid-cols-12 gap-4 mb-8">
        {/* Daily Overview Section (Top Left) */}
        <div className="col-span-12 lg:col-span-8 glass-panel rounded-3xl p-6 specular-highlight">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                Today's Nutrition Flow
              </h3>
              <p className="text-sm text-slate-500">
                Your metabolic rate is 8% higher than average today.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/20">
                Active Analysis
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Progress Ring: Calories */}
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 mb-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label="Calories progress"
                >
                  <title>Calories progress</title>
                  <circle
                    className="text-emerald-100/30 stroke-current"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-emerald-600 stroke-current progress-ring-circle"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold leading-none text-slate-800">
                    1,840
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    Kcal
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Calories
              </span>
            </div>

            {/* Progress Ring: Protein */}
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 mb-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label="Protein progress"
                >
                  <title>Protein progress</title>
                  <circle
                    className="text-blue-100/30 stroke-current"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-blue-500 stroke-current progress-ring-circle"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset="100.5"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold leading-none text-slate-800">
                    142g
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    Protein
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Protein
              </span>
            </div>

            {/* Progress Ring: Carbs */}
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 mb-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label="Carbs progress"
                >
                  <title>Carbs progress</title>
                  <circle
                    className="text-amber-100/30 stroke-current"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-amber-500 stroke-current progress-ring-circle"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset="150.7"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold leading-none text-slate-800">
                    185g
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    Carbs
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Carbs
              </span>
            </div>

            {/* Progress Ring: Fats */}
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 mb-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  role="img"
                  aria-label="Fats progress"
                >
                  <title>Fats progress</title>
                  <circle
                    className="text-rose-100/30 stroke-current"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-rose-500 stroke-current progress-ring-circle"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset="188.4"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold leading-none text-slate-800">
                    52g
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    Fats
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700">Fats</span>
            </div>
          </div>
        </div>

        {/* AI Coach Insights (Top Right) */}
        <div className="col-span-12 lg:col-span-4 glass-panel rounded-3xl p-6 specular-highlight overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <span className="text-white text-xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">AI Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-4 border border-emerald-500/20">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Tip:</strong> Increasing fiber intake by 5g during
                  lunch can stabilize your energy levels for the afternoon
                  workout.
                </p>
                <div className="flex items-center gap-2 text-emerald-700">
                  <span className="text-sm">📈</span>
                  <span className="text-xs font-bold">High Impact</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-4 border border-blue-500/20">
                <p className="text-sm text-slate-700 mb-2">
                  Detected slightly lower hydration levels. Aim for 500ml water
                  in the next hour.
                </p>
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="text-sm">💧</span>
                  <span className="text-xs font-bold">Hydration Alert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Food Analysis Card (Bottom Left) */}
        <div className="col-span-12 lg:col-span-7 glass-panel rounded-3xl p-6 specular-highlight flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              Visual Food Analysis
            </h3>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 text-sm font-bold text-emerald-700 shadow-sm"
            >
              <span className="text-lg">📸</span> Scan Meal
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Image Section */}
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square relative group bg-slate-100 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/10 backdrop-blur-sm z-10"
                  >
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm font-bold text-slate-700 bg-white/80 px-4 py-1.5 rounded-full">
                      Analyzing Nutrients...
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {image ? (
                <img
                  src={image}
                  alt="Scanned Meal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img
                  alt="gourmet salmon bowl"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />
              )}

              <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl border border-white/40 z-20">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {scanResult ? scanResult.name : "Lunch: Roasted Salmon Bowl"}
                </p>
                <p className="text-[11px] text-slate-600 font-medium">
                  Confidence Score: {scanResult ? scanResult.confidence : 98}%
                </p>
              </div>
            </div>

            {/* Macros Breakdown Section */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-emerald-800">
                    Nutritional Breakdown
                  </h4>
                  {scanResult && (
                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                      Live Info
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Calories */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-700 font-medium">
                        Calories
                      </span>
                      <span className="font-bold text-slate-800">
                        {scanResult ? scanResult.calories : 540} kcal
                      </span>
                    </div>
                  </div>

                  {/* Protein */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="text-slate-700">Protein</span>
                      <span className="font-bold text-slate-800">
                        {scanResult ? scanResult.protein : 32}g
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: scanResult
                            ? `${Math.min(100, (scanResult.protein / 60) * 100)}%`
                            : "85%",
                        }}
                        className="bg-blue-500 h-1.5 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="text-slate-700">Fat</span>
                      <span className="font-bold text-slate-800">
                        {scanResult ? scanResult.fat : 45}g
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: scanResult
                            ? `${Math.min(100, (scanResult.fat / 80) * 100)}%`
                            : "40%",
                        }}
                        className="bg-rose-400 h-1.5 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="text-slate-700">Carbs</span>
                      <span className="font-bold text-slate-800">
                        {scanResult ? scanResult.carbs : 24}g
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: scanResult
                            ? `${Math.min(100, (scanResult.carbs / 300) * 100)}%`
                            : "65%",
                        }}
                        className="bg-amber-400 h-1.5 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Fiber */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="text-slate-700">Fiber</span>
                      <span className="font-bold text-slate-800">
                        {scanResult ? scanResult.fiber : 12}g
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: scanResult
                            ? `${Math.min(100, (scanResult.fiber / 30) * 100)}%`
                            : "80%",
                        }}
                        className="bg-purple-500 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 mt-6">
                <div className="flex gap-3">
                  <span className="text-emerald-600 mt-0.5">✅</span>
                  <p className="text-sm font-medium text-emerald-900 leading-tight">
                    {scanResult
                      ? "This meal is perfectly balanced and aligns with your weight loss goals!"
                      : "Meal matches your 'Keto-Friendly' profile perfectly."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule (Bottom Right) */}
        <div className="col-span-12 lg:col-span-5 glass-panel rounded-3xl p-6 specular-highlight">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Daily Schedule</h3>
            <button
              type="button"
              className="text-emerald-700 font-bold text-sm hover:underline"
            >
              View Calendar
            </button>
          </div>
          <div className="space-y-1 relative">
            {/* Timeline Indicator */}
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200" />

            {/* Schedule Items */}
            <div className="relative pl-12 pb-6">
              <div className="absolute left-2.5 top-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  08:00 AM
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                  COMPLETED
                </span>
              </div>
              <div className="glass-card rounded-2xl p-4 flex gap-4 items-center">
                <img
                  alt="greek yogurt breakfast"
                  className="w-12 h-12 rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">
                    Greek Yogurt Power Bowl
                  </h5>
                  <p className="text-xs text-slate-500">
                    High-protein breakfast boost
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pl-12 pb-6">
              <div className="absolute left-2.5 top-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm ring-4 ring-emerald-500/10" />
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  01:30 PM
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">
                  CURRENT
                </span>
              </div>
              <div className="glass-card rounded-2xl p-4 flex gap-4 items-center ring-2 ring-emerald-500/30">
                <img
                  alt="salmon poke bowl"
                  className="w-12 h-12 rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">
                    Seared Salmon & Quinoa
                  </h5>
                  <p className="text-xs text-slate-500">
                    Omega-3 rich lean energy
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pl-12">
              <div className="absolute left-2.5 top-1 w-3.5 h-3.5 bg-slate-200 rounded-full border-2 border-white" />
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  07:00 PM
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">
                  UPCOMING
                </span>
              </div>
              <div className="glass-card rounded-2xl p-4 flex gap-4 items-center opacity-70">
                <img
                  alt="grilled chicken dinner"
                  className="w-12 h-12 rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">
                    Lemon Herb Grilled Chicken
                  </h5>
                  <p className="text-xs text-slate-500">
                    Light evening recovery meal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
