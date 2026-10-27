import { u as useNavigate, a as useHealthStore, r as reactExports, j as jsxRuntimeExports, b as AnimatePresence, m as motion, B as Button, C as ChevronRight } from "./index-pQ9MGfeR.js";
import { u as useSaveProfile, a as useAddMoodEntry } from "./useBackend-CQZwdIO-.js";
import { C as Check } from "./check-CqXS_8kJ.js";
const STEP_LABELS = ["Welcome", "Profile", "Goals", "Mood", "Confirm"];
const GOALS = [
  {
    id: "weight_loss",
    label: "Weight Loss",
    emoji: "⚖️",
    desc: "Reach your ideal body weight"
  },
  {
    id: "mental_wellness",
    label: "Mental Wellness",
    emoji: "🧘",
    desc: "Reduce stress and anxiety"
  },
  {
    id: "fitness",
    label: "Fitness",
    emoji: "💪",
    desc: "Build strength and endurance"
  },
  {
    id: "nutrition",
    label: "Nutrition",
    emoji: "🥗",
    desc: "Improve your eating habits"
  },
  {
    id: "disease_prevention",
    label: "Disease Prevention",
    emoji: "🛡️",
    desc: "Stay ahead of health risks"
  },
  {
    id: "pcos",
    label: "PCOS Management",
    emoji: "🌸",
    desc: "Balance hormones and manage PCOS"
  },
  {
    id: "hormonal_health",
    label: "Hormonal Balance",
    emoji: "⚖️",
    desc: "Support your endocrine health"
  },
  {
    id: "better_sleep",
    label: "Better Sleep",
    emoji: "😴",
    desc: "Improve sleep quality"
  }
];
const MOODS = [
  { level: 1, emoji: "😞", label: "Very Low", color: "#ef4444" },
  { level: 2, emoji: "😐", label: "Low", color: "#f97316" },
  { level: 3, emoji: "🙂", label: "Okay", color: "#eab308" },
  { level: 4, emoji: "😊", label: "Good", color: "#22c55e" },
  { level: 5, emoji: "😁", label: "Excellent", color: "#14b8a6" }
];
const LIFESTYLES = [
  {
    id: "sedentary",
    emoji: "🪑",
    label: "Sedentary",
    desc: "Mostly desk work, little activity"
  },
  {
    id: "active",
    emoji: "🚶",
    label: "Active",
    desc: "Regular movement and exercise"
  },
  {
    id: "athletic",
    emoji: "🏃",
    label: "Athletic",
    desc: "Intense training routines"
  }
];
const GENDERS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
  { id: "prefer_not_to_say", label: "Prefer not to say" }
];
function ProgressBar({ step }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1.5 mb-8",
      "aria-label": "Onboarding progress",
      children: STEP_LABELS.map((label, i) => {
        const isDone = i < step;
        const isActive = i === step;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isDone ? "gradient-primary text-white shadow-md" : isActive ? "gradient-primary text-white shadow-md ring-4 ring-[#3b82f6]/20" : "bg-muted text-muted-foreground"}`,
              children: [
                isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, strokeWidth: 3 }) : i + 1,
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full animate-ping opacity-30 gradient-primary" })
              ]
            }
          ),
          i < STEP_LABELS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-0.5 w-8 sm:w-12 rounded-full transition-all duration-500",
              style: {
                background: i < step ? "linear-gradient(90deg, #3b82f6, #14b8a6)" : "oklch(var(--muted))"
              }
            }
          )
        ] }, label);
      })
    }
  );
}
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0
  })
};
function OnboardingPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveProfile();
  const addMoodEntry = useAddMoodEntry();
  const { setUserProfile, setAuthenticated } = useHealthStore();
  const [step, setStep] = reactExports.useState(0);
  const [dir, setDir] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [age, setAge] = reactExports.useState(25);
  const [gender, setGender] = reactExports.useState("prefer_not_to_say");
  const [lifestyle, setLifestyle] = reactExports.useState("active");
  const [goals, setGoals] = reactExports.useState([]);
  const [mood, setMood] = reactExports.useState(4);
  const [moodNote, setMoodNote] = reactExports.useState("");
  const goNext = () => {
    setDir(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };
  const toggleGoal = (g) => {
    setGoals(
      (prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };
  const handleFinish = async () => {
    var _a;
    const validGoals = goals.filter(
      (g) => g !== "better_sleep"
    );
    const profile = await saveProfile.mutateAsync({
      name,
      age,
      gender,
      lifestyle,
      goals: validGoals,
      initialMood: mood
    });
    await addMoodEntry.mutateAsync({
      mood,
      emoji: (_a = MOODS.find((m) => m.level === mood)) == null ? void 0 : _a.emoji,
      note: moodNote || void 0
    });
    setUserProfile(profile);
    setAuthenticated(true, "local-user");
    navigate({ to: "/dashboard" });
  };
  const selectedMood = MOODS.find((m) => m.level === mood);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "onboarding.page",
      className: "min-h-screen flex flex-col items-center justify-center p-4 py-10 relative overflow-hidden",
      style: {
        background: "linear-gradient(160deg, oklch(0.96 0.012 230) 0%, oklch(0.98 0.006 240) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none",
            "aria-hidden": true,
            style: {
              background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              transform: "translate(-40%, -40%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-8 pointer-events-none",
            "aria-hidden": true,
            style: {
              background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
              transform: "translate(40%, 40%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-elevated mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "❤️" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "AI Health Companion" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { step }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl shadow-elevated overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: dir, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: dir,
              variants: slideVariants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition: { duration: 0.3, ease: "easeInOut" },
              className: "p-7 sm:p-8",
              children: [
                step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-5xl shadow-md",
                      style: {
                        background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(20,184,166,0.12) 100%)"
                      },
                      children: "🌟"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Welcome to AI Health Companion" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "Your personal AI-powered health platform. Let's set up your profile in just 4 quick steps to personalize your experience." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-left", children: [
                    "Personalized health insights",
                    "AI symptom checking",
                    "Mood & habit tracking",
                    "Smart reminders"
                  ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 11, className: "text-white" }) }),
                        item
                      ]
                    },
                    item
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "onboarding.welcome.primary_button",
                      className: "w-full gradient-primary border-0 text-white font-semibold py-5",
                      onClick: goNext,
                      children: [
                        "Continue with Internet Identity",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "ml-1" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secured by Internet Identity — no passwords required" })
                ] }),
                step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Personal Details" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Help us personalize your health plan" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "ob-name",
                        className: "text-sm font-medium text-foreground",
                        children: [
                          "Full Name ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "ob-name",
                        "data-ocid": "onboarding.name.input",
                        type: "text",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        placeholder: "Enter your full name",
                        className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "ob-age",
                        className: "text-sm font-medium text-foreground",
                        children: [
                          "Age ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "ob-age",
                        "data-ocid": "onboarding.age.input",
                        type: "number",
                        value: age,
                        onChange: (e) => setAge(
                          Math.max(1, Math.min(120, Number(e.target.value)))
                        ),
                        min: 1,
                        max: 120,
                        className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Gender" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `onboarding.gender_${g.id}.radio`,
                        onClick: () => setGender(g.id),
                        className: `px-3 py-2.5 rounded-xl border text-sm transition-all ${gender === g.id ? "gradient-primary text-white border-transparent shadow-sm" : "border-border hover:border-primary/50 text-foreground bg-background"}`,
                        children: g.label
                      },
                      g.id
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Lifestyle" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: LIFESTYLES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `onboarding.lifestyle_${l.id}.radio`,
                        onClick: () => setLifestyle(l.id),
                        className: `flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-sm transition-all ${lifestyle === l.id ? "gradient-primary text-white border-transparent shadow-sm" : "border-border hover:border-primary/50 text-foreground bg-background"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: l.emoji }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-xs", children: l.label })
                        ]
                      },
                      l.id
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        onClick: goBack,
                        className: "flex-1",
                        children: "Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": "onboarding.profile.primary_button",
                        className: "flex-1 gradient-primary border-0 text-white",
                        disabled: !name.trim() || age < 1,
                        onClick: goNext,
                        children: "Continue"
                      }
                    )
                  ] })
                ] }),
                step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Health Goals" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Select all that apply — choose at least one" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5", children: GOALS.map((g) => {
                    const selected = goals.includes(g.id);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `onboarding.goal_${g.id}.checkbox`,
                        onClick: () => toggleGoal(g.id),
                        className: `flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left ${selected ? "gradient-primary text-white border-transparent shadow-md" : "border-border hover:border-primary/50 bg-background"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0", children: g.emoji }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `font-semibold text-sm ${selected ? "text-white" : "text-foreground"}`,
                                children: g.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `text-xs mt-0.5 ${selected ? "text-white/75" : "text-muted-foreground"}`,
                                children: g.desc
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 transition-all ${selected ? "bg-white/30 border-white/50" : "border-border"}`,
                              children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Check,
                                {
                                  size: 11,
                                  className: "text-white",
                                  strokeWidth: 3
                                }
                              )
                            }
                          )
                        ]
                      },
                      g.id
                    );
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        onClick: goBack,
                        className: "flex-1",
                        children: "Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": "onboarding.goals.primary_button",
                        className: "flex-1 gradient-primary border-0 text-white",
                        disabled: goals.length === 0,
                        onClick: goNext,
                        children: "Continue"
                      }
                    )
                  ] })
                ] }),
                step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "How are you feeling today?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Your initial mood helps us personalize your journey" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between gap-2", children: MOODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      "data-ocid": `onboarding.mood_${m.level}.radio`,
                      onClick: () => setMood(m.level),
                      whileHover: { scale: 1.08 },
                      whileTap: { scale: 0.95 },
                      className: `flex-1 flex flex-col items-center gap-2 py-5 rounded-2xl border transition-all ${mood === m.level ? "border-transparent shadow-md" : "border-border hover:border-primary/40 bg-background"}`,
                      style: mood === m.level ? {
                        background: `linear-gradient(135deg, ${m.color}22 0%, ${m.color}11 100%)`,
                        borderColor: m.color
                      } : {},
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: m.emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-semibold",
                            style: {
                              color: mood === m.level ? m.color : void 0
                            },
                            children: m.label
                          }
                        )
                      ]
                    },
                    m.level
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "ob-mood-note",
                        className: "text-sm font-medium text-foreground",
                        children: [
                          "Anything on your mind?",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "ob-mood-note",
                        "data-ocid": "onboarding.mood_note.textarea",
                        value: moodNote,
                        onChange: (e) => setMoodNote(e.target.value),
                        placeholder: "How are you feeling today?",
                        rows: 3,
                        className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        onClick: goBack,
                        className: "flex-1",
                        children: "Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": "onboarding.mood.primary_button",
                        className: "flex-1 gradient-primary border-0 text-white",
                        onClick: goNext,
                        children: "Continue"
                      }
                    )
                  ] })
                ] }),
                step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: (selectedMood == null ? void 0 : selectedMood.emoji) ?? "🎉" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground", children: [
                      "You're all set, ",
                      name || "there",
                      "!"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Here's a summary of your profile" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-2xl p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Age" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: age })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Lifestyle" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground capitalize", children: lifestyle })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Today's Mood" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                        selectedMood == null ? void 0 : selectedMood.emoji,
                        " ",
                        selectedMood == null ? void 0 : selectedMood.label
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm block mb-2", children: "Goals" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: goals.map((g) => {
                        const found = GOALS.find((gd) => gd.id === g);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium",
                            children: [
                              found == null ? void 0 : found.emoji,
                              " ",
                              found == null ? void 0 : found.label
                            ]
                          },
                          g
                        );
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        onClick: goBack,
                        className: "flex-1",
                        children: "Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": "onboarding.confirm.primary_button",
                        className: "flex-1 gradient-primary border-0 text-white font-semibold",
                        onClick: handleFinish,
                        disabled: saveProfile.isPending || addMoodEntry.isPending,
                        children: saveProfile.isPending ? "Setting up..." : "Complete & Start Journey 🚀"
                      }
                    )
                  ] })
                ] })
              ]
            },
            step
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-4", children: [
            "Step ",
            step + 1,
            " of ",
            STEP_LABELS.length
          ] })
        ] })
      ]
    }
  );
}
export {
  OnboardingPage as default
};
