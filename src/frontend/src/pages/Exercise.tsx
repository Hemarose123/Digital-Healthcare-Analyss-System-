import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Play,
  Star,
  Wind,
  X,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
type Tab = "exercise" | "yoga";

const exerciseVideos = [
  {
    id: "ex1",
    youtubeId: "ml6cT4AZdqI",
    title: "Full Body HIIT Workout",
    subtitle: "20 Min • No Equipment",
    category: "HIIT",
    categoryColor: "#ff5f57",
    categoryBg: "rgba(255,95,87,0.12)",
    duration: "20 min",
    level: "Intermediate",
    calories: "250 kcal",
    description:
      "High-intensity interval training targeting every major muscle group. No equipment needed — just your body weight.",
    thumb: "https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg",
  },
  {
    id: "ex2",
    youtubeId: "gC_L9qAHVJ8",
    title: "Beginner Morning Workout",
    subtitle: "15 Min • Low Impact",
    category: "Cardio",
    categoryColor: "#28c840",
    categoryBg: "rgba(40,200,64,0.10)",
    duration: "15 min",
    level: "Beginner",
    calories: "150 kcal",
    description:
      "Gentle yet effective morning routine to wake up your body and get the blood flowing.",
    thumb: "https://img.youtube.com/vi/gC_L9qAHVJ8/maxresdefault.jpg",
  },
  {
    id: "ex3",
    youtubeId: "vc1E5CfRfos",
    title: "Abs & Core Strength",
    subtitle: "20 Min • Core Focus",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "20 min",
    level: "Intermediate",
    calories: "200 kcal",
    description:
      "Sculpt a strong core with targeted ab exercises. Build stability and power from your center.",
    thumb: "https://img.youtube.com/vi/vc1E5CfRfos/maxresdefault.jpg",
  },
  {
    id: "ex4",
    youtubeId: "TkaYafQ-XC4",
    title: "Upper Body Strength",
    subtitle: "25 Min • Arms & Chest",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "25 min",
    level: "Advanced",
    calories: "280 kcal",
    description:
      "Build strong arms, chest and shoulders with this focused upper body workout.",
    thumb: "https://img.youtube.com/vi/TkaYafQ-XC4/maxresdefault.jpg",
  },
  {
    id: "ex6",
    youtubeId: "2MoGxae-zyo",
    title: "Lower Body Blast",
    subtitle: "20 Min • Legs & Glutes",
    category: "HIIT",
    categoryColor: "#ff5f57",
    categoryBg: "rgba(255,95,87,0.12)",
    duration: "20 min",
    level: "Intermediate",
    calories: "240 kcal",
    description:
      "Strengthen and tone your legs and glutes with this explosive lower body workout.",
    thumb: "https://img.youtube.com/vi/2MoGxae-zyo/maxresdefault.jpg",
  },
  {
    id: "ex8",
    youtubeId: "L7Pto9L9H0s",
    title: "30 Min Fat Burn HIIT",
    subtitle: "High Intensity • Sweaty",
    category: "Weight Loss",
    categoryColor: "#ec4899",
    categoryBg: "rgba(236,72,153,0.12)",
    duration: "30 min",
    level: "Advanced",
    calories: "420 kcal",
    description:
      "Torch calories with this intense fat-burning session. Keep the heart rate up and muscles engaged.",
    thumb: "https://img.youtube.com/vi/L7Pto9L9H0s/maxresdefault.jpg",
  },
  {
    id: "ex9",
    youtubeId: "IT94xC35u6k",
    title: "Full Body Strength Lab",
    subtitle: "20 Min • Muscle Build",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "20 min",
    level: "Intermediate",
    calories: "220 kcal",
    description:
      "Focus on compound movements to build functional strength and lean muscle mass.",
    thumb: "https://img.youtube.com/vi/IT94xC35u6k/maxresdefault.jpg",
  },
  {
    id: "ex10",
    youtubeId: "50kH47ZztHs",
    title: "15 Min Bodyweight HIIT",
    subtitle: "Fast • Efficient",
    category: "HIIT",
    categoryColor: "#ff5f57",
    categoryBg: "rgba(255,95,87,0.12)",
    duration: "15 min",
    level: "Advanced",
    calories: "180 kcal",
    description:
      "Short, high-intensity intervals to boost metabolic rate and burn fat fast.",
    thumb: "https://img.youtube.com/vi/50kH47ZztHs/maxresdefault.jpg",
  },
  {
    id: "ex11",
    youtubeId: "L_xrDAtykMI",
    title: "Active Recovery Stretch",
    subtitle: "12 Min • Mobility",
    category: "Stretching",
    categoryColor: "#38bdf8",
    categoryBg: "rgba(56,189,248,0.12)",
    duration: "12 min",
    level: "Beginner",
    calories: "60 kcal",
    description:
      "Relieve muscle tension and improve range of motion with these dynamic recovery stretches.",
    thumb: "https://img.youtube.com/vi/L_xrDAtykMI/maxresdefault.jpg",
  },
  {
    id: "ex14",
    youtubeId: "L_xrDAtykMI",
    title: "10 Min Full Body HIIT",
    subtitle: "Quick • Intense",
    category: "HIIT",
    categoryColor: "#ff5f57",
    categoryBg: "rgba(255,95,87,0.12)",
    duration: "10 min",
    level: "Advanced",
    calories: "150 kcal",
    description:
      "A fast-paced, high-intensity routine to get your heart rate up and burn fat in record time.",
    thumb: "https://img.youtube.com/vi/L_xrDAtykMI/maxresdefault.jpg",
  },
  {
    id: "ex15",
    youtubeId: "gC_L9qAHVJ8",
    title: "Quick HIIT Burner",
    subtitle: "15 Min • Explosive",
    category: "HIIT",
    categoryColor: "#ff5f57",
    categoryBg: "rgba(255,95,87,0.12)",
    duration: "15 min",
    level: "Advanced",
    calories: "190 kcal",
    description:
      "Focus on explosive power and high-intensity movements to push your aerobic capacity.",
    thumb: "https://img.youtube.com/vi/gC_L9qAHVJ8/maxresdefault.jpg",
  },
  {
    id: "ex17",
    youtubeId: "UBMk30rjy0o",
    title: "Lower Body Strength",
    subtitle: "25 Min • Glutes & Thighs",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "25 min",
    level: "Intermediate",
    calories: "240 kcal",
    description:
      "Build power and definition in your legs and glutes with this focused strength routine.",
    thumb: "https://img.youtube.com/vi/UBMk30rjy0o/maxresdefault.jpg",
  },
  {
    id: "ex19",
    youtubeId: "L7Pto9L9H0s",
    title: "Endurance Cardio Flow",
    subtitle: "30 Min • Persistent",
    category: "Cardio",
    categoryColor: "#28c840",
    categoryBg: "rgba(40,200,64,0.10)",
    duration: "30 min",
    level: "Advanced",
    calories: "350 kcal",
    description:
      "Build cardiovascular stamina with this continuous movement session designed for heart health.",
    thumb: "https://img.youtube.com/vi/L7Pto9L9H0s/maxresdefault.jpg",
  },
  {
    id: "ex22",
    youtubeId: "UBMk30rjy0o",
    title: "Leg Day Power",
    subtitle: "25 Min • Lower Body",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "25 min",
    level: "Intermediate",
    calories: "240 kcal",
    description:
      "Build strength and definition in your glutes, quads, and hamstrings.",
    thumb: "https://img.youtube.com/vi/UBMk30rjy0o/maxresdefault.jpg",
  },
  {
    id: "ex23",
    youtubeId: "TkaYafQ-XC4",
    title: "Upper Body Blast",
    subtitle: "25 Min • Arms & Chest",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "25 min",
    level: "Advanced",
    calories: "280 kcal",
    description:
      "Comprehensive upper body workout targeting arms, shoulders, and back.",
    thumb: "https://img.youtube.com/vi/TkaYafQ-XC4/maxresdefault.jpg",
  },
  {
    id: "ex24",
    youtubeId: "IT94xC35u6k",
    title: "Metabolic Conditioning",
    subtitle: "30 Min • High Pulse",
    category: "Cardio",
    categoryColor: "#28c840",
    categoryBg: "rgba(40,200,64,0.10)",
    duration: "30 min",
    level: "Advanced",
    calories: "400 kcal",
    description:
      "Push your metabolic limits with this extended session designed for ultimate conditioning.",
    thumb: "https://img.youtube.com/vi/IT94xC35u6k/maxresdefault.jpg",
  },
  {
    id: "ex25",
    youtubeId: "gC_L9qAHVJ8",
    title: "Beginner Bodyweight",
    subtitle: "15 Min • Low Intensity",
    category: "Beginner",
    categoryColor: "#86efac",
    categoryBg: "rgba(134,239,172,0.12)",
    duration: "15 min",
    level: "Beginner",
    calories: "120 kcal",
    description:
      "Perfect starting point for your fitness journey. Simple, effective movements.",
    thumb: "https://img.youtube.com/vi/gC_L9qAHVJ8/maxresdefault.jpg",
  },
  {
    id: "ex26",
    youtubeId: "vc1E5CfRfos",
    title: "Core Stability",
    subtitle: "15 Min • Posture",
    category: "Strength",
    categoryColor: "#febc2e",
    categoryBg: "rgba(254,188,46,0.12)",
    duration: "15 min",
    level: "Beginner",
    calories: "90 kcal",
    description:
      "Improve your balance and spinal health with these core-focused movements.",
    thumb: "https://img.youtube.com/vi/vc1E5CfRfos/maxresdefault.jpg",
  },
  {
    id: "ex27",
    youtubeId: "50kH47ZztHs",
    title: "Explosive Power Plyo",
    subtitle: "20 Min • Fast Paced",
    category: "HIIT",
    categoryColor: "#ff5f57",
    categoryBg: "rgba(255,95,87,0.12)",
    duration: "20 min",
    level: "Advanced",
    calories: "280 kcal",
    description:
      "High-intensity plyometric intervals designed to boost power, agility, and speed.",
    thumb: "https://img.youtube.com/vi/50kH47ZztHs/maxresdefault.jpg",
  },
];

