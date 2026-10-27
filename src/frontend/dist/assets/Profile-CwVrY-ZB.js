import { c as createLucideIcon, a as useHealthStore, r as reactExports, j as jsxRuntimeExports, m as motion, U as User, A as Activity, b as AnimatePresence, f as ue } from "./index-pQ9MGfeR.js";
import { D as Droplets } from "./droplets-DLw62bPf.js";
import { Z as Zap } from "./zap-CvQo1RWZ.js";
import { S as ShieldCheck } from "./shield-check-DaaUCZBu.js";
import { C as Camera } from "./camera-F7-4vpUI.js";
import { S as Save } from "./save-B3bqvULU.js";
import { P as PenLine } from "./pen-line-Ds-M6Sej.js";
import { X } from "./x-D2fkv8yI.js";
import { L as Lock, M as Mail } from "./mail-BOo9zrHp.js";
import { P as Phone } from "./phone-C4RZcEuK.js";
import { C as CircleCheckBig } from "./circle-check-big-SKm4cL5v.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }],
  ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]
];
const Scale = createLucideIcon("scale", __iconNode);
function Profile() {
  const { userProfile, setUserProfile } = useHealthStore();
  const [editing, setEditing] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [localProfile, setLocalProfile] = reactExports.useState({
    name: (userProfile == null ? void 0 : userProfile.name) || "Alex Reynolds",
    email: "alex@health-ai.io",
    phone: (userProfile == null ? void 0 : userProfile.phone) || "+1 555-0192",
    age: (userProfile == null ? void 0 : userProfile.age) || 26,
    weight: (userProfile == null ? void 0 : userProfile.weight) || 72,
    height: (userProfile == null ? void 0 : userProfile.height) || 178,
    bloodGroup: "AB+",
    bmi: 22.7
  });
  const [phoneInput, setPhoneInput] = reactExports.useState(localProfile.phone);
  const [otpInput, setOtpInput] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [otpLoading, setOtpLoading] = reactExports.useState(false);
  const [phoneVerified, setPhoneVerified] = reactExports.useState(!!(userProfile == null ? void 0 : userProfile.phone));
  const [activeTab, setActiveTab] = reactExports.useState(
    "info"
  );
  const handleSendOtp = async () => {
    if (!phoneInput || phoneInput.length < 10) {
      ue.error("Enter valid phone with country code");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      ue.success(`OTP sent to ${phoneInput}`);
      setOtpLoading(false);
    }, 1500);
  };
  const handleVerifyOtp = async () => {
    if (!otpInput) {
      ue.error("Enter the 6-digit code");
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
      ue.success("Phone verified!", { icon: "🛡️" });
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
          height: Number(localProfile.height)
        });
      }
      setEditing(false);
      setIsLoading(false);
      ue.success("Profile updated!", { icon: "✅" });
    }, 1e3);
  };
  const initials = localProfile.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const healthStats = [
    {
      label: "Weight",
      key: "weight",
      value: localProfile.weight,
      unit: "kg",
      icon: Scale,
      color: "text-sky-500 dark:text-sky-400",
      bg: "bg-sky-500/10"
    },
    {
      label: "Height",
      key: "height",
      value: localProfile.height,
      unit: "cm",
      icon: Ruler,
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      label: "Blood Group",
      key: "bloodGroup",
      value: localProfile.bloodGroup,
      unit: "",
      icon: Droplets,
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-500/10"
    },
    {
      label: "Age",
      key: "age",
      value: localProfile.age,
      unit: "yrs",
      icon: Zap,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/10"
    }
  ];
  const tabs = [
    { id: "info", label: "Personal Info", icon: User },
    { id: "health", label: "Health Stats", icon: Activity },
    { id: "security", label: "Security", icon: Lock }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto space-y-8 pb-16 px-4 md:px-8 py-8",
      style: { fontFamily: "'Inter', sans-serif" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight text-foreground", children: "Account Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your personal data and security preferences" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            className: "relative overflow-hidden rounded-[2rem] shadow-subtle border border-border/50 backdrop-blur-3xl",
            style: {
              background: "linear-gradient(135deg, rgba(3, 105, 161, 0.9) 0%, rgba(14, 165, 233, 0.8) 50%, rgba(56, 189, 248, 0.9) 100%)",
              minHeight: 220
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full opacity-20 bg-white/30 blur-2xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-60px] left-[-20px] w-80 h-80 rounded-full opacity-10 bg-white/40 blur-2xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-white font-semibold text-4xl", children: initials }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }) }),
                  editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "absolute inset-0 rounded-[2rem] bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "text-white", size: 24 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-3 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-semibold text-white tracking-tight", children: localProfile.name }),
                    phoneVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 28, className: "text-emerald-300" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 font-medium text-sm mt-1", children: localProfile.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-4 justify-center md:justify-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 shadow-sm backdrop-blur-md", children: "Premium Tier" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 shadow-sm backdrop-blur-md", children: "✓ AI Synced" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/20 shadow-sm backdrop-blur-md", children: [
                      "BMI ",
                      localProfile.bmi,
                      " — Optimal"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    onClick: () => editing ? handleSave() : setEditing(true),
                    disabled: isLoading,
                    className: "flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-sm shadow-xl transition-all",
                    style: {
                      background: editing ? "rgba(16, 185, 129, 0.9)" : "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(16px)"
                    },
                    children: [
                      editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 18 }),
                      isLoading ? "Saving…" : editing ? "Save Profile" : "Edit Profile"
                    ]
                  }
                ),
                editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    whileTap: { scale: 0.95 },
                    onClick: () => setEditing(false),
                    className: "p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-8 md:px-10 pb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-medium text-white/80 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Profile Completion" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "92%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-black/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: "92%" },
                    transition: { duration: 1.4, ease: "easeOut" },
                    className: "h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-[1.5rem] w-fit backdrop-blur-3xl border border-border/50", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-300 ${activeTab === tab.id ? "bg-white dark:bg-[#1a1a24] text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { size: 16 }),
              tab.label
            ]
          },
          tab.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -16 },
            transition: { duration: 0.3 },
            className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
                activeTab === "info" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] p-8 space-y-6 bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground text-lg flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 20, className: "text-primary" }),
                    " Personal Information"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                    {
                      label: "Full Name",
                      key: "name",
                      icon: User,
                      type: "text"
                    },
                    {
                      label: "Email Address",
                      key: "email",
                      icon: Mail,
                      type: "email"
                    }
                  ].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: `input-${field.key}`,
                        className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(field.icon, { size: 14 }),
                          " ",
                          field.label
                        ]
                      }
                    ),
                    editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: `input-${field.key}`,
                        type: field.type,
                        className: "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all text-foreground",
                        value: localProfile[field.key] || "",
                        onChange: (e) => setLocalProfile({
                          ...localProfile,
                          [field.key]: e.target.value
                        })
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm px-1 py-3 border-b border-border/50", children: localProfile[field.key] || "—" })
                  ] }, field.key)) })
                ] }),
                activeTab === "health" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] p-8 space-y-6 bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground text-lg flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 20, className: "text-primary" }),
                    " Health Biometrics"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: healthStats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: i * 0.07 },
                      className: `rounded-2xl p-5 border border-border/50 ${s.bg}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { size: 22, className: `mb-3 ${s.color}` }),
                        editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: s.key === "bloodGroup" ? "text" : "number",
                            className: "w-full bg-background/50 border border-border/50 focus:border-primary/50 rounded-xl px-3 py-2 text-xl font-semibold outline-none text-foreground mb-1",
                            value: s.value || "",
                            onChange: (e) => setLocalProfile({
                              ...localProfile,
                              [s.key]: e.target.value
                            })
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-semibold text-foreground", children: [
                          s.value || "—",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: s.unit })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mt-1", children: s.label })
                      ]
                    },
                    s.key
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 bg-slate-900 dark:bg-black/40 border border-slate-800 dark:border-white/5 text-white space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Metabolic Efficiency (BMI)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400", children: [
                        localProfile.bmi,
                        " — Optimal"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: "92%" },
                        transition: { duration: 1.2, ease: "easeOut" },
                        className: "h-full bg-emerald-500 rounded-full shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                      }
                    ) })
                  ] })
                ] }),
                activeTab === "security" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] p-8 space-y-6 bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground text-lg flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 20, className: "text-primary" }),
                    " Phone Verification"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "mobile-number",
                        className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                          " Mobile Number"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "mobile-number",
                          className: `flex-1 border rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors ${phoneVerified ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 focus:border-primary/50 text-foreground"}`,
                          value: phoneInput,
                          onChange: (e) => setPhoneInput(e.target.value),
                          placeholder: "+1 555-0000",
                          disabled: phoneVerified
                        }
                      ),
                      !phoneVerified && !otpSent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleSendOtp,
                          disabled: otpLoading,
                          className: "px-6 py-3 rounded-xl font-medium text-sm text-white shadow-lg transition-all hover:opacity-90",
                          style: {
                            background: "linear-gradient(135deg, var(--health-blue) 0%, var(--health-teal) 100%)"
                          },
                          children: otpLoading ? "Sending…" : "Send OTP"
                        }
                      )
                    ] }),
                    phoneVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 text-emerald-500 text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }),
                      " Verified and Secured"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: otpSent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, height: 0 },
                      animate: { opacity: 1, height: "auto" },
                      exit: { opacity: 0, height: 0 },
                      className: "overflow-hidden",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 space-y-4 mt-4 shadow-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "otp-input",
                            className: "text-xs font-medium text-primary block text-center",
                            children: "Enter 6-digit Code"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "otp-input",
                              type: "text",
                              maxLength: 6,
                              className: "flex-1 bg-background text-foreground text-center text-2xl font-semibold tracking-[0.5em] rounded-xl p-4 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none",
                              value: otpInput,
                              onChange: (e) => setOtpInput(e.target.value)
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: handleVerifyOtp,
                              disabled: otpLoading,
                              className: "px-6 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-md hover:bg-primary/90 transition-colors",
                              children: otpLoading ? "Verifying…" : "Verify"
                            }
                          )
                        ] })
                      ] })
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] p-6 text-center bg-white/60 dark:bg-[#111116]/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-subtle space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Overall Health Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-semibold bg-gradient-to-br from-primary to-emerald-500 bg-clip-text text-transparent py-2", children: "92" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "out of 100 — Excellent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: "92%" },
                    transition: { duration: 1.2 },
                    className: "h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                  }
                ) })
              ] }) })
            ]
          },
          activeTab
        ) })
      ]
    }
  );
}
export {
  Profile as default
};
