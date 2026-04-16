import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mic,
  EyeOff,
  GraduationCap,
  Handshake,
  Heart,
  HelpCircle,
  Mail,
  Send,
  CheckCircle2,
  Shield,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const contactTypes = [
  {
    id: "story" as const,
    icon: Mic,
    title: "Share Your Story",
    description:
      "If you have gone through job loss or a difficult transition, your story can help others feel less alone.",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "anonymous" as const,
    icon: EyeOff,
    title: "Share Anonymously",
    description:
      "You can share your experience privately. We will respect your identity and keep it anonymous.",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "expert" as const,
    icon: GraduationCap,
    title: "Expert or Coach",
    description:
      "If you are a coach, psychologist, or expert and want to contribute or speak with us.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "collaboration" as const,
    icon: Handshake,
    title: "Collaborate With Us",
    description:
      "If you want to build something together or collaborate on ideas.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "sponsorship" as const,
    icon: Heart,
    title: "Sponsorship",
    description:
      "If you are interested in supporting or partnering with our platform.",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "general" as const,
    icon: HelpCircle,
    title: "General Inquiry",
    description:
      "For any questions or information, feel free to reach out.",
    color: "from-indigo-500 to-blue-600",
  },
];

type ContactType = (typeof contactTypes)[number]["id"];

const formSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Please enter a message").max(5000),
  website: z.string().max(500).optional(),
  companyName: z.string().max(200).optional(),
  projectIdea: z.string().max(2000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to be contacted" }),
  }),
});


