import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundOrbs from "../ui/BackgroundOrbs";
import CosmicBackground from "../ui/CosmicBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background">
      {/* Home gets original orbs, other pages get cosmic background */}
      {isHome ? <BackgroundOrbs /> : <CosmicBackground />}
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content with page transitions */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
