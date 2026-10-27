import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useHealthStore } from "./store/useHealthStore";

// ─── Lazy page imports ────────────────────────────────────────────────────────
const LandingPage = lazy(() => import("./pages/Landing"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const OnboardingPage = lazy(() => import("./pages/Onboarding"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const MoodPage = lazy(() => import("./pages/Mood"));
const SymptomsPage = lazy(() => import("./pages/Symptoms"));
const DietPage = lazy(() => import("./pages/Diet"));
const ExercisePage = lazy(() => import("./pages/Exercise"));
const SkinPage = lazy(() => import("./pages/Skin"));
const MedicalImagingPage = lazy(() => import("./pages/MedicalImaging"));
const ChatbotPage = lazy(() => import("./pages/Chatbot"));
const VoicePage = lazy(() => import("./pages/Voice"));
const RemindersPage = lazy(() => import("./pages/Reminders"));
const MedicineReminderPage = lazy(() => import("./pages/MedicineReminder"));
const TimelinePage = lazy(() => import("./pages/Timeline"));
const PrescriptionPage = lazy(() => import("./pages/Prescription"));
const HabitsPage = lazy(() => import("./pages/Habits"));
const ReportPage = lazy(() => import("./pages/Report"));
const HealthRiskPage = lazy(() => import("./pages/HealthRisk"));
const HealthTipsPage = lazy(() => import("./pages/HealthTips"));
const ProfilePage = lazy(() => import("./pages/Profile"));

// ─── Page loading fallback ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
          <Skeleton key={k} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Auth guard helper ────────────────────────────────────────────────────────
function getAuthState() {
  return useHealthStore.getState();
}

// ─── Root route ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="health-theme"
    >
      <Outlet />
    </ThemeProvider>
  ),
});

// ─── Route definitions ────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const { isAuthenticated, isOnboarded } = getAuthState();
    if (isAuthenticated && isOnboarded) throw redirect({ to: "/dashboard" });
    if (isAuthenticated && !isOnboarded) throw redirect({ to: "/onboarding" });
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OnboardingPage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  ),
});

// ─── Authenticated layout route ───────────────────────────────────────────────
const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  beforeLoad: () => {
    const { isAuthenticated } = getAuthState();
    if (!isAuthenticated) throw redirect({ to: "/" });
  },
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/dashboard",
  component: () => <DashboardPage />,
});

const moodRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/mood",
  component: () => <MoodPage />,
});

const symptomsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/symptoms",
  component: () => <SymptomsPage />,
});

const dietRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/diet",
  component: () => <DietPage />,
});

const exerciseRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/exercise",
  component: () => <ExercisePage />,
});

const skinRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/skin",
  component: () => <SkinPage />,
});

const medicalImagingRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/medical-imaging",
  component: () => <MedicalImagingPage />,
});

const chatbotRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/chatbot",
  component: () => <ChatbotPage />,
});

const voiceRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/voice",
  component: () => <VoicePage />,
});

const remindersRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/reminders",
  component: () => <RemindersPage />,
});

const medicineReminderRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/medicine-reminder",
  component: () => <MedicineReminderPage />,
});

const timelineRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/timeline",
  component: () => <TimelinePage />,
});

const prescriptionRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/prescription",
  component: () => <PrescriptionPage />,
});

const habitsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/habits",
  component: () => <HabitsPage />,
});

const reportRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/report",
  component: () => <ReportPage />,
});

const healthRiskRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/health-risk",
  component: () => <HealthRiskPage />,
});

const healthTipsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/health-tips",
  component: () => <HealthTipsPage />,
});

const profileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/profile",
  component: () => <ProfilePage />,
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  loginRoute,
  registerRoute,
  authenticatedRoute.addChildren([
    dashboardRoute,
    moodRoute,
    symptomsRoute,
    dietRoute,
    exerciseRoute,
    skinRoute,
    medicalImagingRoute,
    chatbotRoute,
    voiceRoute,
    remindersRoute,
    medicineReminderRoute,
    timelineRoute,
    prescriptionRoute,
    habitsRoute,
    reportRoute,
    healthRiskRoute,
    healthTipsRoute,
    profileRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
