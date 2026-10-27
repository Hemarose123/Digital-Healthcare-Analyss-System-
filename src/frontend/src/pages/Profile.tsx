import {
  Activity,
  BadgeCheck,
  Camera,
  CheckCircle,
  Clock,
  Download,
  Droplets,
  Edit3,
  Fingerprint,
  Heart,
  History as HistoryIcon,
  Lock,
  Mail,
  Phone,
  Ruler,
  Save,
  Scale,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useHealthStore } from "../store/useHealthStore";

export default function Profile() {
  const { userProfile, setUserProfile } = useHealthStore();
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Local state for editing
  const [localProfile, setLocalProfile] = useState({
    name: userProfile?.name || "Alex Reynolds",
    email: "alex@health-ai.io",
    phone: userProfile?.phone || "+1 555-0192",
    age: userProfile?.age || 26,
    weight: userProfile?.weight || 72,
    height: userProfile?.height || 178,
    bloodGroup: "AB+",
    bmi: 22.7,
  });

  const [phoneInput, setPhoneInput] = useState(localProfile.phone);
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(!!userProfile?.phone);
  const [activeTab, setActiveTab] = useState<"info" | "health" | "security">(
    "info",
  );

  const handleSendOtp = async () => {
    if (!phoneInput || phoneInput.length < 10) {
      toast.error("Enter valid phone with country code");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      toast.success(`OTP sent to ${phoneInput}`);
      setOtpLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otpInput) {
      toast.error("Enter the 6-digit code");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setPhoneVerified(true);
      setOtpSent(false);
      setOtpInput("");
      setLocalProfile((prev) => ({ ...prev, phone: phoneInput }));
      if (userProfile) {
        setUserProfile({ ...userProfile, phone: phoneInput });
      }
      toast.success("Phone verified!", { icon: "🛡️" });
      setOtpLoading(false);
    }, 1500);
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          name: localProfile.name,
          age: Number(localProfile.age),
          weight: Number(localProfile.weight),
          height: Number(localProfile.height),
        });
      }
      setEditing(false);
      setIsLoading(false);
      toast.success("Profile updated!", { icon: "✅" });
    }, 1000);
  };

  const initials = localProfile.name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const healthStats = [
    {
      label: "Weight",
      key: "weight",
      value: localProfile.weight,
      unit: "kg",
      icon: Scale,
      color: "text-sky-500 dark:text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      label: "Height",
      key: "height",
      value: localProfile.height,
      unit: "cm",
      icon: Ruler,
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Blood Group",
      key: "bloodGroup",
      value: localProfile.bloodGroup,
      unit: "",
      icon: Droplets,
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Age",
      key: "age",
      value: localProfile.age,
      unit: "yrs",
      icon: Zap,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  const _quickActions = [
    { label: "Download Health Report", icon: Download, color: "text-sky-500" },
    { label: "Device Sync", icon: Smartphone, color: "text-purple-500" },
    { label: "Health Timeline", icon: HistoryIcon, color: "text-emerald-500" },
    { label: "Account Settings", icon: Settings, color: "text-slate-500" },
  ];

  const tabs = [
    { id: "info", label: "Personal Info", icon: User },
    { id: "health", label: "Health Stats", icon: Activity },
    { id: "security", label: "Security", icon: Lock },
  ] as const;

  return (
    <div
      className="max-w-6xl mx-auto space-y-8 pb-16 px-4 md:px-8 py-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Account Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal data and security preferences
          </p>
        </div>
      </div>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] shadow-subtle border border-border/50 backdrop-blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(3, 105, 161, 0.9) 0%, rgba(14, 165, 233, 0.8) 50%, rgba(56, 189, 248, 0.9) 100%)",
          minHeight: 220,
        }}
      >
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full opacity-20 bg-white/30 blur-2xl" />
        <div className="absolute bottom-[-60px] left-[-20px] w-80 h-80 rounded-full opacity-10 bg-white/40 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-2xl overflow-hidden">
              <span className="absolute text-white font-semibold text-4xl">
                {initials}
              </span>
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border border-white/20">
              <ShieldCheck size={18} />
            </div>
            {editing && (
              <button
                type="button"
                className="absolute inset-0 rounded-[2rem] bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
              >
                <Camera className="text-white" size={24} />
              </button>
            )}
          </div>

          {/* Name & badges */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                {localProfile.name}
              </h1>
              {phoneVerified && (
                <BadgeCheck size={28} className="text-emerald-300" />
              )}
            </div>
            <p className="text-white/70 font-medium text-sm mt-1">
              {localProfile.email}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 shadow-sm backdrop-blur-md">
                Premium Tier
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 shadow-sm backdrop-blur-md">
                ✓ AI Synced
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/20 shadow-sm backdrop-blur-md">
                BMI {localProfile.bmi} — Optimal
              </span>
            </div>
          </div>

          {/* Edit / Save button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (editing ? handleSave() : setEditing(true))}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-sm shadow-xl transition-all"
            style={{
              background: editing
                ? "rgba(16, 185, 129, 0.9)"
                : "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(16px)",
            }}
          >
            {editing ? <Save size={18} /> : <Edit3 size={18} />}
            {isLoading ? "Saving…" : editing ? "Save Profile" : "Edit Profile"}
          </motion.button>
          {editing && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditing(false)}
              className="p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </motion.button>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative z-10 px-8 md:px-10 pb-6">
          <div className="flex justify-between text-xs font-medium text-white/80 mb-2">
            <span>Profile Completion</span>
            <span>92%</span>
          </div>
          <div className="h-1.5 rounded-full bg-black/20 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-[1.5rem] w-fit backdrop-blur-3xl border border-border/50">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#1a1a24] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT: Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "info" && (
              <div className="rounded-[2rem] p-8 space-y-6 bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle">
                <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <Fingerprint size={20} className="text-primary" /> Personal
                  Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Full Name",
                      key: "name",
                      icon: User,
                      type: "text",
                    },
                    {
                      label: "Email Address",
                      key: "email",
                      icon: Mail,
                      type: "email",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        htmlFor={`input-${field.key}`}
                        className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2"
                      >
                        <field.icon size={14} /> {field.label}
                      </label>
                      {editing ? (
                        <input
                          id={`input-${field.key}`}
                          type={field.type}
                          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all text-foreground"
                          value={
                            localProfile[
                              field.key as keyof typeof localProfile
                            ] || ""
                          }
                          onChange={(e) =>
                            setLocalProfile({
                              ...localProfile,
                              [field.key]: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-foreground font-medium text-sm px-1 py-3 border-b border-border/50">
                          {localProfile[
                            field.key as keyof typeof localProfile
                          ] || "—"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "health" && (
              <div className="rounded-[2rem] p-8 space-y-6 bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle">
                <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <Activity size={20} className="text-primary" /> Health
                  Biometrics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {healthStats.map((s, i) => (
                    <motion.div
                      key={s.key}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`rounded-2xl p-5 border border-border/50 ${s.bg}`}
                    >
                      <s.icon size={22} className={`mb-3 ${s.color}`} />
                      {editing ? (
                        <input
                          type={s.key === "bloodGroup" ? "text" : "number"}
                          className="w-full bg-background/50 border border-border/50 focus:border-primary/50 rounded-xl px-3 py-2 text-xl font-semibold outline-none text-foreground mb-1"
                          value={s.value || ""}
                          onChange={(e) =>
                            setLocalProfile({
                              ...localProfile,
                              [s.key]: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-2xl font-semibold text-foreground">
                          {s.value || "—"}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            {s.unit}
                          </span>
                        </p>
                      )}
                      <p className="text-xs font-medium text-muted-foreground mt-1">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* BMI bar */}
                <div className="rounded-2xl p-6 bg-slate-900 dark:bg-black/40 border border-slate-800 dark:border-white/5 text-white space-y-3">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="text-slate-400">
                      Metabolic Efficiency (BMI)
                    </span>
                    <span className="text-emerald-400">
                      {localProfile.bmi} — Optimal
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="rounded-[2rem] p-8 space-y-6 bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle">
                <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <Lock size={20} className="text-primary" /> Phone Verification
                </h2>

                <div>
                  <label
                    htmlFor="mobile-number"
                    className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2"
                  >
                    <Phone size={14} /> Mobile Number
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="mobile-number"
                      className={`flex-1 border rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors ${
                        phoneVerified
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 focus:border-primary/50 text-foreground"
                      }`}
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+1 555-0000"
                      disabled={phoneVerified}
                    />
                    {!phoneVerified && !otpSent && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading}
                        className="px-6 py-3 rounded-xl font-medium text-sm text-white shadow-lg transition-all hover:opacity-90"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--health-blue) 0%, var(--health-teal) 100%)",
                        }}
                      >
                        {otpLoading ? "Sending…" : "Send OTP"}
                      </button>
                    )}
                  </div>
                  {phoneVerified && (
                    <div className="mt-2 flex items-center gap-2 text-emerald-500 text-xs font-medium">
                      <CheckCircle size={14} /> Verified and Secured
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {otpSent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 mt-4 shadow-sm">
                        <label
                          htmlFor="otp-input"
                          className="text-xs font-medium text-primary block text-center"
                        >
                          Enter 6-digit Code
                        </label>
                        <div className="flex gap-3">
                          <input
                            id="otp-input"
                            type="text"
                            maxLength={6}
                            className="flex-1 bg-background text-foreground text-center text-2xl font-semibold tracking-[0.5em] rounded-xl p-4 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpLoading}
                            className="px-6 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-md hover:bg-primary/90 transition-colors"
                          >
                            {otpLoading ? "Verifying…" : "Verify"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* RIGHT: Quick Actions + Emergency */}
          <div className="space-y-6">
            {/* Health Score Card */}
            <div className="rounded-[2rem] p-6 text-center bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Overall Health Score
              </p>
              <p className="text-5xl font-semibold bg-gradient-to-br from-primary to-emerald-500 bg-clip-text text-transparent py-2">
                92
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                out of 100 — Excellent
              </p>
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.2 }}
                  className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
