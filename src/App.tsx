import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Results from "./pages/Results";
import ConnectorDeepDive from "./pages/ConnectorDeepDive";
import Architecture from "./pages/Architecture";
import About from "./pages/About";
import Passengers from "./pages/Passengers";
import SeatSelection from "./pages/SeatSelection";
import Itinerary from "./pages/Itinerary";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import OpenToWorkBadge from "./components/OpenToWorkBadge";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/results" element={<Results />} />
          <Route path="/connector" element={<ConnectorDeepDive />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/about" element={<About />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
        <OpenToWorkBadge />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
