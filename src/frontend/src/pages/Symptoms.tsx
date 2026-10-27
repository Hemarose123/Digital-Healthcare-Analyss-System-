import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ChevronDown, ClipboardCopy, Save } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddSymptomCheck,
  useAddTimelineEvent,
  useSymptomChecks,
} from "../hooks/useBackend";
import type { SeverityLevel } from "../types/health";

// ─── NLP Keyword Engine ────────────────────────────────────────────────────────
interface ConditionMatch {
  condition: string;
  remedies: string[];
  lifestyle: string[];
  severity: SeverityLevel;
}

const CONDITION_MAP: { keywords: string[]; result: ConditionMatch }[] = [
  {
    keywords: ["chest pain", "chest ache", "heart", "palpitation"],
    result: {
      condition: "Cardiac / Respiratory Concern",
      remedies: [
        "Sit upright and rest immediately",
        "Loosen any tight clothing",
        "Take slow, deep breaths",
      ],
      lifestyle: [
        "Seek immediate medical evaluation",
        "Avoid exertion until assessed",
        "Track symptom onset and duration",
      ],
      severity: "red",
    },
  },
  {
    keywords: [
      "can't breathe",
      "difficulty breathing",
      "shortness of breath",
      "breathing",
    ],
    result: {
      condition: "Respiratory Distress",
      remedies: [
        "Sit upright, lean slightly forward",
        "Purse-lip breathing technique",
        "Humidify the air",
      ],
      lifestyle: [
        "Seek urgent medical attention",
        "Avoid triggers (smoke, allergens)",
        "Monitor oxygen levels if possible",
      ],
      severity: "red",
    },
  },
  {
    keywords: ["headache", "migraine", "head pain", "throbbing head"],
    result: {
      condition: "Tension Headache / Migraine",
      remedies: [
        "Rest in a dark, quiet room",
        "Cold compress on forehead",
        "Ginger tea with honey",
        "Stay well-hydrated",
      ],
      lifestyle: [
        "Reduce screen time",
        "Practice stress management",
        "Maintain consistent sleep schedule",
      ],
      severity: "green",
    },
  },
  {
    keywords: ["fever", "temperature", "chills", "hot", "sweating"],
    result: {
      condition: "Fever / Infection",
      remedies: [
        "Rest and increase fluid intake",
        "Lukewarm sponge bath",
        "Light, breathable clothing",
        "Coconut water for electrolytes",
      ],
      lifestyle: [
        "Monitor temperature every 4 hours",
        "Eat light easily digestible foods",
        "Isolate if fever persists > 3 days",
      ],
      severity: "yellow",
    },
  },
  {
    keywords: [
      "cough",
      "cold",
      "sore throat",
      "runny nose",
      "congestion",
      "sneezing",
    ],
    result: {
      condition: "Upper Respiratory Infection",
      remedies: [
        "Honey + lemon in warm water",
        "Steam inhalation with eucalyptus",
        "Gargle with salt water",
        "Elevate head while sleeping",
      ],
      lifestyle: [
        "Rest adequately",
        "Increase vitamin C intake",
        "Avoid cold drinks and dairy",
      ],
      severity: "green",
    },
  },
  {
    keywords: [
      "stomach",
      "nausea",
      "vomit",
      "diarrhea",
      "indigestion",
      "bloating",
      "abdominal",
    ],
    result: {
      condition: "Digestive Disturbance",
      remedies: [
        "Ginger tea or ginger chews",
        "BRAT diet (bananas, rice, applesauce, toast)",
        "Probiotic-rich foods (yogurt, kefir)",
        "Peppermint tea for bloating",
      ],
      lifestyle: [
        "Eat small, frequent meals",
        "Avoid spicy and fatty foods",
        "Stay hydrated with clear fluids",
      ],
      severity: "green",
    },
  },
  {
    keywords: ["anxiety", "stress", "panic", "worry", "nervous", "restless"],
    result: {
      condition: "Stress / Anxiety",
      remedies: [
        "4-7-8 breathing technique",
        "Chamomile or ashwagandha tea",
        "Progressive muscle relaxation",
        "10-minute mindfulness meditation",
      ],
      lifestyle: [
        "Reduce caffeine intake",
        "Establish a calming bedtime routine",
        "Talk to a trusted person or counselor",
      ],
      severity: "green",
    },
  },
  {
    keywords: [
      "fatigue",
      "tired",
      "exhaustion",
      "low energy",
      "weak",
      "lethargic",
    ],
    result: {
      condition: "Chronic Fatigue / Low Energy",
      remedies: [
        "Iron-rich foods (spinach, lentils, red meat)",
        "Stay hydrated throughout the day",
        "B12-rich foods or supplement",
        "Short 20-minute power naps",
      ],
      lifestyle: [
        "Aim for 7-9 hours of quality sleep",
        "Light exercise like walking",
        "Limit screen time before bed",
      ],
      severity: "green",
    },
  },
  {
    keywords: [
      "back pain",
      "back ache",
      "joint pain",
      "muscle pain",
      "neck pain",
      "shoulder pain",
    ],
    result: {
      condition: "Musculoskeletal Discomfort",
      remedies: [
        "Warm compress or heating pad",
        "Gentle stretching and mobility exercises",
        "Turmeric milk for inflammation",
        "Epsom salt bath",
      ],
      lifestyle: [
        "Improve posture and ergonomics",
        "Strengthen core muscles gradually",
        "Avoid prolonged sitting or standing",
      ],
      severity: "green",
    },
  },
  {
    keywords: ["skin", "rash", "itch", "hives", "allergy", "redness"],
    result: {
      condition: "Skin Reaction / Allergy",
      remedies: [
        "Apply cool aloe vera gel",
        "Oatmeal bath for itching",
        "Avoid known allergens",
        "Keep skin moisturized",
      ],
      lifestyle: [
        "Identify and avoid triggers",
        "Use gentle, fragrance-free products",
        "See a dermatologist if persists > 1 week",
      ],
      severity: "yellow",
    },
  },
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
  "severe bleeding",
];
const SEVERITY_OVERRIDE_YELLOW = [
  "high fever",
  "persistent",
  "worsening",
  "spreading",
  "not improving",
];