const Contact = () => {
  const [selectedType, setSelectedType] = useState<ContactType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async () => {
    const data = {
      name: name || undefined,
      email,
      message,
      website: website || undefined,
      companyName: companyName || undefined,
      projectIdea: projectIdea || undefined,
      consent: consent as true,
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flat = result.error.flatten().fieldErrors;
      for (const [key, msgs] of Object.entries(flat)) {
        if (msgs && msgs.length > 0) fieldErrors[key] = msgs[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("contact-message", {
        body: {
          name: name || undefined,
          email,
          contact_type: selectedType,
          message,
          website: website || undefined,
          company_name: companyName || undefined,
          project_idea: projectIdea || undefined,
          consent,
        },
      });

      if (error) throw error;
      setSubmitted(true);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const selectedCard = contactTypes.find((c) => c.id === selectedType);

  return (
    <Layout>
      <FloatingOrbs />

      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-6xl">
          {/* SECTION 1: Hero */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary/80 text-sm tracking-widest uppercase mb-4"
            >
              We're here to listen
            </motion.p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Reach Out in the Way{" "}
              <span className="gradient-text">That Feels Right</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether you want to share your story, ask something, or work with
              us, you can reach out here. We read every message with care.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              /* SECTION 4: After Submit */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto space-y-12"
              >
                <GlassCard className="p-10 text-center" variant="strong">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-6"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Thank you for reaching out
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-2">
                    We usually respond within 24 to 48 hours.
                  </p>
                  <p className="text-muted-foreground">
                    Every message is read carefully.
                  </p>
                </GlassCard>

                {/* SECTION 5: Support Notice */}
                <GlassCard className="p-6 border-amber-500/20" variant="subtle">
                  <p className="text-foreground/80 text-sm leading-relaxed text-center">
                    If you are going through intense emotional distress or
                    crisis, please reach out to a local mental health helpline in
                    your country. This platform is a support space, but not a
                    replacement for emergency care.
                  </p>
                </GlassCard>

                {/* SECTION 6: Human Touch */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center space-y-4 py-8"
                >
                  <p className="text-xl text-foreground/90 font-display font-semibold">
                    Your story matters.
                  </p>
                  <p className="text-xl text-foreground/90 font-display font-semibold">
                    Your voice matters.
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                    Whether you share one sentence or your full journey, it can
                    make someone else feel less alone.
                  </p>
                </motion.div>
              </motion.div>
            ) : !selectedType ? (
              /* SECTION 2: Choose Purpose */
              <motion.div
                key="choose"
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-12"
              >
                <motion.div variants={fadeUp} className="text-center">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                    How Would You Like to{" "}
                    <span className="gradient-text">Connect</span>?
                  </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {contactTypes.map((card, index) => (
                    <motion.div
                      key={card.id}
                      variants={fadeUp}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <button
                        onClick={() => setSelectedType(card.id)}
                        className="w-full text-left"
                      >
                        <GlassCard
                          className="p-6 h-full transition-all duration-300 group"
                          hover
                        >
                          <div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                          >
                            <card.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                            {card.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {card.description}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                            Get started{" "}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </GlassCard>
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* SECTION 5: Support Notice */}
                <motion.div variants={fadeUp}>
                  <GlassCard
                    className="p-6 border-amber-500/20 max-w-3xl mx-auto"
                    variant="subtle"
                  >
                    <p className="text-foreground/80 text-sm leading-relaxed text-center">
                      If you are going through intense emotional distress or
                      crisis, please reach out to a local mental health helpline
                      in your country. This platform is a support space, but not
                      a replacement for emergency care.
                    </p>
                  </GlassCard>
                </motion.div>

                {/* SECTION 6: Human Touch */}
                <motion.div
                  variants={fadeUp}
                  className="text-center space-y-4 py-8"
                >
                  <p className="text-xl text-foreground/90 font-display font-semibold">
                    Your story matters. Your voice matters.
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                    Whether you share one sentence or your full journey, it can
                    make someone else feel less alone.
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              /* SECTION 3: Contact Form */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                <button
                  onClick={() => {
                    setSelectedType(null);
                    setErrors({});
                  }}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to options
                </button>

                <GlassCard className="p-8 sm:p-10" variant="strong">
                  {/* Selected type indicator */}
                  {selectedCard && (
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${selectedCard.color}`}
                      >
                        <selectedCard.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground">
                          {selectedCard.title}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Fill in the details below
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-foreground/80 text-sm"
                      >
                        Name{" "}
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What should we call you?"
                        className="bg-white/5 border-white/10 focus:border-primary/50"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-foreground/80 text-sm"
                      >
                        Email <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-white/5 border-white/10 focus:border-primary/50"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs">{errors.email}</p>
                      )}
                    </div>

                    {/* Contact Type (read-only or changeable) */}
                    <div className="space-y-2">
                      <Label className="text-foreground/80 text-sm">
                        Reason for Contact
                      </Label>
                      <Select
                        value={selectedType}
                        onValueChange={(v) =>
                          setSelectedType(v as ContactType)
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {contactTypes.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditional: Expert */}
                    {selectedType === "expert" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <Label className="text-foreground/80 text-sm">
                          Website or LinkedIn{" "}
                          <span className="text-muted-foreground text-xs">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://your-website.com"
                          className="bg-white/5 border-white/10 focus:border-primary/50"
                        />
                      </motion.div>
                    )}

                    {/* Conditional: Collaboration */}
                    {selectedType === "collaboration" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <Label className="text-foreground/80 text-sm">
                          Project Idea{" "}
                          <span className="text-muted-foreground text-xs">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          value={projectIdea}
                          onChange={(e) => setProjectIdea(e.target.value)}
                          placeholder="Tell us about your idea"
                          className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[80px]"
                        />
                      </motion.div>
                    )}

                    {/* Conditional: Sponsorship */}
                    {selectedType === "sponsorship" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <Label className="text-foreground/80 text-sm">
                          Company Name{" "}
                          <span className="text-muted-foreground text-xs">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Your company"
                          className="bg-white/5 border-white/10 focus:border-primary/50"
                        />
                      </motion.div>
                    )}

                    {/* Message */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-foreground/80 text-sm"
                      >
                        Message <span className="text-red-400">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here. Take your time. You can share as much or as little as you want."
                        className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[140px]"
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs">{errors.message}</p>
                      )}
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3 pt-2">
                      <Checkbox
                        id="consent"
                        checked={consent}
                        onCheckedChange={(checked) =>
                          setConsent(checked === true)
                        }
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor="consent"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I agree to be contacted regarding this message
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-red-400 text-xs">{errors.consent}</p>
                    )}

                    {errors.form && (
                      <p className="text-red-400 text-sm text-center">
                        {errors.form}
                      </p>
                    )}

                    {/* Submit */}
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold text-base rounded-xl mt-4"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </GlassCard>

                {/* Privacy */}
                <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>
                    Your information is safe. We respect your privacy. You can
                    leave anytime.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
