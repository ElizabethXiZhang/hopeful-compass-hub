import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const timelineSteps = [
  {
    year: "Now",
    title: "The Transition in AI revolution",
    description:
      "The AI revolution is reshaping the job market by automating routine and repetitive tasks, leading to significant displacement and contributing to over 50,000 layoffs in 2025 alone as companies streamline operations and invest heavily in AI tools.",
    active: true,
  },
  {
    year: "Near Future",
    title: "Adaptation",
    description: "The key is to understand, process, strategize, ",
    active: false,
  },
  {
    year: "Ahead",
    title: "Renaissance",
    description: "A new era of human creativity and purpose. Work becomes about meaning, connection, and growth.",
    active: false,
  },
];

const AIRevolutionSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"
      />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-medium text-secondary uppercase tracking-wider">
            Understanding Change
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            The AI Revolution <span className="gradient-text-calm">Explained Calmly</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            This isn't about doom. It's about understanding where we are and where we're going—together.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative md:flex md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <GlassCard
                    hover
                    className={`p-8 ${step.active ? "border-primary/30" : ""}`}
                    glow={step.active ? "primary" : "none"}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                          step.active ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`text-sm font-semibold ${step.active ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {step.year}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </GlassCard>
                </div>

                {/* Timeline dot */}
                <motion.div
                  animate={step.active ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-4 ${
                    step.active
                      ? "border-primary bg-background shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                      : "border-muted bg-background"
                  }`}
                />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRevolutionSection;
