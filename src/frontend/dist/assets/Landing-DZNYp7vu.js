import { c as createLucideIcon, j as jsxRuntimeExports, L as Link } from "./index-pQ9MGfeR.js";
import { Z as Zap } from "./zap-CvQo1RWZ.js";
import { S as Shield } from "./shield-CH1a4zoY.js";
import { A as ArrowRight } from "./arrow-right-BsPT0-Ie.js";
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
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const features = [
  {
    icon: "🤒",
    title: "Symptoms Checker",
    desc: "AI-powered natural remedy suggestions for your symptoms.",
    color: "from-rose-400 to-rose-600"
  },
  {
    icon: "🥗",
    title: "Diet Recommendation",
    desc: "Condition-specific diet plans with foods to eat & avoid.",
    color: "from-emerald-400 to-emerald-600"
  },
  {
    icon: "🧘",
    title: "Yoga & Exercise",
    desc: "YouTube-embedded routines for every health condition.",
    color: "from-violet-400 to-violet-600"
  },
  {
    icon: "❤️",
    title: "Health Risk Score",
    desc: "Color-coded risk prediction for diabetes, heart & more.",
    color: "from-red-400 to-red-600"
  },
  {
    icon: "🔬",
    title: "Skin Disease AI",
    desc: "Upload a photo — our CNN model detects skin conditions.",
    color: "from-amber-400 to-amber-600"
  },
  {
    icon: "🩻",
    title: "Medical Imaging",
    desc: "AI analysis of MRI, CT, X-Ray & Ultrasound scans.",
    color: "from-sky-400 to-sky-600"
  },
  {
    icon: "🤖",
    title: "AI Chatbot",
    desc: "Multi-language health chatbot for instant guidance.",
    color: "from-indigo-400 to-indigo-600"
  },
  {
    icon: "🎤",
    title: "Voice Assistant",
    desc: "Speak your health query and get voice + text responses.",
    color: "from-teal-400 to-teal-600"
  }
];
const stats = [
  { value: "17+", label: "AI Features", icon: Zap },
  { value: "98%", label: "Accuracy Rate", icon: Award },
  { value: "50K+", label: "Users Helped", icon: Users },
  { value: "24/7", label: "AI Support", icon: Shield }
];
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-6 pb-12 px-8 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_#CAF0F8_0%,_transparent_50%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-1/2 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xl text-[#0077B6] text-[10px] font-black tracking-[0.2em] uppercase border border-[#0077B6]/20", children: "The Future of Longevity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl lg:text-5xl font-black text-[#03045E] tracking-tighter leading-tight lg:max-w-xl", children: [
            "Your Personal ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-[#0077B6] to-[#00B4D8]", children: "AI Health Companion" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-xl", children: "Track symptoms in real-time, predict metabolic risks with clinical precision, and experience a new era of digital diagnostics powered by empathetic AI." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-6 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                className: "px-10 py-5 bg-[#03045E] text-white rounded-full font-bold text-lg shadow-2xl shadow-navy/30 hover:scale-105 hover:bg-[#0077B6] transition-all duration-300",
                children: "GET STARTED FREE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "px-10 py-5 bg-white/40 backdrop-blur-xl text-[#03045E] rounded-full font-bold text-lg hover:bg-white transition-all border border-white",
                children: "SIGN IN"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-5/12 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-4 shadow-2xl overflow-hidden group scale-95 xl:scale-100 origin-center border border-white/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            alt: "HealthAI Model",
            className: "w-full h-auto rounded-[2rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 max-h-[500px] object-cover",
            src: "/hero-health.png"
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-6 bg-[#03045E]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "text-sky-300", size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-black text-white mb-1", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sky-300 font-bold text-[10px] uppercase tracking-widest", children: stat.label })
    ] }, stat.label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-slate-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-[#03045E] mb-2", children: "17+ AI-Powered Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-slate-500 max-w-xl mx-auto font-medium", children: "Everything you need to monitor and improve your health — in one smart platform." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "group bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-default",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform shadow-md`,
                children: f.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black text-slate-800 mb-2", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-[13px] font-medium leading-relaxed", children: f.desc })
          ]
        },
        f.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-10 pb-12 overflow-hidden bg-[#f4faff]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#50d9fe]/20 blur-[80px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#005d90]/10 blur-[80px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] left-[20%] w-px h-px shadow-[0_0_200px_100px_rgba(255,255,255,0.8)] opacity-50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-screen-xl mx-auto px-12 text-center mb-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block py-1 px-3 rounded-full bg-[#b3ebff]/30 text-[#004e5f] text-[10px] font-bold tracking-widest uppercase mb-3", children: "Process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-extrabold text-[#141d21] tracking-tighter mb-2 leading-tight", children: "How It Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-[#404850] font-medium max-w-xl mx-auto", children: "Experience the fusion of biological data and editorial intelligence in 3 steps." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-screen-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5 flex flex-col items-start relative group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_rgba(0,93,144,0.05)] border border-white/40",
            style: {
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-16 bg-gradient-to-r from-[#00677d] to-[#50d9fe] absolute top-0 left-6 rounded-b-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#404850]/15 font-black text-4xl mb-2", children: "01" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-[#e0e9ef] flex items-center justify-center mb-3 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-[#005d90] text-2xl", children: "clinical_notes" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-[#141d21] mb-2", children: "Profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#404850] leading-relaxed text-sm mb-4", children: "Build a secure digital twin of your biology." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#005d90] font-bold text-sm tracking-wide group-hover:gap-4 transition-all", children: [
                "LEARN MORE",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-sm", children: "arrow_forward" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  alt: "Step 1 Visual",
                  className: "w-full h-full object-contain mix-blend-multiply",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAQDFfDLykP83MAXS67O7Wq5Gfh6PlP0A5AlxHVvl9kPyFMrKGaPFXQozcfVm0f3xfq3ZKb7rczwYIvEPXnO8G_hlADfT8S0l-KRkgUG59OkyWIflHLJjBJu0l4-37sThF2ziR987ZdB9lrrkK-ynhWGP_Da7tYgQDAbJFfnsM_PCm5eZJrCk-3kHKYmr0fF6EpxJlOCWpSENKwMXANaX6vPMeIhzL719zE9t8G-t7q0YnHFTr8vrLeM2PcSr6XLXwd9oRelQzGYOj"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5 flex flex-col items-start relative group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_rgba(0,93,144,0.08)] border border-white/60",
            style: {
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-16 bg-gradient-to-r from-[#005d90] to-[#0077b6] absolute top-0 left-6 rounded-b-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#404850]/15 font-black text-4xl mb-2", children: "02" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-[#cde5ff] flex items-center justify-center mb-3 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-[#005d90] text-2xl", children: "smart_toy" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-[#141d21] mb-2", children: "Analysis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#404850] leading-relaxed text-sm mb-4", children: "Advanced model identifies patterns in your vitals." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#005d90] font-bold text-sm tracking-wide group-hover:gap-4 transition-all", children: [
                "AI STANDARDS",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-sm", children: "arrow_forward" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -bottom-6 w-32 h-32 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  alt: "Step 2 Visual",
                  className: "w-full h-full object-contain",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_YJHgeNRAB3PRFXlReOuLIKoUw7jyBEu83quSYt7TJIul87-Mb5C75eGqYt2kpq8q2urWOSje4ISPBZ67QjAWYAR4G7_At-HxyLF46aCyzJky4mO4Q7j9_TayUqyFUKkP1dMp3CXqPUxbRR0eufwgbACavaeunp8myqm3DAdq6RrNLahJ7pyGgW3SgX3rRkGiCUkxS53O2wZzGsF84GswBDJtpXjIv7jUNUUfPyIN2aPSnwIu7mAZJdFlPW9tMTozHQEiZuYLkcp"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5 flex flex-col items-start relative group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_rgba(0,93,144,0.05)] border border-white/40",
            style: {
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-16 bg-gradient-to-r from-[#006644] to-[#92f7c3] absolute top-0 left-6 rounded-b-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#404850]/15 font-black text-4xl mb-2", children: "03" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-[#e0e9ef] flex items-center justify-center mb-3 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-[#005d90] text-2xl", children: "lightbulb" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-[#141d21] mb-2", children: "Insights" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#404850] leading-relaxed text-sm mb-4", children: "Daily reports with actionable biological advice." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#005d90] font-bold text-sm tracking-wide group-hover:gap-4 transition-all", children: [
                "VIEW SAMPLE",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-symbols-outlined text-sm", children: "arrow_forward" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-4 -top-4 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  alt: "Step 3 Visual",
                  className: "w-full h-full object-contain mix-blend-multiply",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAFFC7r6fWDBaQNVSSEKd5OxQ4ODjonXhkjHG9aQD7BEFe-0PqTxIlhvGo87xQow6v9UPYFeFMPSKsCa4y3p7CB8h1Pxa8MqJMmmEoyQpbkw6SGw6s4cOHIFVC5S3huGhLAUhx9QrIJf50ntIPajQLmu7tmU9QzewLIFs_tjOuJfbtOKC4yBA1uPf0memrMaKoRLTq47IrlzROlrE9J0FGN9HWRBS1CnA1HOrRMlldjfvnvBOCae9bqquJg3WSJiWiFsR4X57tvTev"
                }
              ) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full bg-[#ecf5fb] py-16 px-12 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              alt: "Platform Showcase",
              className: "w-full rounded-xl shadow-2xl relative z-10 border border-white/50",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfJT44f3rN0eRlZbjCqYJ5pZtmMfuMD5s1k109AJzAnWGt6x0Y2zD0dUxGQzHkfVnUDhDFvw3gZ9jQdn_5-NJara5lylA11-V3uW8lfQDPA02mscdG4zbhSCSKzba8496UFhsL5ZneazpwAYlUWkLsJ9wBt4VvhP5upTKwmuNM9zRYT_TVifGV1YRs7O5M9ljaTXauaDRv402D_0gwRRBYbO20yR20BbsBuHLFg6XUX0qkHrAw5viQg9ye-SeSgpP32evemOQvQSzJ"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -left-10 w-40 h-40 bg-[#00677d]/10 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -right-10 w-60 h-60 bg-[#005d90]/10 rounded-full blur-3xl" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-5/12 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl font-bold tracking-tight text-[#141d21] leading-tight", children: [
            "Biological Data,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#005d90]", children: "Beautifully Narrated." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-[#404850] leading-relaxed", children: "Fluid Health doesn't just show you numbers. We curate your biological data into a daily editorial experience. Understand your circadian rhythm, cardiovascular efficiency, and metabolic trends through high-scale visualizations and clinical narratives." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 text-[#141d21] font-semibold text-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-[#92f7c3] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "material-symbols-outlined text-[#005235] text-sm",
                  style: { fontVariationSettings: "'FILL' 1" },
                  children: "check"
                }
              ) }),
              "Real-time biometric streaming"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 text-[#141d21] font-semibold text-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-[#92f7c3] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "material-symbols-outlined text-[#005235] text-sm",
                  style: { fontVariationSettings: "'FILL' 1" },
                  children: "check"
                }
              ) }),
              "Predictive health modeling"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 text-[#141d21] font-semibold text-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-[#92f7c3] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "material-symbols-outlined text-[#005235] text-sm",
                  style: { fontVariationSettings: "'FILL' 1" },
                  children: "check"
                }
              ) }),
              "HIPAA-compliant data encryption"
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-12 bg-gradient-to-br from-[#0077B6] to-[#03045E] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🏥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-white mb-6", children: "Start Your Health Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-sky-100 mb-10 font-medium max-w-2xl mx-auto leading-relaxed", children: "Join thousands of users who trust HealthAI for daily health monitoring, AI-powered insights, and personalized wellness guidance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/register",
            className: "group flex items-center justify-center gap-3 bg-white text-[#0077B6] font-black text-lg px-10 py-5 rounded-2xl hover:bg-sky-50 transition-all shadow-2xl hover:-translate-y-1",
            children: [
              "Create Free Account",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArrowRight,
                {
                  size: 20,
                  className: "group-hover:translate-x-1 transition-transform"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sky-200 text-sm font-medium", children: "No credit card required • Instant access • Complete privacy" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-[#03045E] py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sky-300 font-bold text-sm", children: "© 2026 HealthAI — Digital Healthcare Analysis & Tracker | Built with React + Django + TensorFlow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sky-400/60 text-xs mt-2", children: "AI-powered suggestions are for guidance only. Always consult a medical professional." })
    ] })
  ] });
}
export {
  Landing as default
};
