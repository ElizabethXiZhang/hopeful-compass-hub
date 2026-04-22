import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Home, LifeBuoy, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";

const suggestions = [
  {
    icon: Home,
    title: "Start at Home",
    description: "Return to the beginning of the journey.",
    to: "/",
  },
  {
    icon: Compass,
    title: "Understand the Reality",
    description: "See what is actually happening in the world of work.",
    to: "/reality",
  },
  {
    icon: LifeBuoy,
    title: "Begin to Rebuild",
    description: "Explore the Six Pillars of starting again.",
    to: "/rebuild",
  },
  {
    icon: MessageCircle,
    title: "Talk to Someone",
    description: "Reach the community or send us a message.",
    to: "/contact",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found · Unemployment Reboot";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "The page you were looking for could not be found. Find your way back to guidance, community, and the path to rebuild."
    );
    if (!meta.parentNode) document.head.appendChild(meta);

    console.warn("404 route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="gradient-orb gradient-orb-cyan absolute -top-32 left-1/4 h-96 w-96 opacity-30" />
          <div className="gradient-orb gradient-orb-lavender absolute bottom-0 right-1/4 h-[28rem] w-[28rem] opacity-25" />
          <div className="gradient-orb gradient-orb-peach absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            {/* 404 mark */}
            <div className="relative mx-auto mb-8 inline-block">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="gradient-text relative text-[7rem] font-bold leading-none tracking-tight sm:text-[10rem] md:text-[12rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                404
              </motion.h1>
              <motion.div
                aria-hidden
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto max-w-2xl space-y-5"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                This page is missing,
                <br className="hidden sm:block" />
                <span className="gradient-text-calm">but you are not lost.</span>
              </h2>

              <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
                Sometimes a link breaks, a page moves, or a path simply ends.
                The same is true for careers and seasons of life. What matters
                is the next step you choose.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="btn-glow group">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Take me home
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[hsl(var(--surface-border))] bg-[hsl(var(--surface-overlay))] backdrop-blur hover:bg-[hsl(var(--surface-overlay-hover))]"
              >
                <Link to="/rebuild">
                  <Compass className="mr-2 h-4 w-4" />
                  Explore the Pillars
                </Link>
              </Button>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-16"
            >
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Or choose a direction
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {suggestions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
                    >
                      <Link to={item.to} className="block h-full">
                        <GlassCard className="group h-full p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--surface-border-hover))] hover:shadow-[0_10px_40px_-10px_hsl(var(--glow-primary))]">
                          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/15 text-primary ring-1 ring-[hsl(var(--surface-border))] transition-all group-hover:scale-110">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-sm font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                            Go there
                            <ArrowLeft className="h-3 w-3 rotate-180" />
                          </span>
                        </GlassCard>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 text-sm italic text-muted-foreground"
            >
              "Not all who wander are lost. Some are simply finding a new way."
            </motion.p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
