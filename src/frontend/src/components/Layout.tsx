import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  MessageSquare,
  Mic,
  Pill,
  ScanFace,
  Search,
  ShieldAlert,
  Stethoscope,
  User,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { useHealthStore } from "../store/useHealthStore";
import { ROUTES } from "../types/health";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  keywords?: string[];
}
const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: <LayoutDashboard size={20} />,
    keywords: ["home", "main", "overview", "stats"],
  },
  {
    label: "AI Symptoms",
    path: ROUTES.SYMPTOMS,
    icon: <Stethoscope size={20} />,
    keywords: ["doctor", "check", "sickness", "diagnosis"],
  },
  {
    label: "Skin Analysis",
    path: ROUTES.SKIN,
    icon: <ScanFace size={20} />,
    keywords: ["face", "acne", "dermatology", "photo"],
  },
  {
    label: "Medical Imaging",
    path: ROUTES.MEDICAL_IMAGING,
    icon: <ImageIcon size={20} />,
    keywords: ["xray", "mri", "scan", "upload"],
  },
  {
    label: "Voice Assistant",
    path: ROUTES.VOICE,
    icon: <Mic size={20} />,
    keywords: ["speak", "talk", "ai", "audio", "voice"],
  },
  {
    label: "Health Risk",
    path: "/health-risk",
    icon: <ShieldAlert size={20} />,
    keywords: ["risk", "danger", "bmi", "biological age"],
  },
  {
    label: "DR.AI Chatbot",
    path: ROUTES.CHATBOT,
    icon: <MessageSquare size={20} />,
    keywords: ["help", "support", "talk", "question", "dr ai", "dra i"],
  },
  {
    label: "Mood",
    path: ROUTES.MOOD,
    icon: <Heart size={20} />,
    keywords: ["feelings", "mental", "happy", "sad"],
  },
  {
    label: "Diet & Nutrition",
    path: "/diet",
    icon: <Utensils size={20} />,
    keywords: ["food", "meal", "calories", "recipe"],
  },
  {
    label: "Exercise & Yoga",
    path: "/exercise",
    icon: <Activity size={20} />,
    keywords: ["workout", "fitness", "yoga", "gym"],
  },
  {
    label: "Medicine Reminder",
    path: "/medicine-reminder",
    icon: <Pill size={20} />,
    keywords: ["pill", "drugs", "schedule", "alarm"],
  },
  {
    label: "Health Tips",
    path: "/health-tips",
    icon: <Lightbulb size={20} />,
    keywords: ["advice", "learn", "information", "wellness"],
  },
  {
    label: "Timeline",
    path: ROUTES.TIMELINE,
    icon: <Calendar size={20} />,
    keywords: ["history", "events", "past", "schedule"],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <User size={20} />,
    keywords: ["account", "settings", "me", "personal"],
  },
];

function NavLink({
  item,
  isCollapsed,
  onClick,
}: {
  item: NavItem;
  isCollapsed: boolean;
  onClick?: () => void;
}) {
  const routerState = useRouterState();
  const isActive = routerState.location.pathname === item.path;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      data-ocid={`nav.${item.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
        isActive
          ? "bg-white/15 text-white shadow-lg"
          : "text-white/60 hover:text-white hover:bg-white/10",
        isCollapsed && "justify-center px-2",
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 transition-transform",
          isActive && "scale-110",
        )}
      >
        {item.icon}
      </span>
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { userProfile, logout } = useHealthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-body selection:bg-primary/20">
      {/* Sidebar - Dark Navy */}
      <aside
        className={cn(
          "bg-[#0a1e3d] flex flex-col fixed h-full z-40 shadow-2xl transition-all duration-500 ease-in-out group",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        {/* Brand */}
        <div
          className={cn(
            "p-8 flex items-center gap-3 transition-all duration-500",
            isCollapsed && "p-6 justify-center",
          )}
        >
          <div className="w-11 h-11 flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="HealthAI Logo"
              className="w-full h-full object-contain transition-transform hover:scale-110 duration-300"
            />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-display font-bold text-white tracking-widest uppercase animate-in fade-in slide-in-from-left-2">
              Healthcare
            </span>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 hover:scale-110 transition-transform z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-none">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} item={item} isCollapsed={isCollapsed} />
          ))}

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full mt-2",
              "text-red-400/80 hover:text-red-400 hover:bg-red-400/10",
              isCollapsed && "justify-center px-2",
            )}
          >
            <span className={cn("flex-shrink-0 transition-transform")}>
              <LogOut size={20} />
            </span>
            {!isCollapsed && <span className="truncate">Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out",
          isCollapsed ? "ml-20" : "ml-64",
        )}
      >
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between bg-transparent relative z-30">
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
            <Input
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const filtered = NAV_ITEMS.filter(
                    (item) =>
                      item.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.keywords?.some((k) =>
                        k.toLowerCase().includes(searchQuery.toLowerCase()),
                      ),
                  );
                  if (filtered.length > 0) {
                    navigate({ to: filtered[0].path });
                    setSearchQuery("");
                    setIsSearchFocused(false);
                  }
                }
              }}
              className="pl-11 h-11 bg-white border-0 shadow-sm rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 transition-all relative z-0"
            />

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 0 && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSearchFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setIsSearchFocused(false);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close search"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-3"
                  >
                    <div className="px-4 py-2 border-b border-slate-50 mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Quick Results
                      </p>
                    </div>
                    <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                      {(() => {
                        const filtered = NAV_ITEMS.filter(
                          (item) =>
                            item.label
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            item.keywords?.some((k) =>
                              k
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()),
                            ),
                        );

                        if (filtered.length > 0) {
                          return filtered.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => {
                                setSearchQuery("");
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                {item.icon}
                              </div>
                              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          ));
                        }

                        return (
                          <div className="p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
                              <Search className="w-6 h-6 text-slate-300" />
                            </div>
                            <p className="text-sm font-bold text-slate-800">
                              No results found
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              Try searching for 'Skin', 'Diet', or 'Chatbot'
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-500 hover:bg-white hover:shadow-sm rounded-xl h-11 w-11 transition-all"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            </Button>

            <div className="h-8 w-px bg-slate-200 mx-1" />

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none mb-1">
                  {userProfile?.name || "Alex R."}
                </p>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {userProfile?.age || 28} years old
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md ring-2 ring-white ring-offset-1 border border-slate-100">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name || "Alex"}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 px-8 pb-10">
          <div className="max-w-screen-2xl mx-auto h-full">{children}</div>
        </div>

        {/* Minimal Footer */}
        <footer className="px-8 py-6 flex items-center justify-between border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} DR.AI HEALTHCARE — Digital Healthcare
            Intelligence
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-[11px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors"
            >
              Privacy
            </a>
            <a
              href="/"
              className="text-[11px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest transition-colors"
            >
              Terms
            </a>
            <a
              href="https://caffeine.ai"
              target="_blank"
              className="text-[11px] font-bold text-primary uppercase tracking-widest border-l border-slate-200 pl-4"
              rel="noreferrer"
            >
              Built with ai
            </a>
          </div>
        </footer>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default Layout;
