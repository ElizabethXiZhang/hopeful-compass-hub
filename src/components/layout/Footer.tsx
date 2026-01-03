import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Heart } from "lucide-react";
import { motion } from "framer-motion";
const footerLinks = {
  navigation: [{
    name: "Home",
    path: "/"
  }, {
    name: "Mission",
    path: "/mission"
  }, {
    name: "Community",
    path: "/community"
  }, {
    name: "Contact",
    path: "/contact"
  }],
  resources: [{
    name: "Blog",
    path: "/blog"
  }, {
    name: "Support",
    path: "/support"
  }, {
    name: "Privacy",
    path: "/privacy"
  }, {
    name: "Terms",
    path: "/terms"
  }]
};
const socialLinks = [{
  name: "Twitter",
  icon: Twitter,
  href: "#"
}, {
  name: "LinkedIn",
  icon: Linkedin,
  href: "#"
}, {
  name: "GitHub",
  icon: Github,
  href: "#"
}];
const Footer = () => {
  return <footer className="relative mt-20 overflow-hidden border-t border-white/5">
      {/* Background orbs */}
      <div className="gradient-orb gradient-orb-cyan absolute -bottom-40 -left-40 h-80 w-80 opacity-20" />
      <div className="gradient-orb gradient-orb-lavender absolute -bottom-40 -right-40 h-80 w-80 opacity-20" />

      <div className="container relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }} className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-background">
                  <span className="font-display text-lg font-bold gradient-text">UP</span>
                </div>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                The Unemployment Pandemic
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">Navigating meaning, stability, and peace in the AI era. We support people through the challenges of changes. You are not alone in this journey. Together, we find new paths forward.</p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map(social => <a key={social.name} href={social.href} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary" aria-label={social.name}>
                  <social.icon size={18} />
                </a>)}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} viewport={{
          once: true
        }}>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map(link => <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map(link => <li key={link.name}>
                  <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} viewport={{
        once: true
      }} className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 The Unemployment Pandemic. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart size={14} className="text-accent" /> for humanity
          </p>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;