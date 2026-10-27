import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  Brain,
  Camera,
  ChevronRight,
  Heart,
  Mic,
  Shield,
  Star,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: "🤒",
    title: "Symptoms Checker",
    desc: "AI-powered natural remedy suggestions for your symptoms.",
    color: "from-rose-400 to-rose-600",
  },
  {
    icon: "🥗",
    title: "Diet Recommendation",
    desc: "Condition-specific diet plans with foods to eat & avoid.",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    icon: "🧘",
    title: "Yoga & Exercise",
    desc: "YouTube-embedded routines for every health condition.",
    color: "from-violet-400 to-violet-600",
  },
  {
    icon: "❤️",
    title: "Health Risk Score",
    desc: "Color-coded risk prediction for diabetes, heart & more.",
    color: "from-red-400 to-red-600",
  },
  {
    icon: "🔬",
    title: "Skin Disease AI",
    desc: "Upload a photo — our CNN model detects skin conditions.",
    color: "from-amber-400 to-amber-600",
  },
  {
    icon: "🩻",
    title: "Medical Imaging",
    desc: "AI analysis of MRI, CT, X-Ray & Ultrasound scans.",
    color: "from-sky-400 to-sky-600",
  },
  {
    icon: "🤖",
    title: "AI Chatbot",
    desc: "Multi-language health chatbot for instant guidance.",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    icon: "🎤",
    title: "Voice Assistant",
    desc: "Speak your health query and get voice + text responses.",
    color: "from-teal-400 to-teal-600",
  },
];

