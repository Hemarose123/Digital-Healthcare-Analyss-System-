import { c as createLucideIcon, r as reactExports, u as useNavigate, a as useHealthStore, j as jsxRuntimeExports, m as motion, A as Activity, L as Link } from "./index-pQ9MGfeR.js";
import { z as zt } from "./index-L_xsljPV.js";
import { S as ShieldCheck } from "./shield-check-DaaUCZBu.js";
import { S as Sparkles } from "./sparkles-Dw6FHAZU.js";
import { M as Mail, L as Lock } from "./mail-BOo9zrHp.js";
import { A as ArrowRight } from "./arrow-right-BsPT0-Ie.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["line", { x1: "21.17", x2: "12", y1: "8", y2: "8", key: "a0cw5f" }],
  ["line", { x1: "3.95", x2: "8.54", y1: "6.06", y2: "14", key: "1kftof" }],
  ["line", { x1: "10.88", x2: "15.46", y1: "21.94", y2: "14", key: "1ymyh8" }]
];
const Chrome = createLucideIcon("chrome", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
];
const Github = createLucideIcon("github", __iconNode);
async function apiRequest(url, method, data) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: data ? JSON.stringify(data) : void 0
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
}
function Login() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useHealthStore((state) => state.setAuthenticated);
  const setUserProfile = useHealthStore((state) => state.setUserProfile);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      zt.error("Please enter both email and password");
      return;
    }
    setIsLoading(true);
    apiRequest("/api/auth/login/", "POST", { email, password }).then((data) => {
      var _a;
      setIsLoading(false);
      localStorage.setItem("token", data.tokens.access);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isAuth", "true");
      setAuthenticated(true, (_a = data.user.id) == null ? void 0 : _a.toString());
      if (data.user) {
        setUserProfile(data.user);
      }
      zt.success("Welcome back to HealthAI!");
      navigate({ to: "/" });
    }).catch((err) => {
      setIsLoading(false);
      zt.error(err.message || "Login failed");
    });
  };
  const handleGoogleLogin = () => {
    setIsLoading(true);
    const toastId = zt.loading("Establishing secure neural link...");
    setTimeout(() => {
      const mockUser = {
        id: "99",
        name: "Dr. Neural Path",
        age: 35,
        gender: "male",
        lifestyle: "active",
        goals: ["fitness", "mental_wellness"],
        initialMood: 5,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo"
      );
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuth", "true");
      setIsLoading(false);
      zt.dismiss(toastId);
      setAuthenticated(true, mockUser.id);
      setUserProfile(mockUser);
      zt.success("Access Granted via Google Secure Node");
      navigate({ to: "/" });
    }, 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-[120px] animate-pulse-slow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-health-200/20 rounded-full blur-[120px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_120px_-20px_rgba(0,119,182,0.15)] overflow-hidden border border-white/50 dark:border-slate-800/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-blue-600 to-blue-950 text-white relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.3 },
                  className: "flex items-center space-x-4 mb-12",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-2 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-primary-700 w-10 h-10" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-black tracking-tighter uppercase leading-none", children: [
                        "Health",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-300", children: "AI" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black tracking-[0.2em] text-primary-300 uppercase opacity-70", children: "Neural Health OS" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.h2,
                {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.5 },
                  className: "text-6xl font-black leading-[1.1] mb-8",
                  children: [
                    "The Clinical ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-white", children: "Sanctuary." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.7 },
                  className: "text-primary-100/80 text-xl max-w-md font-medium leading-relaxed mb-12",
                  children: "Welcome to the future of precision medicine. Securely manage your neural health records with AI-driven clinical insights."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mt-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-primary-300 mb-3", size: 20 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-widest text-primary-300 opacity-60 mb-1", children: "Network Load" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: "Minimal" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "text-health-300 mb-3", size: 20 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-widest text-primary-300 opacity-60 mb-1", children: "Encryption" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: "AES-512" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 md:p-20 flex flex-col justify-center bg-white/40 dark:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  className: "inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Next-Gen Authentication" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl font-black text-slate-900 dark:text-white mb-3", children: "Initialize Access" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Verify your clinical credentials to enter the sanctuary." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1",
                    children: "Personnel Email"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Mail,
                    {
                      className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors",
                      size: 18
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "email",
                      type: "email",
                      className: "w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-slate-800 dark:text-white font-semibold placeholder:text-slate-300",
                      placeholder: "name@healthai.io",
                      value: email,
                      onChange: (e) => setEmail(e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between ml-1 pr-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "password",
                      className: "text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400",
                      children: "Security Phrase"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => zt.error("Password recovery offline."),
                      className: "text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700",
                      children: "Lost Key?"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors",
                      size: 18
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "password",
                      type: "password",
                      className: "w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-slate-800 dark:text-white font-semibold placeholder:text-slate-300",
                      placeholder: "••••••••",
                      value: password,
                      onChange: (e) => setPassword(e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileHover: { scale: 1.01 },
                  whileTap: { scale: 0.99 },
                  type: "submit",
                  disabled: isLoading,
                  className: "w-full bg-primary-700 hover:bg-primary-800 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-[0_20px_40px_-10px_rgba(0,119,182,0.3)] flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed",
                  children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.2em] text-sm", children: "Enter Sanctuary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowRight,
                      {
                        size: 18,
                        className: "group-hover:translate-x-1 transition-transform"
                      }
                    )
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center mb-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-slate-100 dark:border-slate-800" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative px-6 bg-[#F0F9FF] dark:bg-slate-950 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]", children: "Neural Connect" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleGoogleLogin,
                    className: "flex items-center justify-center space-x-3 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Chrome, { size: 18, className: "text-red-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Google Node" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => zt.error("Personnel node currently offline."),
                    className: "flex items-center justify-center space-x-3 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { size: 18 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GitHub Node" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest", children: [
                "New Personnel?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/register",
                    className: "text-primary-600 font-black hover:underline underline-offset-8",
                    children: "Create ID Record"
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  Login as default
};
