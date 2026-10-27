import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Chrome,
  Github,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useHealthStore } from "../store/useHealthStore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useHealthStore((state) => state.setAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Mock registration for now as requested "immediately"
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isAuth", "true");
      setAuthenticated(true);
      toast.success("Account Created Successfully!");
      navigate({ to: "/onboarding" });
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-health-200/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_120px_-20px_rgba(0,119,182,0.15)] overflow-hidden border border-white/50 dark:border-slate-800/50"
      >
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-primary-800 to-primary-950 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-12">
              <div className="bg-white p-2 w-16 h-16 rounded-2xl flex items-center justify-center">
                <Activity className="text-primary-700 w-10 h-10" />
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter uppercase">
                  Health<span className="text-primary-300">AI</span>
                </span>
              </div>
            </div>
            <h2 className="text-6xl font-black leading-[1.1] mb-8">
              Join the <br />
              <span className="text-primary-300">Sanctuary.</span>
            </h2>
            <p className="text-primary-100/80 text-xl font-medium leading-relaxed">
              Start your journey towards AI-powered precision health monitoring
              today.
            </p>
          </div>
        </div>

        <div className="p-10 md:p-20 flex flex-col justify-center">
          <div className="mb-12">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
              Create ID Record
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Join the next generation of clinical healthcare.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500"
              >
                Full Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  id="fullName"
                  type="text"
                  className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 rounded-[1.5rem] outline-none transition-all"
                  placeholder="Dr. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500"
              >
                Personnel Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 rounded-[1.5rem] outline-none transition-all"
                  placeholder="name@healthai.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500"
              >
                Security Phrase
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  id="password"
                  type="password"
                  className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 rounded-[1.5rem] outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-700 hover:bg-primary-800 text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center space-x-3 shadow-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Already have an ID?{" "}
            <Link
              to="/login"
              className="text-primary-600 font-black hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