const yogaVideos = [
  {
    id: "yg2",
    youtubeId: "v7AYKMP6rOE",
    title: "Yoga for Beginners",
    subtitle: "20 Min • Foundation",
    category: "Beginner",
    categoryColor: "#86efac",
    categoryBg: "rgba(134,239,172,0.12)",
    duration: "20 min",
    level: "Beginner",
    calories: "90 kcal",
    description:
      "A gentle introduction to yoga fundamentals. Learn proper alignment and breathing techniques.",
    thumb: "https://img.youtube.com/vi/v7AYKMP6rOE/maxresdefault.jpg",
  },
  {
    id: "yg4",
    youtubeId: "wdln9qWYloU",
    title: "Balance & Tree Pose",
    subtitle: "15 Min • Balance",
    category: "Balance",
    categoryColor: "#e9c4ff",
    categoryBg: "rgba(233,196,255,0.18)",
    duration: "15 min",
    level: "All Levels",
    calories: "70 kcal",
    description:
      "Improve balance and establish a centered presence while strengthening ankles and focus.",
    thumb: "https://img.youtube.com/vi/wdln9qWYloU/maxresdefault.jpg",
  },
  {
    id: "yg6",
    youtubeId: "COp7BR_Dvps",
    title: "Evening Wind Down",
    subtitle: "25 Min • Relaxation",
    category: "Restorative",
    categoryColor: "#818cf8",
    categoryBg: "rgba(129,140,248,0.12)",
    duration: "25 min",
    level: "All Levels",
    calories: "60 kcal",
    description:
      "Release the tension of the day with deep stretches and calming poses for better sleep.",
    thumb: "https://img.youtube.com/vi/COp7BR_Dvps/maxresdefault.jpg",
  },
  {
    id: "yg8",
    youtubeId: "b1H3xO3x_Js",
    title: "Weight Loss Power Flow",
    subtitle: "35 Min • Core & Tone",
    category: "Weight Loss",
    categoryColor: "#ec4899",
    categoryBg: "rgba(236,72,153,0.12)",
    duration: "35 min",
    level: "Intermediate",
    calories: "210 kcal",
    description:
      "A dynamic Vinyasa flow focusing on core strength, muscle toning, and fat burning without high impact.",
    thumb: "https://img.youtube.com/vi/b1H3xO3x_Js/maxresdefault.jpg",
  },
  {
    id: "yg11",
    youtubeId: "2eA2Koq6pTI",
    title: "15 Min Bedtime Yoga",
    subtitle: "Stretch • Sleep",
    category: "Restorative",
    categoryColor: "#818cf8",
    categoryBg: "rgba(129,140,248,0.12)",
    duration: "15 min",
    level: "Beginner",
    calories: "40 kcal",
    description:
      "Prepare your body for restful sleep with gentle stretches and deep breathing exercises.",
    thumb: "https://img.youtube.com/vi/2eA2Koq6pTI/maxresdefault.jpg",
  },
  {
    id: "yg14",
    youtubeId: "sTANio_2E0Q",
    title: "Yoga for Energy",
    subtitle: "15 Min • Morning Burst",
    category: "Flow",
    categoryColor: "#f97316",
    categoryBg: "rgba(249,115,22,0.12)",
    duration: "15 min",
    level: "All Levels",
    calories: "95 kcal",
    description:
      "A vibrant flow to wake up your system and fill you with positive energy for the day ahead.",
    thumb: "https://img.youtube.com/vi/sTANio_2E0Q/maxresdefault.jpg",
  },
  {
    id: "yg19",
    youtubeId: "sTANio_2E0Q",
    title: "Sunrise Salutations",
    subtitle: "15 Min • Morning Flow",
    category: "Flow",
    categoryColor: "#f97316",
    categoryBg: "rgba(249,115,22,0.12)",
    duration: "15 min",
    level: "All Levels",
    calories: "90 kcal",
    description:
      "Awaken your system and fill yourself with positive energy for the day ahead.",
    thumb: "https://img.youtube.com/vi/sTANio_2E0Q/maxresdefault.jpg",
  },
  {
    id: "yg20",
    youtubeId: "b1H3xO3x_Js",
    title: "Detox Flow",
    subtitle: "35 Min • Core & Tone",
    category: "Weight Loss",
    categoryColor: "#ec4899",
    categoryBg: "rgba(236,72,153,0.12)",
    duration: "35 min",
    level: "Intermediate",
    calories: "210 kcal",
    description:
      "A dynamic flow focusing on twists and core work to energize the system.",
    thumb: "https://img.youtube.com/vi/b1H3xO3x_Js/maxresdefault.jpg",
  },
  {
    id: "yg22",
    youtubeId: "COp7BR_Dvps",
    title: "Evening Stress Relief",
    subtitle: "20 Min • Calming",
    category: "Restorative",
    categoryColor: "#818cf8",
    categoryBg: "rgba(129,140,248,0.12)",
    duration: "20 min",
    level: "All Levels",
    calories: "50 kcal",
    description:
      "Soothing flow designed to lower cortisol levels and prepare you for rest.",
    thumb: "https://img.youtube.com/vi/COp7BR_Dvps/maxresdefault.jpg",
  },
  {
    id: "yg29",
    youtubeId: "z6fO29i6_6E",
    title: "Full Body Deep Stretch",
    subtitle: "20 Min • Flexibility",
    category: "Flow",
    categoryColor: "#f97316",
    categoryBg: "rgba(249,115,22,0.12)",
    duration: "20 min",
    level: "All Levels",
    calories: "110 kcal",
    description:
      "Comprehensive yoga stretch to improve range of motion and relieve tightness.",
    thumb: "https://img.youtube.com/vi/z6fO29i6_6E/maxresdefault.jpg",
  },
  {
    id: "yg30",
    youtubeId: "v7AYKMP6rOE",
    title: "Total Body Yoga",
    subtitle: "30 Min • Foundation",
    category: "Beginner",
    categoryColor: "#86efac",
    categoryBg: "rgba(134,239,172,0.12)",
    duration: "30 min",
    level: "Beginner",
    calories: "130 kcal",
    description: "Complete full body foundation for new practitioners.",
    thumb: "https://img.youtube.com/vi/v7AYKMP6rOE/maxresdefault.jpg",
  },
];

