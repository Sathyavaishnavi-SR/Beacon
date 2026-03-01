import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BeaconProvider } from "@/context/BeaconContext";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";
import Colleges from "./pages/Colleges";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return (
      <>
        <Navbar />
        <Landing />
      </>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0" style={{ background: 'hsl(var(--background))' }}>
        <Navbar />
        <main className="flex-1 overflow-auto pt-20">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BeaconProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BeaconProvider>
  </QueryClientProvider>
);

export default App;
