import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Mission", path: "/mission" },
  { name: "Pillars", path: "/pillars" },
  { name: "Community", path: "/community" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
    >
      <div className="glass-card mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {/* Abstract UP Logo Icon */}
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-background/90 backdrop-blur-sm">
                <svg
                  viewBox="0 0 32 32"
                  className="h-6 w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Bold geometric UP monogram */}
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="50%" stopColor="hsl(var(--secondary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  {/* U shape merged with P - bold geometric design */}
                  <path
                    d="M6 6V20C6 24.4183 9.58172 28 14 28C16.5 28 18.5 27 20 25.5V16H26V10H20V6H14V18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18V6H6Z"
                    fill="url(#logoGradient)"
                  />
                  {/* P bowl accent */}
                  <circle
                    cx="23"
                    cy="10"
                    r="4"
                    fill="url(#logoGradient)"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
            <span className="hidden font-display text-lg font-semibold text-foreground sm:block">
              The Unemployment Pandemic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-white/10 md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="glass-card mt-2 mx-auto max-w-6xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
