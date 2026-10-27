import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Apple,
  Brain,
  ChevronRight,
  Droplets,
  Filter,
  Heart,
  Lightbulb,
  Moon,
  Search,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Target,
  Zap,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

type Category =
  | "All"
  | "Nutrition"
  | "Fitness"
  | "Mental Health"
  | "Sleep"
  | "Hormonal";

interface Tip {
  id: number;
  category: Category;
  title: string;
  desc: string;
  proTip: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const TIPS: Tip[] = [
  {
    id: 1,
    category: "Nutrition",
    title: "Hydration Strategy",
    desc: "Drink at least 8 glasses of water a day to maintain optimal metabolic function and skin health.",
    proTip:
      "Drink a glass of water immediately after waking up to jumpstart your metabolism.",
    icon: <Droplets size={24} className="text-blue-500" />,
    color: "blue",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 2,
    category: "Sleep",
    title: "The 10-3-2-1-0 Rule",
    desc: "No caffeine 10 hours before bed, no food 3 hours before, no work 2 hours before, and no screens 1 hour before.",
    proTip:
      "Try to keep your bedroom temperature around 18°C (65°F) for the deepest sleep.",
    icon: <Moon size={24} className="text-indigo-500" />,
    color: "indigo",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: 3,
    category: "Fitness",
    title: "Resistance Training",
    desc: "Incorporate at least 2 days of strength training per week to maintain bone density and muscle mass.",
    proTip:
      "Focus on compound movements like squats and push-ups for maximum efficiency.",
    icon: <Zap size={24} className="text-amber-500" />,
    color: "amber",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: 4,
    category: "Mental Health",
    title: "Digital Detox",
    desc: "Reduce screen time 1 hour before bed to lower cortisol levels and improve melatonin production.",
    proTip:
      'Set "No Phone Zones" in your house, like the dining table or the bedroom.',
    icon: <Smartphone size={24} className="text-slate-500" />,
    color: "slate",
    bg: "bg-slate-500/10 border-slate-500/20",
  },
  {
    id: 5,
    category: "Hormonal",
    title: "Seed Cycling",
    desc: "Consider rotating pumpkin, flax, sesame, and sunflower seeds to support natural hormone balance.",
    proTip:
      "Flax and pumpkin seeds in the first half of your cycle; sesame and sunflower in the second.",
    icon: <Target size={24} className="text-rose-500" />,
    color: "rose",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    id: 6,
    category: "Nutrition",
    title: "Fiber for Balance",
    desc: "Aim for 25-30g of fiber daily to help stabilize blood sugar and improve digestion.",
    proTip:
      "Add chia seeds or ground flaxseeds to your morning smoothie for an easy fiber boost.",
    icon: <Apple size={24} className="text-emerald-500" />,
    color: "emerald",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: 7,
    category: "Mental Health",
    title: "The 4-7-8 Breathing",
    desc: "Inhale for 4s, hold for 7s, exhale for 8s. This technique calms the nervous system instantly.",
    proTip:
      "Use this whenever you feel a spike in stress or just before an important meeting.",
    icon: <Brain size={24} className="text-purple-500" />,
    color: "purple",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: 8,
    category: "Fitness",
    title: "NEAT Activity",
    desc: "Non-Exercise Activity Thermogenesis (NEAT) accounts for more calorie burn than intentional gym time.",
    proTip:
      "Take the stairs instead of the elevator to increase your daily NEAT burn.",
    icon: <Activity size={24} className="text-sky-500" />,
    color: "sky",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    id: 9,
    category: "Hormonal",
    title: "PCOS Friendly Diet",
    desc: "Focus on Low Glycemic Index (GI) foods to manage insulin resistance effectively.",
    proTip:
      "Pair carbohydrates with protein and healthy fats to slow down glucose absorption.",
    icon: <ShieldCheck size={24} className="text-orange-500" />,
    color: "orange",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: 10,
    category: "Nutrition",
    title: "Protein First",
    desc: "Eat your protein and vegetables before carbohydrates to minimize blood sugar spikes.",
    proTip:
      "Starting your meal with a green salad can reduce the glucose impact of your main dish.",
    icon: <Stethoscope size={24} className="text-cyan-500" />,
    color: "cyan",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: 11,
    category: "Sleep",
    title: "Morning Sunlight",
    desc: "Get 10-15 minutes of direct sunlight in your eyes within an hour of waking up.",
    proTip:
      "This sets your circadian clock and helps you produce more melatonin at night.",
    icon: <Zap size={24} className="text-yellow-500" />,
    color: "yellow",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: 12,
    category: "Fitness",
    title: "Post-Meal Walk",
    desc: "A simple 10-minute walk after meals can significantly lower postprandial glucose levels.",
    proTip:
      "Light movement after dinner is particularly effective for metabolic health.",
    icon: <Activity size={24} className="text-teal-500" />,
    color: "teal",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    id: 13,
    category: "Nutrition",
    title: "Ginger for Digestion",
    desc: "Ginger contains gingerol, which has powerful anti-inflammatory and antioxidant effects and helps aid digestion.",
    proTip:
      "Sip on warm ginger water or tea 20 minutes after a meal to reduce bloating.",
    icon: <Apple size={24} className="text-orange-500" />,
    color: "orange",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: 14,
    category: "Nutrition",
    title: "Turmeric (Golden Milk)",
    desc: "Turmeric is a potent anti-inflammatory. Curcumin, its active ingredient, is better absorbed with black pepper.",
    proTip:
      "Drink warm turmeric milk with a pinch of black pepper before bed for joint health and immunity.",
    icon: <Heart size={24} className="text-yellow-500" />,
    color: "yellow",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Nutrition",
  "Fitness",
  "Mental Health",
  "Sleep",
  "Hormonal",
];

export default function HealthTips() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = TIPS.filter((tip) => {
    const matchesCategory =
      activeCategory === "All" || tip.category === activeCategory;
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="min-h-full pb-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Lightbulb className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              Health Library
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-bold max-w-lg leading-relaxed">
            Science-backed daily tips to optimize your nutrition, fitness, and
            hormonal well-being.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search for tips, symptoms, habits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
          />
        </div>
      </section>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20"
                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTips.map((tip) => (
            <motion.div
              layout
              key={tip.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`group flex flex-col p-6 rounded-[32px] border ${tip.bg} backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden h-full`}
            >
              {/* Decorative Background Glow */}
              <div
                className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-${tip.color}-400/10 blur-3xl group-hover:scale-150 transition-transform duration-700`}
              />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-black/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {tip.icon}
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-${tip.color}-500/10 text-${tip.color}-600 border border-${tip.color}-500/20`}
                >
                  {tip.category}
                </span>
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium mb-6">
                  {tip.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200/40 dark:border-slate-700/40 relative z-10 mt-auto">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 w-5 h-5 rounded-full bg-${tip.color}-500/20 flex items-center justify-center shrink-0`}
                  >
                    <ChevronRight
                      size={12}
                      className={`text-${tip.color}-600`}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Pro Tip
                    </span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 italic leading-snug">
                      "{tip.proTip}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredTips.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Search className="text-slate-300 dark:text-slate-600" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            No tips found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mt-2">
            Try adjusting your search or category filters to find what you're
            looking for.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-6 text-blue-600 font-bold text-sm hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