const stats = [
  { value: "17+", label: "AI Features", icon: Zap },
  { value: "98%", label: "Accuracy Rate", icon: Award },
  { value: "50K+", label: "Users Helped", icon: Users },
  { value: "24/7", label: "AI Support", icon: Shield },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 px-8 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_#CAF0F8_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xl text-[#0077B6] text-[10px] font-black tracking-[0.2em] uppercase border border-[#0077B6]/20">
              The Future of Longevity
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-[#03045E] tracking-tighter leading-tight lg:max-w-xl">
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077B6] to-[#00B4D8]">
                AI Health Companion
              </span>
            </h1>
            <p className="text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Track symptoms in real-time, predict metabolic risks with clinical
              precision, and experience a new era of digital diagnostics powered
              by empathetic AI.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/register"
                className="px-10 py-5 bg-[#03045E] text-white rounded-full font-bold text-lg shadow-2xl shadow-navy/30 hover:scale-105 hover:bg-[#0077B6] transition-all duration-300"
              >
                GET STARTED FREE
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 bg-white/40 backdrop-blur-xl text-[#03045E] rounded-full font-bold text-lg hover:bg-white transition-all border border-white"
              >
                SIGN IN
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-5/12 relative">
            <div className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-4 shadow-2xl overflow-hidden group scale-95 xl:scale-100 origin-center border border-white/50">
              <img
                alt="HealthAI Model"
                className="w-full h-auto rounded-[2rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 max-h-[500px] object-cover"
                src="/hero-health.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-[#03045E]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="text-sky-300" size={20} />
                </div>
                <div className="text-4xl font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sky-300 font-bold text-[10px] uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-[#03045E] mb-2">
              17+ AI-Powered Features
            </h2>
            <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
              Everything you need to monitor and improve your health — in one
              smart platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform shadow-md`}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-black text-slate-800 mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Immersive How It Works */}
      <div className="relative pt-10 pb-12 overflow-hidden bg-[#f4faff]">
        {/* Immersive Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#50d9fe]/20 blur-[80px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[#005d90]/10 blur-[80px]" />
          <div className="absolute top-[20%] left-[20%] w-px h-px shadow-[0_0_200px_100px_rgba(255,255,255,0.8)] opacity-50" />
        </div>

        {/* Hero Section */}
        <section className="max-w-screen-xl mx-auto px-12 text-center mb-8 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-[#b3ebff]/30 text-[#004e5f] text-[10px] font-bold tracking-widest uppercase mb-3">
            Process
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#141d21] tracking-tighter mb-2 leading-tight">
            How It Works
          </h1>
          <p className="text-base text-[#404850] font-medium max-w-xl mx-auto">
            Experience the fusion of biological data and editorial intelligence
            in 3 steps.
          </p>
        </section>

        {/* Core Steps Layout */}
        <section className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-10">
          {/* Step 01 */}
          <div
            className="rounded-xl p-5 flex flex-col items-start relative group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_rgba(0,93,144,0.05)] border border-white/40"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="h-1 w-16 bg-gradient-to-r from-[#00677d] to-[#50d9fe] absolute top-0 left-6 rounded-b-full" />
            <div className="text-[#404850]/15 font-black text-4xl mb-2">01</div>
            <div className="w-10 h-10 rounded-lg bg-[#e0e9ef] flex items-center justify-center mb-3 shadow-inner">
              <span className="material-symbols-outlined text-[#005d90] text-2xl">
                clinical_notes
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#141d21] mb-2">Profile</h3>
            <p className="text-[#404850] leading-relaxed text-sm mb-4">
              Build a secure digital twin of your biology.
            </p>
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2 text-[#005d90] font-bold text-sm tracking-wide group-hover:gap-4 transition-all">
                LEARN MORE{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <img
                alt="Step 1 Visual"
                className="w-full h-full object-contain mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAQDFfDLykP83MAXS67O7Wq5Gfh6PlP0A5AlxHVvl9kPyFMrKGaPFXQozcfVm0f3xfq3ZKb7rczwYIvEPXnO8G_hlADfT8S0l-KRkgUG59OkyWIflHLJjBJu0l4-37sThF2ziR987ZdB9lrrkK-ynhWGP_Da7tYgQDAbJFfnsM_PCm5eZJrCk-3kHKYmr0fF6EpxJlOCWpSENKwMXANaX6vPMeIhzL719zE9t8G-t7q0YnHFTr8vrLeM2PcSr6XLXwd9oRelQzGYOj"
              />
            </div>
          </div>

          {/* Step 02 */}
          <div
            className="rounded-xl p-5 flex flex-col items-start relative group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_rgba(0,93,144,0.08)] border border-white/60"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="h-1 w-16 bg-gradient-to-r from-[#005d90] to-[#0077b6] absolute top-0 left-6 rounded-b-full" />
            <div className="text-[#404850]/15 font-black text-4xl mb-2">02</div>
            <div className="w-10 h-10 rounded-lg bg-[#cde5ff] flex items-center justify-center mb-3 shadow-inner">
              <span className="material-symbols-outlined text-[#005d90] text-2xl">
                smart_toy
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#141d21] mb-2">Analysis</h3>
            <p className="text-[#404850] leading-relaxed text-sm mb-4">
              Advanced model identifies patterns in your vitals.
            </p>
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2 text-[#005d90] font-bold text-sm tracking-wide group-hover:gap-4 transition-all">
                AI STANDARDS{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
              <img
                alt="Step 2 Visual"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS_YJHgeNRAB3PRFXlReOuLIKoUw7jyBEu83quSYt7TJIul87-Mb5C75eGqYt2kpq8q2urWOSje4ISPBZ67QjAWYAR4G7_At-HxyLF46aCyzJky4mO4Q7j9_TayUqyFUKkP1dMp3CXqPUxbRR0eufwgbACavaeunp8myqm3DAdq6RrNLahJ7pyGgW3SgX3rRkGiCUkxS53O2wZzGsF84GswBDJtpXjIv7jUNUUfPyIN2aPSnwIu7mAZJdFlPW9tMTozHQEiZuYLkcp"
              />
            </div>
          </div>

          {/* Step 03 */}
          <div
            className="rounded-xl p-5 flex flex-col items-start relative group hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_rgba(0,93,144,0.05)] border border-white/40"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="h-1 w-16 bg-gradient-to-r from-[#006644] to-[#92f7c3] absolute top-0 left-6 rounded-b-full" />
            <div className="text-[#404850]/15 font-black text-4xl mb-2">03</div>
            <div className="w-10 h-10 rounded-lg bg-[#e0e9ef] flex items-center justify-center mb-3 shadow-inner">
              <span className="material-symbols-outlined text-[#005d90] text-2xl">
                lightbulb
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#141d21] mb-2">Insights</h3>
            <p className="text-[#404850] leading-relaxed text-sm mb-4">
              Daily reports with actionable biological advice.
            </p>
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2 text-[#005d90] font-bold text-sm tracking-wide group-hover:gap-4 transition-all">
                VIEW SAMPLE{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <img
                alt="Step 3 Visual"
                className="w-full h-full object-contain mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAFFC7r6fWDBaQNVSSEKd5OxQ4ODjonXhkjHG9aQD7BEFe-0PqTxIlhvGo87xQow6v9UPYFeFMPSKsCa4y3p7CB8h1Pxa8MqJMmmEoyQpbkw6SGw6s4cOHIFVC5S3huGhLAUhx9QrIJf50ntIPajQLmu7tmU9QzewLIFs_tjOuJfbtOKC4yBA1uPf0memrMaKoRLTq47IrlzROlrE9J0FGN9HWRBS1CnA1HOrRMlldjfvnvBOCae9bqquJg3WSJiWiFsR4X57tvTev"
              />
            </div>
          </div>
        </section>

        {/* Content Showcase (Editorial Style) */}
        <section className="w-full bg-[#ecf5fb] py-16 px-12 relative z-10">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img
                  alt="Platform Showcase"
                  className="w-full rounded-xl shadow-2xl relative z-10 border border-white/50"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfJT44f3rN0eRlZbjCqYJ5pZtmMfuMD5s1k109AJzAnWGt6x0Y2zD0dUxGQzHkfVnUDhDFvw3gZ9jQdn_5-NJara5lylA11-V3uW8lfQDPA02mscdG4zbhSCSKzba8496UFhsL5ZneazpwAYlUWkLsJ9wBt4VvhP5upTKwmuNM9zRYT_TVifGV1YRs7O5M9ljaTXauaDRv402D_0gwRRBYbO20yR20BbsBuHLFg6XUX0qkHrAw5viQg9ye-SeSgpP32evemOQvQSzJ"
                />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00677d]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#005d90]/10 rounded-full blur-3xl" />
              </div>
            </div>
            <div className="w-full md:w-5/12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#141d21] leading-tight">
                Biological Data,
                <br />
                <span className="text-[#005d90]">Beautifully Narrated.</span>
              </h2>
              <p className="text-lg text-[#404850] leading-relaxed">
                Fluid Health doesn't just show you numbers. We curate your
                biological data into a daily editorial experience. Understand
                your circadian rhythm, cardiovascular efficiency, and metabolic
                trends through high-scale visualizations and clinical
                narratives.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-[#141d21] font-semibold text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#92f7c3] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#005235] text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </span>
                  Real-time biometric streaming
                </li>
                <li className="flex items-center gap-4 text-[#141d21] font-semibold text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#92f7c3] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#005235] text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </span>
                  Predictive health modeling
                </li>
                <li className="flex items-center gap-4 text-[#141d21] font-semibold text-lg">
                  <span className="w-8 h-8 rounded-full bg-[#92f7c3] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#005235] text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </span>
                  HIPAA-compliant data encryption
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-[#0077B6] to-[#03045E] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-4xl font-black text-white mb-6">
            Start Your Health Journey
          </h2>
          <p className="text-lg text-sky-100 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who trust HealthAI for daily health
            monitoring, AI-powered insights, and personalized wellness guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group flex items-center justify-center gap-3 bg-white text-[#0077B6] font-black text-lg px-10 py-5 rounded-2xl hover:bg-sky-50 transition-all shadow-2xl hover:-translate-y-1"
            >
              Create Free Account
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          <p className="mt-6 text-sky-200 text-sm font-medium">
            No credit card required • Instant access • Complete privacy
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#03045E] py-10 text-center">
        <p className="text-sky-300 font-bold text-sm">
          © 2026 HealthAI — Digital Healthcare Analysis & Tracker | Built with
          React + Django + TensorFlow
        </p>
        <p className="text-sky-400/60 text-xs mt-2">
          AI-powered suggestions are for guidance only. Always consult a medical
          professional.
        </p>
      </footer>
    </div>
  );
}
