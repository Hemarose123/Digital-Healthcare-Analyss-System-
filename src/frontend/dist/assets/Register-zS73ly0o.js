import { r as reactExports, u as useNavigate, a as useHealthStore, j as jsxRuntimeExports, m as motion, A as Activity, U as User, L as Link } from "./index-pQ9MGfeR.js";
import { z as zt } from "./index-L_xsljPV.js";
import { M as Mail, L as Lock } from "./mail-BOo9zrHp.js";
function Register() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const navigate = useNavigate();
  const setAuthenticated = useHealthStore((state) => state.setAuthenticated);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      zt.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isAuth", "true");
      setAuthenticated(true);
      zt.success("Account Created Successfully!");
      navigate({ to: "/onboarding" });
    }, 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-[120px] animate-pulse-slow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-health-200/20 rounded-full blur-[120px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_120px_-20px_rgba(0,119,182,0.15)] overflow-hidden border border-white/50 dark:border-slate-800/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-primary-800 to-primary-950 text-white relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-2 w-16 h-16 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "text-primary-700 w-10 h-10" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-black tracking-tighter uppercase", children: [
                "Health",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-300", children: "AI" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-6xl font-black leading-[1.1] mb-8", children: [
              "Join the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-300", children: "Sanctuary." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-100/80 text-xl font-medium leading-relaxed", children: "Start your journey towards AI-powered precision health monitoring today." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 md:p-20 flex flex-col justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl font-black text-slate-900 dark:text-white mb-3", children: "Create ID Record" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 dark:text-slate-400 font-medium", children: "Join the next generation of clinical healthcare." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "fullName",
                    className: "text-[10px] font-black uppercase tracking-widest text-slate-500",
                    children: "Full Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    User,
                    {
                      className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400",
                      size: 18
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "fullName",
                      type: "text",
                      className: "w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 rounded-[1.5rem] outline-none transition-all",
                      placeholder: "Dr. John Doe",
                      value: fullName,
                      onChange: (e) => setFullName(e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "text-[10px] font-black uppercase tracking-widest text-slate-500",
                    children: "Personnel Email"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Mail,
                    {
                      className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400",
                      size: 18
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "email",
                      type: "email",
                      className: "w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 rounded-[1.5rem] outline-none transition-all",
                      placeholder: "name@healthai.io",
                      value: email,
                      onChange: (e) => setEmail(e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "password",
                    className: "text-[10px] font-black uppercase tracking-widest text-slate-500",
                    children: "Security Phrase"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      className: "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400",
                      size: 18
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "password",
                      type: "password",
                      className: "w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-800/50 border border-slate-200 rounded-[1.5rem] outline-none transition-all",
                      placeholder: "••••••••",
                      value: password,
                      onChange: (e) => setPassword(e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: isLoading,
                  className: "w-full bg-primary-700 hover:bg-primary-800 text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center space-x-3 shadow-lg",
                  children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create Account" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest", children: [
              "Already have an ID?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "text-primary-600 font-black hover:underline",
                  children: "Sign In"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  Register as default
};
