import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import Pillars from "./pages/Pillars";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import GovernmentPolicies from "./pages/GovernmentPolicies";
import JobCuts from "./pages/JobCuts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/community" element={<Community />} />
            <Route path="/government-policies" element={<GovernmentPolicies />} />
            <Route path="/job-cuts" element={<JobCuts />} />
            <Route path="/contact" element={<Contact />} />
            {/* Redirect old navigate route */}
            <Route path="/navigate" element={<Navigate to="/government-policies" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
