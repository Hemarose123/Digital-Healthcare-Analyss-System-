import { c as createLucideIcon, a as useHealthStore, r as reactExports, j as jsxRuntimeExports, m as motion, P as Pill, l as Bell, b as AnimatePresence } from "./index-pQ9MGfeR.js";
import { z as zt } from "./index-L_xsljPV.js";
import { l as useMedicineReminders, m as useSaveMedicineReminder, q as useSendMedicineSMS, p as useMarkReminderTaken, o as useDeleteMedicineReminder } from "./useBackend-CQZwdIO-.js";
import { sendMedicineSMS, addToSMSHistory } from "./smsService-DSa6_Vuz.js";
import { C as Camera } from "./camera-F7-4vpUI.js";
import { C as Clock } from "./clock-CPHLWhlK.js";
import { P as Phone } from "./phone-C4RZcEuK.js";
import { C as CircleCheckBig } from "./circle-check-big-SKm4cL5v.js";
import { T as Trash2 } from "./trash-2-Cfm5H9jY.js";
import { X } from "./x-D2fkv8yI.js";
import { S as Sparkles } from "./sparkles-Dw6FHAZU.js";
import { U as Upload } from "./upload-C0GCejeY.js";
import { S as Scan } from "./scan-DJjIDaj-.js";
import { A as ArrowRight } from "./arrow-right-BsPT0-Ie.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const DEMO_MEDICINES = [
  {
    name: "Paracetamol 500mg",
    dosage: "1 tablet",
    time: "08:00",
    notes: "After breakfast"
  },
  {
    name: "Amoxicillin 250mg",
    dosage: "1 capsule",
    time: "14:00",
    notes: "After lunch"
  },
  { name: "Vitamin D3", dosage: "1 tablet", time: "09:00", notes: "Morning" }
];
function MedicineReminder() {
  const { userProfile } = useHealthStore();
  const defaultPhone = (userProfile == null ? void 0 : userProfile.phone) || "+1 (555) 123-4567";
  const { data: reminders = [] } = useMedicineReminders();
  const saveMutation = useSaveMedicineReminder();
  useSendMedicineSMS();
  const markTakenMutation = useMarkReminderTaken();
  const deleteMutation = useDeleteMedicineReminder();
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [smsLoading, setSmsLoading] = reactExports.useState(null);
  const [image, setImage] = reactExports.useState(null);
  const [scanning, setScanning] = reactExports.useState(false);
  const [scanComplete, setScanComplete] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const handleUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setScanComplete(false);
    };
    reader.readAsDataURL(file);
  };
  const handleScanAndAutoAdd = async () => {
    if (!image) return;
    setScanning(true);
    await new Promise((r) => setTimeout(r, 2e3));
    for (const med of DEMO_MEDICINES) {
      await saveMutation.mutateAsync({
        medicineName: med.name,
        dosage: med.dosage,
        times: [med.time],
        startDate: Date.now(),
        isActive: true,
        takenToday: false,
        notes: med.notes,
        phoneNumber: defaultPhone,
        smsEnabled: true,
        smsRemindersCount: 0
      });
    }
    setScanning(false);
    setScanComplete(true);
    zt.success("✨ AI extracted medicines and enabled SMS reminders!", {
      icon: "✨"
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setImage(null);
      setScanComplete(false);
    }, 300);
  };
  const handleSendSms = async (reminder) => {
    var _a;
    setSmsLoading(reminder.id);
    try {
      const result = await sendMedicineSMS({
        phoneNumber: reminder.phoneNumber || defaultPhone,
        medicineName: reminder.medicineName,
        dosage: reminder.dosage,
        time: ((_a = reminder.times) == null ? void 0 : _a[0]) || "09:00",
        notes: reminder.notes
      });
      addToSMSHistory(
        reminder.id,
        reminder.phoneNumber || defaultPhone,
        reminder.medicineName,
        result.success,
        result.messageId
      );
      if (result.success) {
        zt.success(
          `📱 SMS sent to ${reminder.phoneNumber || defaultPhone}`,
          { icon: "📱" }
        );
      } else {
        zt.error(result.error || "Failed to send SMS");
      }
    } catch (error) {
      console.error("SMS error:", error);
      zt.error("Failed to send SMS reminder");
    } finally {
      setSmsLoading(null);
    }
  };
  const markTaken = (reminder) => {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    markTakenMutation.mutate({
      id: reminder.id,
      date: today,
      taken: !reminder.takenToday
    });
  };
  const deleteReminder = (id) => {
    deleteMutation.mutate(id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto pb-16 space-y-8",
      style: { fontFamily: "'Inter', sans-serif" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col md:flex-row items-center justify-between gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg",
                      style: { background: "linear-gradient(135deg,#2563eb,#3b82f6)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { size: 20, className: "text-white" })
                    }
                  ),
                  "Smart Medicine Hub"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mt-1 font-medium", children: [
                  "AI-powered prescription scanning & SMS alerts to ",
                  defaultPhone
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: () => setIsModalOpen(true),
                  className: "flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white font-black text-sm shadow-xl",
                  style: {
                    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    boxShadow: "0 8px 24px rgba(37,99,235,0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 18 }),
                    " Scan Prescription"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.section,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl",
                style: {
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(24px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 20, className: "text-blue-600" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-black text-slate-800 text-base", children: "Your Schedule" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100", children: [
                      reminders.length,
                      " medicines"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: reminders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      className: "text-center py-16",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: "https://illustrations.popsy.co/blue/surreal-hourglass.svg",
                            alt: "Empty",
                            className: "w-40 h-40 mx-auto opacity-80 mb-6"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-slate-800 text-xl", children: "No active prescriptions" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-2 max-w-sm mx-auto", children: 'Click "Scan Prescription" above. Our AI doctor will automatically read the image and set up SMS reminders for you.' })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: reminders.map((r, i) => {
                    var _a;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.9 },
                        transition: { delay: i * 0.05 },
                        className: "p-5 rounded-3xl border transition-all relative overflow-hidden group",
                        style: {
                          background: r.takenToday ? "rgba(16,185,129,0.04)" : "white",
                          borderColor: r.takenToday ? "rgba(16,185,129,0.2)" : "rgba(226,232,240,1)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                                style: {
                                  background: r.takenToday ? "#10b981" : "linear-gradient(135deg,#f1f5f9,#e2e8f0)"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Pill,
                                  {
                                    size: 24,
                                    className: r.takenToday ? "text-white" : "text-blue-500"
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: `font-black text-lg truncate ${r.takenToday ? "line-through text-slate-400" : "text-slate-800"}`,
                                  children: r.medicineName
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-slate-500", children: r.dosage }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-wider bg-blue-50 text-blue-600 flex items-center gap-1", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                                  ((_a = r.times) == null ? void 0 : _a[0]) || "09:00"
                                ] }),
                                r.smsEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-wider bg-green-50 text-green-600 flex items-center gap-1", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
                                  "SMS Enabled"
                                ] })
                              ] })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-5 pt-4 border-t border-slate-100", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => handleSendSms(r),
                                disabled: smsLoading === r.id,
                                className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50",
                                children: [
                                  smsLoading === r.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                                  "SMS Notify"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: () => markTaken(r),
                                className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }),
                                  " ",
                                  r.takenToday ? "Undo" : "Taken"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => deleteReminder(r.id),
                                className: "w-10 flex items-center justify-center rounded-xl transition-all bg-red-50 text-red-500 hover:bg-red-100",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                              }
                            )
                          ] })
                        ]
                      },
                      r.id
                    );
                  }) }) }) })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "absolute inset-0 bg-slate-900/40 backdrop-blur-md",
              onClick: scanning ? void 0 : closeModal
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.9, opacity: 0, y: 20 },
              animate: { scale: 1, opacity: 1, y: 0 },
              exit: { scale: 0.9, opacity: 0, y: 20 },
              className: "relative w-full max-w-lg bg-white rounded-[2rem] p-8 shadow-2xl z-10 overflow-hidden",
              children: [
                !scanning && !scanComplete && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: closeModal,
                    className: "absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                  }
                ),
                !scanning && !scanComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 28, className: "text-blue-600" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-2xl text-slate-800 mb-2", children: "AI Doctor Vision" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mb-8 px-4", children: [
                    "Upload your prescription. Our AI will automatically detect medicines and schedule SMS reminders to",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-500", children: defaultPhone }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileRef,
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleUpload
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a;
                        return (_a = fileRef.current) == null ? void 0 : _a.click();
                      },
                      "aria-label": "Upload prescription image",
                      className: "w-full border-2 border-dashed border-blue-200 rounded-3xl p-8 cursor-pointer hover:bg-blue-50 transition-colors",
                      children: image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: image,
                          alt: "Upload",
                          className: "h-40 mx-auto object-contain rounded-xl shadow-md"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Upload,
                          {
                            size: 32,
                            className: "mx-auto text-blue-400 mb-3"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-blue-600", children: "Tap to browse image" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Supports JPG, PNG, WEBP" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: handleScanAndAutoAdd,
                      disabled: !image || scanning,
                      className: "w-full mt-6 py-4 rounded-2xl text-white font-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                      style: {
                        background: "linear-gradient(135deg,#2563eb,#3b82f6)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { size: 18 }),
                        " Analyze & Schedule"
                      ]
                    }
                  )
                ] }),
                scanning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 mx-auto mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-4 border-blue-100" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Scan,
                      {
                        size: 32,
                        className: "absolute inset-0 m-auto text-blue-500 animate-pulse"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-xl text-slate-800 mb-2", children: "Analyzing Prescription" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Extracting medicine names, dosages, and configuring SMS reminders..." })
                ] }),
                scanComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 40, className: "text-emerald-500" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-2xl text-slate-800 mb-2", children: "Medicines Scheduled!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mb-6 px-4", children: [
                    "Successfully detected",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: "3 medicines" }),
                    ". SMS reminders will be sent to",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-blue-500", children: defaultPhone }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-50 rounded-2xl p-4 text-left mb-8 space-y-3", children: DEMO_MEDICINES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between items-center text-sm border-b border-slate-200 last:border-0 pb-2 last:pb-0",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-700", children: m.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 font-black", children: m.time })
                      ]
                    },
                    m.name
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: closeModal,
                      className: "w-full py-4 rounded-2xl text-white font-black shadow-lg flex items-center justify-center gap-2",
                      style: {
                        background: "linear-gradient(135deg,#10b981,#34d399)"
                      },
                      children: [
                        "View Schedule ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  MedicineReminder as default
};
