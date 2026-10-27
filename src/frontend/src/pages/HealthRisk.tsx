import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  AlertTriangle,
  Calculator,
  CheckCircle,
  Droplets,
  Heart,
  Info,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useHealthStore } from "../store/useHealthStore";

// ─── BMI Category ─────────────────────────────────────────────────────────────
function getBMICategory(bmi: number) {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      color: "#38BDF8",
      risk: "Low–Moderate",
      icon: "⚠️",
    };
  if (bmi < 25)
    return { label: "Normal", color: "#34D399", risk: "Low", icon: "✅" };
  if (bmi < 30)
    return {
      label: "Overweight",
      color: "#FBBF24",
      risk: "Moderate",
      icon: "⚠️",
    };
  return { label: "Obese", color: "#F87171", risk: "High", icon: "🔴" };
}

// ─── Biological Age Estimate ──────────────────────────────────────────────────
function estimateBioAge(
  age: number,
  bmi: number,
  lifestyle: string,
  sleepHrs: number,
  stressLevel: number,
) {
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

// ─── Water Intake by Weight ───────────────────────────────────────────────────
// Standard: 35 ml per kg of body weight
function calcWaterIntake(weightKg: number) {
  const ml = Math.round(weightKg * 35);
  const litres = (ml / 1000).toFixed(2);
  const glasses = Math.ceil(ml / 250);
  return { ml, litres, glasses };
}

// ─── Input field ──────────────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step = 1,
  type = "number",
}: {
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: string;
}) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold text-slate-500 uppercase tracking-widest"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-11 px-4 pr-16 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Result card ──────────────────────────────────────────────────────────────
function ResultCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ─── BMI Gauge ─────────────────────────────────────────────────────────────────
function BMIGauge({ bmi }: { bmi: number }) {
  const clampedBmi = Math.min(40, Math.max(10, bmi));
  const pct = ((clampedBmi - 10) / 30) * 100;

  const zones = [
    { label: "Under", color: "#38BDF8", end: 25 },
    { label: "Normal", color: "#34D399", end: 50 },
    { label: "Over", color: "#FBBF24", end: 75 },
    { label: "Obese", color: "#F87171", end: 100 },
  ];

  return (
    <div className="space-y-3">
      <div className="relative h-5 rounded-full overflow-hidden flex">
        {zones.map((z) => (
          <div
            key={z.label}
            className="flex-1 first:rounded-l-full last:rounded-r-full"
            style={{ background: z.color, opacity: 0.3 }}
          />
        ))}
        <div
          className="absolute top-0 bottom-0 w-1.5 rounded-full bg-slate-800 shadow-lg transition-all duration-700"
          style={{ left: `calc(${pct}% - 3px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Card className="rounded-[28px] border-0 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
              {icon}
            </div>
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          </div>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HealthRiskPage() {
  const { userProfile } = useHealthStore();

  // BMI state
  const [weight, setWeight] = useState<number>(userProfile ? 70 : 70);
  const [height, setHeight] = useState<number>(170);
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  // Biological age state
  const [bioAge, setBioAge] = useState<number>(userProfile?.age ?? 25);
  const [lifestyle, setLifestyle] = useState<string>(
    userProfile?.lifestyle ?? "active",
  );
  const [sleepHrs, setSleepHrs] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [bioAgeResult, setBioAgeResult] = useState<number | null>(null);

  // Water state
  const [waterWeight, setWaterWeight] = useState<number>(70);
  const [waterResult, setWaterResult] = useState<ReturnType<
    typeof calcWaterIntake
  > | null>(null);

  const handleBMI = () => {
    const hm = height / 100;
    setBmiResult(Math.round((weight / (hm * hm)) * 10) / 10);
  };

  const handleBioAge = () => {
    const currentBmi =
      bmiResult ??
      (() => {
        const hm = height / 100;
        return Math.round((weight / (hm * hm)) * 10) / 10;
      })();
    setBioAgeResult(
      estimateBioAge(bioAge, currentBmi, lifestyle, sleepHrs, stressLevel),
    );
  };

  const handleWater = () => setWaterResult(calcWaterIntake(waterWeight));

  const bmiCat = bmiResult !== null ? getBMICategory(bmiResult) : null;

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <ShieldAlert size={26} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Health Risk Analysis
          </h1>
          <p className="text-slate-400 font-medium mt-0.5">
            BMI · Biological Age · Personalised Water Intake
          </p>
        </div>
      </motion.section>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4"
      >
        <Info size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          These calculators are for <strong>wellness awareness only</strong> and
          do not constitute medical advice. Consult a qualified healthcare
          professional for clinical decisions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        {/* ── BMI Calculator ── */}
        <Section
          title="BMI Calculator"
          icon={<Calculator size={20} />}
          delay={0.1}
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Field
              label="Weight"
              value={weight}
              onChange={setWeight}
              unit="kg"
              min={20}
              max={250}
            />
            <Field
              label="Height"
              value={height}
              onChange={setHeight}
              unit="cm"
              min={100}
              max={250}
            />
          </div>
          <Button
            onClick={handleBMI}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity border-0 mb-6"
          >
            Calculate BMI
          </Button>

          {bmiResult !== null && bmiCat && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div
                className="text-center p-5 rounded-2xl"
                style={{ background: `${bmiCat.color}15` }}
              >
                <p
                  className="text-4xl font-black"
                  style={{ color: bmiCat.color }}
                >
                  {bmiResult}
                </p>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  {bmiCat.icon} {bmiCat.label}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Health Risk:{" "}
                  <span className="font-bold" style={{ color: bmiCat.color }}>
                    {bmiCat.risk}
                  </span>
                </p>
              </div>
              <BMIGauge bmi={bmiResult} />
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { range: "< 18.5", label: "Underweight", color: "#38BDF8" },
                  {
                    range: "18.5 – 24.9",
                    label: "Normal weight",
                    color: "#34D399",
                  },
                  { range: "25 – 29.9", label: "Overweight", color: "#FBBF24" },
                  { range: "≥ 30", label: "Obese", color: "#F87171" },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: r.color }}
                    />
                    <div>
                      <p className="font-bold text-slate-700">{r.label}</p>
                      <p className="text-slate-400">{r.range}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Section>

        {/* ── Biological Age Estimator ── */}
        <Section
          title="Biological Age Estimator"
          icon={<Heart size={20} />}
          delay={0.2}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Field
              label="Chronological Age"
              value={bioAge}
              onChange={setBioAge}
              unit="yrs"
              min={10}
              max={100}
            />
            <Field
              label="Sleep per Night"
              value={sleepHrs}
              onChange={setSleepHrs}
              unit="hrs"
              min={3}
              max={12}
              step={0.5}
            />
          </div>

          <div className="mb-4 space-y-1.5">
            <label
              htmlFor="lifestyle-picker"
              className="text-xs font-bold text-slate-500 uppercase tracking-widest"
            >
              Lifestyle
            </label>
            <div id="lifestyle-picker" className="grid grid-cols-3 gap-2">
              {["sedentary", "active", "athletic"].map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setLifestyle(l)}
                  className={`py-2.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                    lifestyle === l
                      ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Stress slider */}
          <div className="mb-6 space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="stress-slider"
                className="text-xs font-bold text-slate-500 uppercase tracking-widest"
              >
                Stress Level
              </label>
              <span className="text-xs font-bold text-blue-500">
                {stressLevel}/5
              </span>
            </div>
            <input
              id="stress-slider"
              type="range"
              min={1}
              max={5}
              step={1}
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
          </div>

          <Button
            onClick={handleBioAge}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity border-0 mb-6"
          >
            Estimate Biological Age
          </Button>

          {bioAgeResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div
                className={`p-5 rounded-2xl text-center ${bioAgeResult < bioAge ? "bg-green-50" : bioAgeResult === bioAge ? "bg-blue-50" : "bg-amber-50"}`}
              >
                <p
                  className={`text-4xl font-black ${bioAgeResult < bioAge ? "text-green-500" : bioAgeResult === bioAge ? "text-blue-500" : "text-amber-500"}`}
                >
                  {bioAgeResult} yrs
                </p>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  Estimated Biological Age
                </p>
                {bioAgeResult < bioAge && (
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    🎉 Your body is ~{bioAge - bioAgeResult} years younger than
                    your actual age!
                  </p>
                )}
                {bioAgeResult > bioAge && (
                  <p className="text-xs text-amber-600 mt-2 font-medium">
                    ⚠️ Your lifestyle may be ageing you faster. Consider better
                    sleep & lower stress.
                  </p>
                )}
                {bioAgeResult === bioAge && (
                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    ✅ Your biological age matches your actual age.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    label: "Better sleep (7–9 hrs)",
                    impact: "−2 years",
                    ok: sleepHrs >= 7 && sleepHrs <= 9,
                  },
                  {
                    label: "Active lifestyle",
                    impact: "−2 to −4 yrs",
                    ok: lifestyle !== "sedentary",
                  },
                  {
                    label: "Healthy BMI (18.5–24.9)",
                    impact: "−1.5 years",
                    ok:
                      bmiResult !== null && bmiResult >= 18.5 && bmiResult < 25,
                  },
                  {
                    label: "Low stress (≤ 2/5)",
                    impact: "−0.8 years",
                    ok: stressLevel <= 2,
                  },
                ].map((tip) => (
                  <div
                    key={tip.label}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50"
                  >
                    {tip.ok ? (
                      <CheckCircle
                        size={14}
                        className="text-green-500 flex-shrink-0"
                      />
                    ) : (
                      <AlertTriangle
                        size={14}
                        className="text-amber-400 flex-shrink-0"
                      />
                    )}
                    <span className="text-xs text-slate-600 flex-1">
                      {tip.label}
                    </span>
                    <span className="text-xs font-bold text-blue-500">
                      {tip.impact}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Section>
      </div>

      {/* ── Weight-based Water Intake Calculator ── */}
      <Section
        title="Daily Water Intake Calculator"
        icon={<Droplets size={20} />}
        delay={0.3}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: input + formula info */}
          <div>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Water requirement is calculated using the standard formula:
              <span className="mx-1 font-bold text-blue-500">
                35 ml × body weight (kg)
              </span>
              . For example, a person weighing <strong>60 kg</strong> needs
              about <strong>2.1 L/day</strong>.
            </p>
            <Field
              label="Your Body Weight"
              value={waterWeight}
              onChange={setWaterWeight}
              unit="kg"
              min={10}
              max={300}
            />
            <Button
              onClick={handleWater}
              className="mt-5 w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity border-0"
            >
              Calculate Water Intake
            </Button>

            {/* Quick reference table */}
            <div className="mt-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Quick Reference
              </p>
              <div className="space-y-1.5">
                {[20, 30, 40, 50, 60, 70, 80, 90, 100].map((kg) => {
                  const w = calcWaterIntake(kg);
                  return (
                    <div
                      key={kg}
                      className={`flex items-center justify-between px-4 py-2 rounded-xl text-xs transition-colors ${waterWeight === kg ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}
                    >
                      <span className="font-bold text-slate-600">{kg} kg</span>
                      <span className="text-slate-500">{w.litres} L</span>
                      <span className="text-slate-400">
                        ~{w.glasses} glasses
                      </span>
                      <span className="text-slate-400">{w.ml} ml</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: result */}
          <div className="space-y-4">
            {waterResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-6 rounded-2xl text-white text-center">
                  <Droplets size={36} className="mx-auto mb-3 opacity-80" />
                  <p className="text-5xl font-black">{waterResult.litres} L</p>
                  <p className="text-sm opacity-80 mt-1">
                    Daily water intake for {waterWeight} kg
                  </p>
                </div>
                <ResultCard
                  icon={<Droplets size={18} />}
                  label="In Millilitres"
                  value={`${waterResult.ml.toLocaleString()} ml`}
                  sub="Total daily target"
                  color="#38BDF8"
                />
                <ResultCard
                  icon={<Activity size={18} />}
                  label="In Glasses (250 ml each)"
                  value={`${waterResult.glasses} glasses`}
                  sub="Spread across the day"
                  color="#34D399"
                />
                <ResultCard
                  icon={<TrendingUp size={18} />}
                  label="Per Hour (awake 16 hrs)"
                  value={`${(waterResult.ml / 16).toFixed(0)} ml`}
                  sub="Hourly hydration goal"
                  color="#818CF8"
                />

                {/* Tips */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 mb-2">
                    💡 Hydration Tips
                  </p>
                  <ul className="space-y-1.5 text-xs text-blue-600">
                    <li>• Drink a glass of water first thing in the morning</li>
                    <li>• Increase intake by 500 ml on workout days</li>
                    <li>• Hot weather adds ~500 ml to your daily need</li>
                    <li>
                      • Fruits & vegetables contribute ~20% of total intake
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-300 rounded-2xl border-2 border-dashed border-slate-200">
                <Droplets size={40} className="mb-3" />
                <p className="text-sm font-medium">
                  Enter your weight and click calculate
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
