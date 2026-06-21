import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import Pillars from "./pages/Pillars";
import Reality from "./pages/Reality";
import Rebuild from "./pages/Rebuild";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import GovernmentPolicies from "./pages/GovernmentPolicies";
import JobCuts from "./pages/JobCuts";
import Forum from "./pages/Forum";
import BookCall from "./pages/BookCall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mission" element={<Navigate to="/" replace />} />
              <Route path="/pillars" element={<Navigate to="/rebuild" replace />} />
              <Route path="/reality" element={<Reality />} />
              <Route path="/rebuild" element={<Rebuild />} />
              <Route path="/community" element={<Community />} />
              <Route path="/government-policies" element={<GovernmentPolicies />} />
              <Route path="/job-cuts" element={<JobCuts />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/book-call" element={<BookCall />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/navigate" element={<Navigate to="/government-policies" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