function analyzeSymptoms(text: string): ConditionMatch {
  const lower = text.toLowerCase();

  for (const item of CONDITION_MAP) {
    if (item.keywords.some((k) => lower.includes(k))) {
      let severity = item.result.severity;
      if (SEVERITY_OVERRIDE_RED.some((k) => lower.includes(k)))
        severity = "red";
      else if (
        SEVERITY_OVERRIDE_YELLOW.some((k) => lower.includes(k)) &&
        severity === "green"
      )
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
      "Practice gentle breathing exercises",
    ],
    lifestyle: [
      "Maintain a consistent sleep schedule",
      "Stay active with light exercise",
      "Reduce stress through mindfulness",
    ],
    severity: "green",
  };
}

const SEVERITY_CONFIG: Record<
  SeverityLevel,
  {
    label: string;
    advice: string;
    dotColor: string;
    badgeCls: string;
    borderCls: string;
    bgCls: string;
    icon: string;
  }
> = {
  green: {
    label: "Mild — Self-care advised",
    advice:
      "Your symptoms appear mild. With proper rest, hydration, and the remedies below, you should recover well.",
    dotColor: "bg-green-500",
    badgeCls:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    borderCls: "border-green-200 dark:border-green-900",
    bgCls: "bg-green-50 dark:bg-green-900/10",
    icon: "🟢",
  },
  yellow: {
    label: "Moderate — Monitor closely",
    advice:
      "Your symptoms warrant attention. Consider seeing a doctor if they persist for more than 48 hours or worsen.",
    dotColor: "bg-yellow-500",
    badgeCls:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    borderCls: "border-yellow-200 dark:border-yellow-900",
    bgCls: "bg-yellow-50 dark:bg-yellow-900/10",
    icon: "🟡",
  },
  red: {
    label: "Severe — Seek immediate help",
    advice:
      "These symptoms may indicate a serious condition. Please seek immediate medical attention or call emergency services.",
    dotColor: "bg-red-500",
    badgeCls: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    borderCls: "border-red-200 dark:border-red-900",
    bgCls: "bg-red-50 dark:bg-red-900/10",
    icon: "🔴",
  },
};

