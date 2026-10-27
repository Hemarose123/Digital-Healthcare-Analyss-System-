import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as cn, B as Button, m as motion, b as AnimatePresence, l as Bell, n as Input, f as ue } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { C as Card } from "./card-Diso-OOn.js";
import { P as Primitive } from "./index-BIxCvO3c.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CK-ODLGS.js";
import { l as useMedicineReminders, m as useSaveMedicineReminder, n as useUpdateMedicineReminder, c as useAddTimelineEvent, o as useDeleteMedicineReminder, p as useMarkReminderTaken } from "./useBackend-CQZwdIO-.js";
import { P as Plus } from "./plus-DzAklDcf.js";
import { X } from "./x-D2fkv8yI.js";
import { C as Check } from "./check-CqXS_8kJ.js";
import { C as CircleCheck } from "./circle-check-CYRVmAgy.js";
import { C as Clock } from "./clock-CPHLWhlK.js";
import { P as PenLine } from "./pen-line-Ds-M6Sej.js";
import { T as Trash2 } from "./trash-2-Cfm5H9jY.js";
import "./index-CH17oBHD.js";
import "./index-B8fHxaj2.js";
import "./index-ObNJZL0i.js";
import "./chevron-down-C_l-fhry.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
];
const BellRing = createLucideIcon("bell-ring", __iconNode);
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const FREQUENCY_OPTIONS = [
  { value: "once_daily", label: "Once daily" },
  { value: "twice_daily", label: "Twice daily" },
  { value: "three_times_daily", label: "Three times daily" },
  { value: "every_4_hours", label: "Every 4 hours" },
  { value: "as_needed", label: "As needed" }
];
const TIME_PRESETS = [
  { value: "08:00", label: "Morning 8:00 AM" },
  { value: "12:00", label: "Afternoon 12:00 PM" },
  { value: "18:00", label: "Evening 6:00 PM" },
  { value: "22:00", label: "Bedtime 10:00 PM" },
  { value: "custom", label: "Custom time…" }
];
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") ue.success("Notifications enabled!");
    });
  }
}
function getReminderStatus(reminder) {
  if (!reminder) return { label: "Unknown", color: "secondary" };
  if (reminder.takenToday) return { label: "Taken Today", color: "success" };
  const now = /* @__PURE__ */ new Date();
  const times = Array.isArray(reminder.times) ? reminder.times : [];
  const timeValue = typeof times[0] === "string" ? times[0] : "08:00";
  const parts = timeValue.split(":");
  const h = Number.parseInt(parts[0] ?? "8", 10) || 8;
  const m = Number.parseInt(parts[1] ?? "0", 10) || 0;
  const dueTime = /* @__PURE__ */ new Date();
  dueTime.setHours(h, m, 0, 0);
  const diffMs = dueTime.getTime() - now.getTime();
  const diffHours = diffMs / (1e3 * 60 * 60);
  if (diffMs < -30 * 60 * 1e3)
    return { label: "Overdue", color: "destructive" };
  if (diffHours <= 0.5 && diffMs > 0)
    return { label: "Due Now", color: "warning" };
  if (diffHours > 0 && diffHours <= 2)
    return {
      label: `Due in ${Math.ceil(diffHours * 60)}m`,
      color: "secondary"
    };
  if (diffHours > 2)
    return { label: `Due in ${Math.floor(diffHours)}h`, color: "secondary" };
  return { label: "Scheduled", color: "secondary" };
}
function formatTime(time) {
  const parts = time.split(":");
  const h = Number.parseInt(parts[0] ?? "8", 10);
  const m = Number.parseInt(parts[1] ?? "0", 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}
function StatusBadge({ color, label }) {
  const styles = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    secondary: "bg-secondary text-secondary-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[color]}`,
      children: label
    }
  );
}
function ReminderForm({ editTarget, onClose }) {
  const saveReminder = useSaveMedicineReminder();
  const updateReminder = useUpdateMedicineReminder();
  const addTimeline = useAddTimelineEvent();
  const [form, setForm] = reactExports.useState(() => {
    if (editTarget) {
      const times = Array.isArray(editTarget.times) ? editTarget.times : [];
      const t = typeof times[0] === "string" ? times[0] : "08:00";
      const preset = TIME_PRESETS.find(
        (p) => p.value === t && p.value !== "custom"
      );
      return {
        medicineName: editTarget.medicineName || "",
        dosage: editTarget.dosage || "",
        frequency: editTarget.notes || "once_daily",
        timePreset: preset ? t : "custom",
        customTime: preset ? "" : t
      };
    }
    return {
      medicineName: "",
      dosage: "",
      frequency: "once_daily",
      timePreset: "08:00",
      customTime: ""
    };
  });
  const [errors, setErrors] = reactExports.useState({});
  function validate() {
    const e = {};
    if (!form.medicineName.trim()) e.medicineName = "Medicine name is required";
    if (!form.dosage.trim()) e.dosage = "Dosage is required";
    if (form.timePreset === "custom" && !form.customTime)
      e.customTime = "Please enter a time";
    return e;
  }
  async function handleSubmit(e) {
    var _a;
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const timeValue = form.timePreset === "custom" ? form.customTime : form.timePreset;
    const freqLabel = ((_a = FREQUENCY_OPTIONS.find((f) => f.value === form.frequency)) == null ? void 0 : _a.label) ?? form.frequency;
    requestNotificationPermission();
    if (editTarget) {
      await updateReminder.mutateAsync({
        ...editTarget,
        medicineName: form.medicineName,
        dosage: form.dosage,
        times: [timeValue],
        notes: form.frequency
      });
    } else {
      await saveReminder.mutateAsync({
        medicineName: form.medicineName,
        dosage: form.dosage,
        times: [timeValue],
        startDate: Date.now(),
        isActive: true,
        takenToday: false,
        notes: form.frequency,
        smsEnabled: false,
        smsRemindersCount: 0
      });
      await addTimeline.mutateAsync({
        type: "reminder",
        title: `💊 New Reminder: ${form.medicineName}`,
        description: `${form.dosage} — ${freqLabel} at ${formatTime(timeValue)}`
      });
    }
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.25 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "bg-card border-border shadow-elevated p-5",
          "data-ocid": "reminders.form.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "w-4 h-4 text-amber-500" }),
                editTarget ? "Edit Reminder" : "Add New Reminder"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7",
                  onClick: onClose,
                  "data-ocid": "reminders.form.close_button",
                  "aria-label": "Close form",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "medicineName", className: "text-sm font-medium", children: [
                  "Medicine Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "medicineName",
                    value: form.medicineName,
                    onChange: (e) => setForm((p) => ({ ...p, medicineName: e.target.value })),
                    placeholder: "e.g. Metformin, Aspirin, Vitamin D",
                    className: "h-10",
                    "data-ocid": "reminders.medicine_name.input"
                  }
                ),
                errors.medicineName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "reminders.medicine_name.field_error",
                    children: errors.medicineName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "dosage", className: "text-sm font-medium", children: [
                  "Dosage ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "dosage",
                    value: form.dosage,
                    onChange: (e) => setForm((p) => ({ ...p, dosage: e.target.value })),
                    placeholder: "e.g. 500mg, 1 tablet, 2 capsules",
                    className: "h-10",
                    "data-ocid": "reminders.dosage.input"
                  }
                ),
                errors.dosage && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "reminders.dosage.field_error",
                    children: errors.dosage
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Frequency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.frequency,
                      onValueChange: (v) => setForm((p) => ({ ...p, frequency: v })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-10",
                            "data-ocid": "reminders.frequency.select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FREQUENCY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Time of Day" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.timePreset,
                      onValueChange: (v) => setForm((p) => ({ ...p, timePreset: v, customTime: "" })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-10",
                            "data-ocid": "reminders.time.select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_PRESETS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                      ]
                    }
                  )
                ] })
              ] }),
              form.timePreset === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customTime", className: "text-sm font-medium", children: "Custom Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "customTime",
                    type: "time",
                    value: form.customTime,
                    onChange: (e) => setForm((p) => ({ ...p, customTime: e.target.value })),
                    className: "h-10",
                    "data-ocid": "reminders.time.input"
                  }
                ),
                errors.customTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "reminders.time.field_error",
                    children: errors.customTime
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1 h-10 text-white border-0",
                    style: {
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                    },
                    disabled: saveReminder.isPending || updateReminder.isPending,
                    "data-ocid": "reminders.form.submit_button",
                    children: editTarget ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
                      " Update Reminder"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                      " Add Reminder"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "h-10 px-4",
                    onClick: onClose,
                    "data-ocid": "reminders.form.cancel_button",
                    children: "Cancel"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function ReminderCard({ reminder, index, onEdit }) {
  var _a;
  const deleteReminder = useDeleteMedicineReminder();
  const markTaken = useMarkReminderTaken();
  const status = getReminderStatus(reminder);
  const times = Array.isArray(reminder.times) ? reminder.times : [];
  const timeStr = formatTime(typeof times[0] === "string" ? times[0] : "08:00");
  const freqLabel = ((_a = FREQUENCY_OPTIONS.find((f) => f.value === reminder.notes)) == null ? void 0 : _a.label) ?? reminder.notes ?? "Once daily";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 12, scale: 0.95 },
      transition: { duration: 0.25, delay: index * 0.04 },
      "data-ocid": `reminders.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `bg-card border-border shadow-subtle p-4 transition-smooth hover:shadow-elevated ${reminder.takenToday ? "opacity-70" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                  style: {
                    background: reminder.takenToday ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  },
                  children: reminder.takenToday ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: reminder.medicineName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { color: status.color, label: status.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                  reminder.dosage,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 text-border", children: "·" }),
                  freqLabel
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  timeStr
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              !reminder.takenToday && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
                  onClick: () => markTaken.mutate({
                    id: reminder.id,
                    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                    taken: true
                  }),
                  "aria-label": "Mark as taken",
                  "data-ocid": `reminders.taken_${index + 1}.toggle`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-muted-foreground hover:text-primary",
                  onClick: () => onEdit(reminder),
                  "aria-label": "Edit reminder",
                  "data-ocid": `reminders.edit_${index + 1}.edit_button`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                  onClick: () => deleteReminder.mutate(reminder.id),
                  "aria-label": "Delete reminder",
                  "data-ocid": `reminders.delete_${index + 1}.delete_button`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
function RemindersPage() {
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const { data: reminders = [] } = useMedicineReminders();
  const activeReminders = reminders.filter((r) => r.isActive);
  const takenCount = activeReminders.filter((r) => r.takenToday).length;
  function openAdd() {
    setEditTarget(null);
    setShowForm(true);
  }
  function openEdit(r) {
    setEditTarget(r);
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setEditTarget(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "reminders.page",
      className: "max-w-2xl mx-auto px-4 py-6 space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground", children: [
              "Medicine",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "bg-clip-text text-transparent",
                  style: {
                    backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  },
                  children: "Reminders"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Stay on track with your medication schedule" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: openAdd,
              className: "gap-2 text-white border-0",
              style: {
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
              },
              "data-ocid": "reminders.add.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add Reminder" })
              ]
            }
          )
        ] }),
        activeReminders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-subtle p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Today's Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
              takenCount,
              " of ",
              activeReminders.length,
              " taken"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full",
                style: {
                  background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)"
                },
                initial: { width: 0 },
                animate: {
                  width: `${activeReminders.length > 0 ? takenCount / activeReminders.length * 100 : 0}%`
                },
                transition: { duration: 0.6, ease: "easeOut" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right mt-0.5", children: [
              activeReminders.length > 0 ? Math.round(takenCount / activeReminders.length * 100) : 0,
              "%"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(ReminderForm, { editTarget, onClose: closeForm }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "w-4 h-4 text-amber-500" }),
            "Upcoming Reminders",
            activeReminders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs ml-1", children: activeReminders.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: activeReminders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              "data-ocid": "reminders.list.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-muted/30 border-border/60 border-dashed p-10 flex flex-col items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                    style: {
                      background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-amber-600" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No reminders yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Add your first medicine reminder to stay on top of your health routine." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: openAdd,
                    variant: "outline",
                    className: "gap-2 mt-1",
                    "data-ocid": "reminders.empty.open_modal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      " Add First Reminder"
                    ]
                  }
                )
              ] })
            },
            "empty"
          ) : activeReminders.map((reminder, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReminderCard,
            {
              reminder,
              index: idx,
              onEdit: openEdit
            },
            reminder.id
          )) })
        ] })
      ]
    }
  );
}
export {
  RemindersPage as default
};
