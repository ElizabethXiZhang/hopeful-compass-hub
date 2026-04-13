import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Heart } from "lucide-react";
import { motion } from "framer-motion";
import logoFull from "@/assets/logo-full.png";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Community", path: "/community" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border/30">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-cyan absolute -bottom-40 -left-40 h-80 w-80 opacity-20" />
      <div className="gradient-orb gradient-orb-lavender absolute -bottom-40 -right-40 h-80 w-80 opacity-20" />

      <div className="container relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand with Full Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link to="/" className="inline-block">
              <img
                src={logoFull}
                alt="The Unemployment Pandemic"
                className="h-24 w-auto object-contain drop-shadow-[0_0_10px_hsla(270,60%,70%,0.2)]"
              />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Navigating meaning, stability, and peace in the AI era. We support people through the challenges of changes. You are not alone in this journey. Together, we find new paths forward.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            © 2025 The Unemployment Pandemic. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart size={14} className="text-accent" /> for humanity
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