interface AnalysisResult extends ConditionMatch {
  savedToTimeline: boolean;
}

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [openHistory, setOpenHistory] = useState<string | null>(null);
  const addCheck = useAddSymptomCheck();
  const addTimeline = useAddTimelineEvent();
  const { data: history, isLoading } = useSymptomChecks();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    // Simulate NLP processing delay
    await new Promise((res) => setTimeout(res, 1400));
    const analysis = analyzeSymptoms(symptoms);
    setResult({ ...analysis, savedToTimeline: false });
    await addCheck.mutateAsync({
      symptoms: symptoms.trim(),
      severity: analysis.severity,
      suggestions: analysis.lifestyle,
      remedies: analysis.remedies,
    });
    setIsAnalyzing(false);
  };

  const handleSaveTimeline = async () => {
    if (!result) return;
    await addTimeline.mutateAsync({
      type: "symptom",
      title: `Symptom Check: ${result.condition}`,
      description: `Severity: ${result.severity.toUpperCase()} — ${symptoms.slice(0, 80)}`,
    });
    setResult((r) => (r ? { ...r, savedToTimeline: true } : r));
    toast.success("Saved to Health Timeline!");
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Symptom Analysis\n\nCondition: ${result.condition}\nSeverity: ${result.severity}\n\nRemedies:\n${result.remedies.map((r) => `• ${r}`).join("\n")}\n\nLifestyle Tips:\n${result.lifestyle.map((t) => `• ${t}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const sev = result ? SEVERITY_CONFIG[result.severity] : null;

  return (
    <div
      data-ocid="symptoms.page"
      className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-subtle">
          <span className="text-2xl">🩺</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            AI Symptom Checker
          </h1>
          <p className="text-sm text-muted-foreground">
            Natural remedy suggestions · No prescription advice
          </p>
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4"
      >
        <div>
          <label
            htmlFor="symptom-input"
            className="text-sm font-semibold text-foreground block mb-2"
          >
            Describe your symptoms in detail
          </label>
          <div className="relative">
            <textarea
              id="symptom-input"
              data-ocid="symptoms.input.textarea"
              value={symptoms}
              onChange={(e) => {
                if (e.target.value.length <= 500) setSymptoms(e.target.value);
              }}
              placeholder="e.g. I have a persistent headache and mild fever for the past 2 days, along with fatigue..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-colors placeholder:text-muted-foreground/60 text-sm"
            />
            <span
              className={`absolute bottom-3 right-3 text-xs ${symptoms.length >= 450 ? "text-orange-500" : "text-muted-foreground/50"}`}
            >
              {symptoms.length}/500
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            data-ocid="symptoms.check.primary_button"
            className="gradient-primary border-0 text-white font-semibold shadow-subtle hover:shadow-elevated transition-shadow"
            disabled={!symptoms.trim() || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Analyzing symptoms...
              </span>
            ) : (
              "Analyze Symptoms 🔍"
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Powered by keyword-based NLP simulation
          </p>
        </div>
      </motion.div>

      {/* Loading state */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            data-ocid="symptoms.analyzing.loading_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-2xl border border-border shadow-subtle p-8 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-pulse">
              <span className="text-3xl">🧠</span>
            </div>
            <div className="text-center">
              <p className="font-semibold">Analyzing your symptoms...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Identifying conditions and natural remedies
              </p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full gradient-primary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && sev && !isAnalyzing && (
          <motion.div
            data-ocid="symptoms.result.success_state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Traffic light + condition */}
            <div
              className={`rounded-2xl border ${sev.borderCls} ${sev.bgCls} p-6 space-y-4`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-14 h-14 rounded-full ${sev.dotColor} flex items-center justify-center text-white font-bold text-xl shadow-elevated flex-shrink-0 ${result.severity === "red" ? "animate-pulse" : ""}`}
                >
                  {sev.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{result.condition}</h3>
                    <Badge className={`${sev.badgeCls} border-0 font-semibold`}>
                      {sev.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{sev.advice}</p>
                </div>
              </div>
            </div>

            {/* Remedies & Tips */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-lg">🌿</span> Natural Remedies
                </h3>
                <ul className="space-y-2.5">
                  {result.remedies.map((r, i) => (
                    <motion.li
                      key={r}
                      data-ocid={`symptoms.remedy.item.${i + 1}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-accent flex-shrink-0 mt-0.5"
                      />
                      <span>{r}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-subtle p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-lg">💡</span> Lifestyle Tips
                </h3>
                <ul className="space-y-2.5">
                  {result.lifestyle.map((t, i) => (
                    <motion.li
                      key={t}
                      data-ocid={`symptoms.suggestion.item.${i + 1}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className="text-primary mt-0.5 font-bold">→</span>
                      <span>{t}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                data-ocid="symptoms.save_timeline.button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleSaveTimeline}
                disabled={result.savedToTimeline || addTimeline.isPending}
              >
                <Save size={14} />
                {result.savedToTimeline
                  ? "Saved to Timeline ✓"
                  : "Save to Timeline"}
              </Button>
              <Button
                data-ocid="symptoms.copy.button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleCopy}
              >
                <ClipboardCopy size={14} />
                Copy Results
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border shadow-subtle p-6"
      >
        <h2 className="font-semibold mb-4">Recent Symptom Checks</h2>
        {isLoading ? (
          <div className="space-y-3">
            {["a", "b"].map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : (history ?? []).length === 0 ? (
          <div
            data-ocid="symptoms.history.empty_state"
            className="py-6 flex flex-col items-center gap-2 text-center"
          >
            <span className="text-4xl opacity-30">🔍</span>
            <p className="text-sm text-muted-foreground">
              No symptom checks yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {(history ?? []).slice(0, 5).map((c, i) => {
              const sc = SEVERITY_CONFIG[c.severity];
              const isOpen = openHistory === c.id;
              return (
                <div
                  key={c.id}
                  data-ocid={`symptoms.history.item.${i + 1}`}
                  className="rounded-xl border border-border overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-left"
                    onClick={() => setOpenHistory(isOpen ? null : c.id)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${sc.dotColor}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {c.symptoms}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(c.timestamp).toLocaleDateString("en", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge
                      className={`${sc.badgeCls} border-0 text-xs flex-shrink-0`}
                    >
                      {c.severity}
                    </Badge>
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border bg-muted/20">
                          {c.remedies.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">
                                Remedies
                              </p>
                              {c.remedies.map((r) => (
                                <p key={r} className="text-xs text-foreground">
                                  • {r}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
