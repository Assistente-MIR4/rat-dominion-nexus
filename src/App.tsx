import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Dashboard from "./pages/Dashboard";
import Rankings from "./pages/Rankings";
import Events from "./pages/Events";
import Players from "./pages/Players";
import Stats from "./pages/Stats";
import EventsAdmin from "./pages/admin/EventsAdmin";
import Settings from "./pages/admin/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/rankings" element={
            <DashboardLayout>
              <Rankings />
            </DashboardLayout>
          } />
          <Route path="/events" element={
            <DashboardLayout>
              <Events />
            </DashboardLayout>
          } />
          <Route path="/players" element={
            <DashboardLayout>
              <Players />
            </DashboardLayout>
          } />
          <Route path="/stats" element={
            <DashboardLayout>
              <Stats />
            </DashboardLayout>
          } />
          <Route path="/admin/events" element={
            <DashboardLayout>
              <EventsAdmin />
            </DashboardLayout>
          } />
          <Route path="/admin/settings" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
          <Route path="/profile/:playerId" element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
