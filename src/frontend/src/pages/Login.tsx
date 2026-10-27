import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Chrome,
  Github,
  Heart,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "../lib/api";
import { useHealthStore } from "../store/useHealthStore";
import type { UserProfile } from "../types/health";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useHealthStore((state) => state.setAuthenticated);
  const setUserProfile = useHealthStore((state) => state.setUserProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    apiRequest("/api/auth/login/", "POST", { email, password })
      .then((data) => {
        setIsLoading(false);
        localStorage.setItem("token", data.tokens.access);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAuth", "true");

        // Sync with global store
        setAuthenticated(true, data.user.id?.toString());
        if (data.user) {
          setUserProfile(data.user);
        }

        toast.success("Welcome back to HealthAI!");
        navigate({ to: "/" });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message || "Login failed");
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const toastId = toast.loading("Establishing secure neural link...");

    setTimeout(() => {
      // Mock user aligned with UserProfile type
      const mockUser: UserProfile = {
        id: "99",
        name: "Dr. Neural Path",
        age: 35,
        gender: "male",
        lifestyle: "active",
        goals: ["fitness", "mental_wellness"],
        initialMood: 5,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo",
      );
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuth", "true");

      setIsLoading(false);
      toast.dismiss(toastId);

      // Update store state
      setAuthenticated(true, mockUser.id);
      setUserProfile(mockUser);

      toast.success("Access Granted via Google Secure Node");
      navigate({ to: "/" });
    }, 2000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-health-200/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_120px_-20px_rgba(0,119,182,0.15)] overflow-hidden border border-white/50 dark:border-slate-800/50"
      >
        {/* Left Side - Cinematic Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-blue-600 to-blue-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* Enhanced Blue Glow Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4 mb-12"
            >
              <div className="bg-white p-2 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center">
                <Activity className="text-primary-700 w-10 h-10" />
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter uppercase leading-none">
                  Health<span className="text-primary-300">AI</span>
                </span>
                <p className="text-[10px] font-black tracking-[0.2em] text-primary-300 uppercase opacity-70">
                  Neural Health OS
                </p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl font-black leading-[1.1] mb-8"
            >
              The Clinical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-white">
                Sanctuary.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-primary-100/80 text-xl max-w-md font-medium leading-relaxed mb-12"
            >
              Welcome to the future of precision medicine. Securely manage your
              neural health records with AI-driven clinical insights.
            </motion.p>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <Activity className="text-primary-300 mb-3" size={20} />
                <p className="text-xs font-black uppercase tracking-widest text-primary-300 opacity-60 mb-1">
                  Network Load
                </p>
                <p className="text-2xl font-bold">Minimal</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <ShieldCheck className="text-health-300 mb-3" size={20} />
                <p className="text-xs font-black uppercase tracking-widest text-primary-300 opacity-60 mb-1">
                  Encryption
                </p>
                <p className="text-2xl font-bold">AES-512</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side - Login Interface */}
        <div className="p-10 md:p-20 flex flex-col justify-center bg-white/40 dark:bg-transparent">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <Sparkles size={12} />
              <span>Next-Gen Authentication</span>
            </motion.div>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
              Initialize Access
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Verify your clinical credentials to enter the sanctuary.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1"
              >
                Personnel Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-slate-800 dark:text-white font-semibold placeholder:text-slate-300"
                  placeholder="name@healthai.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1 pr-1">
                <label
                  htmlFor="password"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400"
                >
                  Security Phrase
                </label>
                <button
                  type="button"
                  onClick={() => toast.error("Password recovery offline.")}
                  className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700"
                >
                  Lost Key?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors"
                  size={18}
                />
                <input
                  id="password"
                  type="password"
                  className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-slate-800 dark:text-white font-semibold placeholder:text-slate-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-700 hover:bg-primary-800 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-[0_20px_40px_-10px_rgba(0,119,182,0.3)] flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] text-sm">
                    Enter Sanctuary
                  </span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-12">
            <div className="relative flex items-center justify-center mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800" />
              </div>
              <span className="relative px-6 bg-[#F0F9FF] dark:bg-slate-950 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Neural Connect
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-3 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm"
              >
                <Chrome size={18} className="text-red-500" />
                <span>Google Node</span>
              </button>
              <button
                type="button"
                onClick={() => toast.error("Personnel node currently offline.")}
                className="flex items-center justify-center space-x-3 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm"
              >
                <Github size={18} />
                <span>GitHub Node</span>
              </button>
            </div>

            <p className="mt-12 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              New Personnel?{" "}
              <Link
                to="/register"
                className="text-primary-600 font-black hover:underline underline-offset-8"
              >
                Create ID Record
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