const heroExercise = {
  youtubeId: "ml6cT4AZdqI",
  thumb: "https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg",
};
const heroYoga = {
  youtubeId: "v7AYKMP6rOE",
  thumb: "https://img.youtube.com/vi/v7AYKMP6rOE/maxresdefault.jpg",
};

const stats = [
  { label: "Workouts Done", value: "24", unit: "sessions", color: "#006094" },
  { label: "Calories Burned", value: "5,820", unit: "kcal", color: "#f97316" },
  { label: "Active Minutes", value: "380", unit: "min", color: "#a855f7" },
  { label: "Streak", value: "7", unit: "days 🔥", color: "#28c840" },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Fitness() {
  const [activeTab, setActiveTab] = useState<Tab>("exercise");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = activeTab === "exercise" ? exerciseVideos : yogaVideos;
  const hero = activeTab === "exercise" ? heroExercise : heroYoga;

  return (
    <div
      className="min-h-full pb-16"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Tab Toggle ── */}
      <div className="flex items-center gap-3 mb-8">
        {(["exercise", "yoga"] as Tab[]).map((tab) => (
          <motion.button
            key={tab}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab(tab)}
            className="relative flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300"
            style={{
              background:
                activeTab === tab
                  ? tab === "exercise"
                    ? "linear-gradient(135deg,#006094,#67bafd)"
                    : "linear-gradient(135deg,#a855f7,#ec4899)"
                  : "rgba(148,163,184,0.08)",
              color: activeTab === tab ? "#fff" : "#94a3b8",
              boxShadow:
                activeTab === tab ? "0 8px 24px rgba(0,96,148,0.25)" : "none",
            }}
          >
            {tab === "exercise" ? <Dumbbell size={16} /> : <Wind size={16} />}
            {tab === "exercise" ? "Exercise" : "Yoga"}
            {activeTab === tab && (
              <motion.div
                layoutId="tabPill"
                className="absolute inset-0 rounded-2xl"
                style={{ zIndex: -1 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ── Hero Banner ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <button
            type="button"
            className="relative w-full overflow-hidden rounded-3xl shadow-2xl group cursor-pointer"
            style={{ aspectRatio: "21/8", minHeight: 260 }}
            onClick={() => setActiveVideo(hero.youtubeId)}
          >
            <img
              src={hero.thumb}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://img.youtube.com/vi/${hero.youtubeId}/hqdefault.jpg`;
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,15,30,0.88) 0%, rgba(10,15,30,0.45) 55%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-14">
              <div className="flex gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                {activeTab === "exercise" ? (
                  <>
                    Full Body <br />
                    HIIT Training
                  </>
                ) : (
                  <>
                    Beginner Yoga <br />
                    Foundation
                  </>
                )}
              </h1>
              <p className="text-white/75 text-base max-w-md mb-8">
                {activeTab === "exercise"
                  ? "30 minutes of high-intensity intervals to maximize fat burn and build strength."
                  : "Start your journey with a gentle 20-minute flow focused on alignment and breath."}
              </p>
              <div className="flex items-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center justify-center w-20 h-20 rounded-full border border-white/30 text-white shadow-xl"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <Play size={32} fill="white" />
                </motion.div>
                <div>
                  <span className="block text-white font-black text-lg">
                    {activeTab === "exercise"
                      ? "Play Full Workout"
                      : "Begin Flow"}
                  </span>
                  <span className="text-white/55 text-sm tracking-widest uppercase font-bold">
                    {activeTab === "exercise"
                      ? "30:00 • Advanced"
                      : "12:00 • All Levels"}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </motion.section>
      </AnimatePresence>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5 border border-white/50 dark:border-slate-700/50"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {s.label}
            </p>
            <p className="text-2xl font-black" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              {s.unit}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Video Grid ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`${activeTab}-grid`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {activeTab === "exercise" ? "Exercise Library" : "Yoga Library"}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === "exercise"
                  ? "Curated workouts streamed from YouTube — click to play"
                  : "Mindful yoga sequences streamed from YouTube — click to play"}
              </p>
            </div>
            <span className="flex items-center gap-1 text-sky-600 font-bold text-sm">
              {videos.length} videos <ChevronRight size={16} />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.14)",
                }}
                className="rounded-2xl overflow-hidden border border-white/60 dark:border-slate-700/50 shadow-md group transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* Thumbnail */}
                <button
                  type="button"
                  className="relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "16/9" }}
                  onClick={() => setActiveVideo(v.youtubeId)}
                >
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Category badge */}
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
                    style={{
                      background: v.categoryBg,
                      color: v.categoryColor,
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${v.categoryColor}33`,
                    }}
                  >
                    {v.category}
                  </span>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "rgba(220,38,38,0.9)",
                        boxShadow: "0 8px 32px rgba(220,38,38,0.5)",
                      }}
                    >
                      <Play size={22} fill="white" className="ml-1" />
                    </motion.div>
                  </div>

                  {/* YouTube watermark */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="#ff0000"
                      role="img"
                      aria-label="YouTube logo"
                    >
                      <title>YouTube logo</title>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-white text-[9px] font-bold tracking-wide">
                      YouTube
                    </span>
                  </div>
                </button>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {v.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <Clock size={12} /> {v.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <Flame size={12} className="text-orange-400" />{" "}
                        {v.calories}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <Star size={12} className="text-amber-400" /> {v.level}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setActiveVideo(v.youtubeId)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-black shadow-lg transition-all"
                      style={{
                        background:
                          activeTab === "exercise"
                            ? "linear-gradient(135deg,#006094,#67bafd)"
                            : "linear-gradient(135deg,#a855f7,#ec4899)",
                        boxShadow:
                          activeTab === "exercise"
                            ? "0 4px 14px rgba(0,96,148,0.35)"
                            : "0 4px 14px rgba(168,85,247,0.35)",
                      }}
                    >
                      <Play size={12} fill="white" /> Play
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── YouTube Video Modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/92 backdrop-blur-2xl"
              onClick={() => setActiveVideo(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveVideo(null);
              }}
              tabIndex={0}
              role="button"
              aria-label="Close video overlay"
            />
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
              style={{ aspectRatio: "16/9" }}
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Workout Video"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
