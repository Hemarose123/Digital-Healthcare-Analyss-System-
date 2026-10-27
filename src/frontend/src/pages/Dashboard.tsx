import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Droplet,
  Droplets,
  Footprints,
  GlassWater,
  Heart,
  Image as ImageIcon,
  Moon,
  ScanFace,
  Settings,
  Trophy,
  Upload,
} from "lucide-react";
import * as Motion from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import medicationImg from "../assets/medication.png";
import skinAnalysisImg from "../assets/skin_analysis.png";
import { useHealthStore } from "../store/useHealthStore";

const CHART_DATA = [
  { name: "M", value: 400 },
  { name: "T", value: 1027 },
  { name: "W", value: 523 },
  { name: "T", value: 8432 },
  { name: "F", value: 635 },
  { name: "S", value: 1588 },
  { name: "S", value: 1000 },
];

export default function DashboardPage() {
  const { userProfile } = useHealthStore();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const firstName = userProfile?.name?.split(" ")[0] ?? "Alex";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Row 1: Greeting */}
      <section className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-4 ring-blue-50/50">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Hello, {firstName}{" "}
            <span className="animate-bounce-slow text-2xl">👋</span>
          </h1>
          <p className="text-slate-400 font-medium mt-0.5">
            Let's check your health status today.
          </p>
        </div>
      </section>

      {/* Row 2: Mood + Skin Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mood Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">
            How are you feeling?
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: "Sad",
                emoji: "😔",
                color: "bg-slate-50 text-slate-400",
              },
              { label: "Ok", emoji: "😐", color: "bg-slate-50 text-slate-400" },
              {
                label: "Happy",
                emoji: "😊",
                color: "bg-slate-50 text-slate-400",
              },
              {
                label: "Energetic",
                emoji: "⚡",
                color: "bg-slate-50 text-slate-400",
              },
            ].map((mood) => (
              <button
                type="button"
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-2 group p-2 rounded-2xl transition-colors ${selectedMood === mood.label ? "bg-blue-50" : ""}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform ${selectedMood === mood.label ? "scale-110 bg-white shadow-sm" : "bg-slate-50 group-hover:bg-blue-100 group-hover:scale-110"}`}
                >
                  {mood.emoji}
                </div>
                <span
                  className={`text-xs font-bold ${selectedMood === mood.label ? "text-blue-600" : "text-slate-500"}`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Skin Analysis Featured Card */}
        <div className="lg:col-span-7 bg-gradient-to-r from-blue-400 to-blue-600 p-8 rounded-[32px] shadow-lg relative overflow-hidden text-white flex group">
          <div className="flex-1 relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                AI Skin Analysis
              </h3>
              <p className="text-sm opacity-90 mt-1 mb-6">
                Analyze skin conditions with precision.
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: "/skin" })}
              className="w-fit bg-white text-blue-600 hover:bg-white/90 px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 h-11 shadow-sm transition-all"
            >
              <ImageIcon size={18} /> Upload Image
            </Button>
          </div>
          <div className="w-[45%] relative flex items-end justify-center">
            <img
              src={skinAnalysisImg}
              alt="Skin Analysis"
              className="w-[90%] h-auto transform group-hover:scale-105 transition-transform duration-700 relative z-10"
            />
            <div className="absolute right-[-10px] bottom-[-10px] opacity-20 z-0">
              <ScanFace size={120} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Stats + Quick Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stats Grid */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            label="Heart Rate"
            value="72"
            unit="bpm"
            sub="~2h ago"
            icon={<Activity size={20} className="text-red-500" />}
            color="red"
          />
          <StatCard
            label="Steps"
            value="8,432"
            unit=""
            sub="70% of 12k goal"
            icon={<Activity size={20} className="text-blue-500" />}
            color="blue"
            progress={70}
          />
          <StatCard
            label="Water"
            value="1.2"
            unit="/2.5 L"
            sub="48%"
            icon={<Droplets size={20} className="text-cyan-500" />}
            color="cyan"
            progress={48}
          />
          <StatCard
            label="Sleep Quality"
            value="84"
            unit="%"
            sub="7h 14m • Good"
            icon={<Heart size={20} className="text-green-500" />}
            color="green"
          />
        </div>

        {/* Quick Alerts */}
        <div className="lg:col-span-3">
          <Card className="rounded-[32px] border-0 shadow-sm bg-white h-full">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-slate-800 text-lg px-1">
                Quick Alerts
              </h3>
              <div className="space-y-4">
                <AlertItem
                  icon={<Droplets size={18} className="text-blue-500" />}
                  title="Hydration Reminder"
                  desc="Drink water now!"
                  color="bg-blue-50"
                />
                <AlertItem
                  icon={<Settings size={18} className="text-yellow-500" />}
                  title="Vitamin Intake"
                  desc="Take your Vitamin D"
                  color="bg-yellow-50"
                />
                <AlertItem
                  icon={<Activity size={18} className="text-blue-500" />}
                  title="Activity Goal"
                  desc="3,568 steps left today."
                  color="bg-blue-50"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 4: Chart + Medication */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Chart */}
        <Card className="lg:col-span-9 rounded-[32px] border-0 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-800">
                Lifestyle Activity
              </h2>
              <select className="bg-slate-50 border-0 text-sm font-medium text-slate-500 rounded-lg px-4 py-2 outline-none">
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    cursor={{ stroke: "#3B82F6", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Medication Tracker */}
        <Link to="/medicine-reminder" className="lg:col-span-3 block">
          <Card className="h-full rounded-[32px] border-0 shadow-sm bg-white overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8 h-full flex flex-col items-center text-center">
              <h3 className="font-bold text-slate-800 mb-4 text-lg w-full text-left flex justify-between items-center">
                Medication Tracker
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </h3>
              <div className="flex-1 flex items-center justify-center my-4">
                <img
                  src={medicationImg}
                  alt="Medication"
                  className="w-32 h-32 object-contain mb-4 transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="text-left w-full">
                <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  My Medications
                </p>
                <p className="text-sm text-slate-500">Daily dosage tracking.</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

const COLOR_MAP: Record<string, { bg50: string; bg500: string }> = {
  red: { bg50: "bg-red-50", bg500: "bg-red-500" },
  blue: { bg50: "bg-blue-50", bg500: "bg-blue-500" },
  cyan: { bg50: "bg-cyan-50", bg500: "bg-cyan-500" },
  green: { bg50: "bg-green-50", bg500: "bg-green-500" },
};

function StatCard({ label, value, unit, sub, icon, color, progress }: any) {
  const colors = COLOR_MAP[color] || {
    bg50: "bg-slate-50",
    bg500: "bg-slate-500",
  };

  return (
    <Card className="rounded-[32px] border-0 shadow-sm bg-white hover:shadow-md transition-shadow group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {label}
            </span>
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center ${colors.bg50} group-hover:scale-110 transition-transform`}
            >
              {icon}
            </div>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-slate-800 tracking-tight">
              {value}
            </span>
            <span className="text-sm font-bold text-slate-400 ml-1 uppercase">
              {unit}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {sub}
            </span>
            {progress !== undefined && (
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bg500} transition-all duration-1000`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ icon, title, desc, color }: any) {
  return (
    <div className="flex items-start gap-4 p-1 rounded-2xl hover:bg-slate-50 transition-colors group">
      <div
        className={`w-10 h-10 rounded-xl ${color || "bg-white shadow-sm"} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-800 leading-none mb-1">
          {title}
        </h4>
        <p className="text-xs font-medium text-slate-400 truncate">{desc}</p>
      </div>
    </div>
  );
}
