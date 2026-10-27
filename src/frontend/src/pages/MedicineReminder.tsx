import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Camera,
  CheckCircle,
  Clock,
  Phone,
  Pill,
  Plus,
  RefreshCw,
  Scan,
  Send,
  Sparkles,
  Trash2,
  Upload,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteMedicineReminder,
  useMarkReminderTaken,
  useMedicineReminders,
  useSaveMedicineReminder,
  useSendMedicineSMS,
} from "../hooks/useBackend";
import { addToSMSHistory, sendMedicineSMS } from "../services/smsService";
import { useHealthStore } from "../store/useHealthStore";

const DEMO_MEDICINES = [
  {
    name: "Paracetamol 500mg",
    dosage: "1 tablet",
    time: "08:00",
    notes: "After breakfast",
  },
  {
    name: "Amoxicillin 250mg",
    dosage: "1 capsule",
    time: "14:00",
    notes: "After lunch",
  },
  { name: "Vitamin D3", dosage: "1 tablet", time: "09:00", notes: "Morning" },
];

const _uid = () => Math.random().toString(36).slice(2, 9);

export default function MedicineReminder() {
  const { userProfile } = useHealthStore();
  const defaultPhone = userProfile?.phone || "+1 (555) 123-4567";

  const { data: reminders = [] } = useMedicineReminders();
  const saveMutation = useSaveMedicineReminder();
  const _smsMutation = useSendMedicineSMS();
  const markTakenMutation = useMarkReminderTaken();
  const deleteMutation = useDeleteMedicineReminder();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [smsLoading, setSmsLoading] = useState<string | null>(null);

  /* Modal State */
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Upload & Scan (Automatic flow) ── */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setScanComplete(false);
    };
    reader.readAsDataURL(file);
  };

  const handleScanAndAutoAdd = async () => {
    if (!image) return;
    setScanning(true);

    // Simulate AI prediction (2 seconds)
    await new Promise((r) => setTimeout(r, 2000));

    // Automatically add the detected medicines with SMS enabled
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
        smsRemindersCount: 0,
      });
    }

    setScanning(false);
    setScanComplete(true);
    toast.success("✨ AI extracted medicines and enabled SMS reminders!", {
      icon: "✨",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setImage(null);
      setScanComplete(false);
    }, 300);
  };

  /* ── SMS & Actions ── */
  const handleSendSms = async (reminder: any) => {
    setSmsLoading(reminder.id);
    try {
      const result = await sendMedicineSMS({
        phoneNumber: reminder.phoneNumber || defaultPhone,
        medicineName: reminder.medicineName,
        dosage: reminder.dosage,
        time: reminder.times?.[0] || "09:00",
        notes: reminder.notes,
      });

      addToSMSHistory(
        reminder.id,
        reminder.phoneNumber || defaultPhone,
        reminder.medicineName,
        result.success,
        result.messageId,
      );

      if (result.success) {
        toast.success(
          `📱 SMS sent to ${reminder.phoneNumber || defaultPhone}`,
          { icon: "📱" },
        );
      } else {
        toast.error(result.error || "Failed to send SMS");
      }
    } catch (error) {
      console.error("SMS error:", error);
      toast.error("Failed to send SMS reminder");
    } finally {
      setSmsLoading(null);
    }
  };

  const markTaken = (reminder: any) => {
    const today = new Date().toISOString().split("T")[0];
    markTakenMutation.mutate({
      id: reminder.id,
      date: today,
      taken: !reminder.takenToday,
    });
  };

  const deleteReminder = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div
      className="max-w-6xl mx-auto pb-16 space-y-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}
            >
              <Pill size={20} className="text-white" />
            </div>
            Smart Medicine Hub
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            AI-powered prescription scanning & SMS alerts to {defaultPhone}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white font-black text-sm shadow-xl"
          style={{
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
          }}
        >
          <Camera size={18} /> Scan Prescription
        </motion.button>
      </motion.div>

      {/* ── Active Reminders List ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className="rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl"
          style={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Bell size={20} className="text-blue-600" />
            <h2 className="font-black text-slate-800 text-base">
              Your Schedule
            </h2>
            <span className="ml-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100">
              {reminders.length} medicines
            </span>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence>
              {reminders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <img
                    src="https://illustrations.popsy.co/blue/surreal-hourglass.svg"
                    alt="Empty"
                    className="w-40 h-40 mx-auto opacity-80 mb-6"
                  />
                  <p className="font-black text-slate-800 text-xl">
                    No active prescriptions
                  </p>
                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                    Click "Scan Prescription" above. Our AI doctor will
                    automatically read the image and set up SMS reminders for
                    you.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reminders.map((r: any, i: number) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-3xl border transition-all relative overflow-hidden group"
                      style={{
                        background: r.takenToday
                          ? "rgba(16,185,129,0.04)"
                          : "white",
                        borderColor: r.takenToday
                          ? "rgba(16,185,129,0.2)"
                          : "rgba(226,232,240,1)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      }}
                    >
                      <div className="flex gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                          style={{
                            background: r.takenToday
                              ? "#10b981"
                              : "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
                          }}
                        >
                          <Pill
                            size={24}
                            className={
                              r.takenToday ? "text-white" : "text-blue-500"
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-black text-lg truncate ${r.takenToday ? "line-through text-slate-400" : "text-slate-800"}`}
                          >
                            {r.medicineName}
                          </p>
                          <p className="text-sm font-semibold text-slate-500">
                            {r.dosage}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-wider bg-blue-50 text-blue-600 flex items-center gap-1">
                              <Clock size={10} />
                              {r.times?.[0] || "09:00"}
                            </span>
                            {r.smsEnabled && (
                              <span className="text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-wider bg-green-50 text-green-600 flex items-center gap-1">
                                <Phone size={10} />
                                SMS Enabled
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleSendSms(r)}
                          disabled={smsLoading === r.id}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
                        >
                          {smsLoading === r.id ? (
                            <RefreshCw size={12} className="animate-spin" />
                          ) : (
                            <Phone size={12} />
                          )}
                          SMS Notify
                        </button>
                        <button
                          type="button"
                          onClick={() => markTaken(r)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        >
                          <CheckCircle size={12} />{" "}
                          {r.takenToday ? "Undo" : "Taken"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteReminder(r.id)}
                          className="w-10 flex items-center justify-center rounded-xl transition-all bg-red-50 text-red-500 hover:bg-red-100"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ── UPLOAD MODAL (AI Prediction) ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={scanning ? undefined : closeModal}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 shadow-2xl z-10 overflow-hidden"
            >
              {!scanning && !scanComplete && (
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={16} />
                </button>
              )}

              {/* State 1: Upload */}
              {!scanning && !scanComplete && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={28} className="text-blue-600" />
                  </div>
                  <h3 className="font-black text-2xl text-slate-800 mb-2">
                    AI Doctor Vision
                  </h3>
                  <p className="text-sm text-slate-500 mb-8 px-4">
                    Upload your prescription. Our AI will automatically detect
                    medicines and schedule SMS reminders to{" "}
                    <span className="font-bold text-blue-500">
                      {defaultPhone}
                    </span>
                    .
                  </p>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    aria-label="Upload prescription image"
                    className="w-full border-2 border-dashed border-blue-200 rounded-3xl p-8 cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Upload"
                        className="h-40 mx-auto object-contain rounded-xl shadow-md"
                      />
                    ) : (
                      <div className="py-6">
                        <Upload
                          size={32}
                          className="mx-auto text-blue-400 mb-3"
                        />
                        <p className="font-bold text-blue-600">
                          Tap to browse image
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Supports JPG, PNG, WEBP
                        </p>
                      </div>
                    )}
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleScanAndAutoAdd}
                    disabled={!image || scanning}
                    className="w-full mt-6 py-4 rounded-2xl text-white font-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                    }}
                  >
                    <Scan size={18} /> Analyze & Schedule
                  </motion.button>
                </div>
              )}

              {/* State 2: Scanning */}
              {scanning && (
                <div className="text-center py-12">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                    <Scan
                      size={32}
                      className="absolute inset-0 m-auto text-blue-500 animate-pulse"
                    />
                  </div>
                  <h3 className="font-black text-xl text-slate-800 mb-2">
                    Analyzing Prescription
                  </h3>
                  <p className="text-sm text-slate-500">
                    Extracting medicine names, dosages, and configuring SMS
                    reminders...
                  </p>
                </div>
              )}

              {/* State 3: Success */}
              {scanComplete && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="font-black text-2xl text-slate-800 mb-2">
                    Medicines Scheduled!
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 px-4">
                    Successfully detected{" "}
                    <span className="font-bold text-slate-800">
                      3 medicines
                    </span>
                    . SMS reminders will be sent to{" "}
                    <span className="font-bold text-blue-500">
                      {defaultPhone}
                    </span>
                    .
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-4 text-left mb-8 space-y-3">
                    {DEMO_MEDICINES.map((m) => (
                      <div
                        key={m.name}
                        className="flex justify-between items-center text-sm border-b border-slate-200 last:border-0 pb-2 last:pb-0"
                      >
                        <span className="font-bold text-slate-700">
                          {m.name}
                        </span>
                        <span className="text-blue-600 font-black">
                          {m.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeModal}
                    className="w-full py-4 rounded-2xl text-white font-black shadow-lg flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg,#10b981,#34d399)",
                    }}
                  >
                    View Schedule <ArrowRight size={18} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
