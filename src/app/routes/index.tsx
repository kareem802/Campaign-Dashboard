import { DashboardPage } from '@/pages/dashboard';

// Since this is a single page application without a complex router (like react-router-dom),
// we just export the main page component directly as our root route.
export function AppRoutes() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <DashboardPage />
    </div>
  );
}
