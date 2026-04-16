import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
  Heart,
  CheckCircle2,
  Users,
  Sparkles,
  MessageCircle,
  Shield,
  Sprout,
  Sun,
  Globe,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters").optional(),
  gender: z.string().min(1, "Please select your gender"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age is required",
    })
    .min(16, "Age must be at least 16")
    .max(120, "Please enter a valid age"),
  profession: z
    .string()
    .max(100, "Profession must be less than 100 characters")
    .optional(),
  yearsOfService: z
    .number()
    .min(0, "Years cannot be negative")
    .max(60, "Please enter a valid number")
    .optional()
    .nullable(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must be less than 100 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  shareStory: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};


const Community = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    age: undefined as unknown as number,
    profession: "",
    yearsOfService: undefined,
    country: "",
    city: "",
    email: "",
    shareStory: false,
  });
  const [storyText, setStoryText] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (
    field: keyof FormData,
    value: string | boolean | number | undefined | null
  ) => {
    try {
      const partialSchema = z.object({
        [field]: formSchema.shape[field],
      });
      partialSchema.parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: err.errors[0]?.message }));
      }
      return false;
    }
  };

  const handleChange = (
    field: keyof FormData,
    value: string | boolean | number | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentChecked) {
      setErrors((prev) => ({
        ...prev,
        email: "Please agree to the community guidelines first.",
      }));
      return;
    }

    try {
      formSchema.parse(formData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as keyof FormData;
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "community-signup",
        {
          body: {
            name: formData.name || null,
            gender: formData.gender,
            age: formData.age || null,
            profession: formData.profession || null,
            years_of_service: formData.yearsOfService || null,
            country: formData.country,
            city: formData.city,
            email: formData.email,
            share_story: formData.shareStory,
          },
        }
      );

      if (error) {
        throw new Error(error.message || "Failed to submit");
      }

      if (data?.error) {
        if (data.retryAfterSeconds) {
          const minutes = Math.ceil(data.retryAfterSeconds / 60);
          throw new Error(
            `Too many submissions. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`
          );
        }
        throw new Error(data.error);
      }

      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setErrors({ email: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyJoinCards = [
    {
      icon: MessageCircle,
      title: "Real Conversations",
      desc: "Talk to people who understand what you are going through, without judgment.",
    },
    {
      icon: Sun,
      title: "Daily Support",
      desc: "Stay grounded with shared routines, check-ins, and small steps forward.",
    },
    {
      icon: Shield,
      title: "Safe Space",
      desc: "No pressure, no comparison. Just honest conversations and support.",
    },
    {
      icon: Sprout,
      title: "Shared Growth",
      desc: "You are not rebuilding alone. You are rebuilding together.",
    },
  ];

  return (
    <Layout>
      

      {/* SECTION 1 - HERO */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
          >
            You're not alone
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Join a Community That{" "}
            <span className="gradient-text">Understands You</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Thousands of people are going through the same transition.
            <br />
            Here, you don't have to explain yourself. You can just be.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
              onClick={() =>
                document
                  .getElementById("join-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Heart className="w-5 h-5 mr-2" />
              Join the Community
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - WHY JOIN */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              What You'll Find Here
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {whyJoinCards.map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} custom={i + 1}>
                <GlassCard
                  hover
                  className="p-8 h-full"
                  glow={
                    i === 0
                      ? "primary"
                      : i === 1
                        ? "secondary"
                        : i === 2
                          ? "accent"
                          : "primary"
                  }
                >
                  <card.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - COMMUNITY FEEL */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <GlassCard className="p-10 sm:p-14" variant="subtle">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                  {[
                    {
                      icon: Globe,
                      label: "People from multiple countries joining",
                    },
                    {
                      icon: Users,
                      label: "Different professions, different journeys",
                    },
                    {
                      icon: MessageCircle,
                      label: "Growing conversations every day",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeUp}
                      custom={i + 1}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground text-lg italic">
                  Every voice matters. Every story adds to the community.
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - JOIN FORM */}
      <section id="join-form" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-10">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  >
                    Become a <span className="gradient-text">Member</span>
                  </motion.h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    It only takes a minute. No pressure, no obligations.
                  </p>
                </div>

                <GlassCard className="p-8 sm:p-10" glow="primary">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Name{" "}
                        <span className="text-muted-foreground text-sm">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="What should we call you?"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className="bg-white/5 border-white/10 focus:border-primary"
                      />
                      {errors.name && (
                        <p className="text-sm text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email <span className="text-rose-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className="bg-white/5 border-white/10 focus:border-primary"
                      />
                      {errors.email && (
                        <p className="text-sm text-rose-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-foreground">
                          Age <span className="text-rose-400">*</span>
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Your age"
                          value={formData.age ?? ""}
                          onChange={(e) =>
                            handleChange(
                              "age",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          onBlur={() => handleBlur("age")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                          min={16}
                          max={120}
                        />
                        {errors.age && (
                          <p className="text-sm text-rose-400">{errors.age}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-foreground">
                          Gender <span className="text-rose-400">*</span>
                        </Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            handleChange("gender", value)
                          }
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-white/10">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">
                              Non-binary
                            </SelectItem>
                            <SelectItem value="prefer-not-to-say">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && (
                          <p className="text-sm text-rose-400">
                            {errors.gender}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Country & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-foreground">
                          Country <span className="text-rose-400">*</span>
                        </Label>
                        <Input
                          id="country"
                          placeholder="Your country"
                          value={formData.country}
                          onChange={(e) =>
                            handleChange("country", e.target.value)
                          }
                          onBlur={() => handleBlur("country")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                        {errors.country && (
                          <p className="text-sm text-rose-400">
                            {errors.country}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-foreground">
                          City <span className="text-rose-400">*</span>
                        </Label>
                        <Input
                          id="city"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          onBlur={() => handleBlur("city")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                        {errors.city && (
                          <p className="text-sm text-rose-400">
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Profession & Years */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profession" className="text-foreground">
                          Profession{" "}
                          <span className="text-muted-foreground text-sm">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          id="profession"
                          placeholder="Your profession"
                          value={formData.profession}
                          onChange={(e) =>
                            handleChange("profession", e.target.value)
                          }
                          onBlur={() => handleBlur("profession")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                        {errors.profession && (
                          <p className="text-sm text-rose-400">
                            {errors.profession}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="yearsOfService"
                          className="text-foreground"
                        >
                          Years of Experience{" "}
                          <span className="text-muted-foreground text-sm">
                            (optional)
                          </span>
                        </Label>
                        <Input
                          id="yearsOfService"
                          type="number"
                          placeholder="Years worked"
                          value={formData.yearsOfService ?? ""}
                          onChange={(e) =>
                            handleChange(
                              "yearsOfService",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          onBlur={() => handleBlur("yearsOfService")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                          min={0}
                          max={60}
                        />
                        {errors.yearsOfService && (
                          <p className="text-sm text-rose-400">
                            {errors.yearsOfService}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Story */}
                    <div className="space-y-2">
                      <Label className="text-foreground">
                        Would you like to share your story?
                      </Label>
                      <Textarea
                        placeholder="Only if you feel comfortable. You can share as much or as little as you want."
                        value={storyText}
                        onChange={(e) => setStoryText(e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary min-h-[100px]"
                        maxLength={2000}
                      />
                      <p className="text-xs text-muted-foreground">
                        {storyText.length}/2000 characters
                      </p>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        checked={consentChecked}
                        onCheckedChange={(checked) =>
                          setConsentChecked(checked === true)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="consent"
                        className="text-muted-foreground text-sm cursor-pointer leading-relaxed"
                      >
                        I agree to be part of the community and receive updates
                      </Label>
                    </div>

                    {/* Submit */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting || !consentChecked}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <>
                            <Heart className="w-5 h-5 mr-2" />
                            Join the Community
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </GlassCard>
              </motion.div>
            ) : (
              /* SECTION 5 - SUCCESS */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="space-y-12"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-8"
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-4xl font-bold text-foreground mb-4"
                  >
                    You're in. Welcome.
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-muted-foreground max-w-md mx-auto mb-10"
                  >
                    We're building this together. You'll start seeing updates
                    and ways to connect soon.
                  </motion.p>
                </div>

                {/* Post-signup options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <a
                    href="https://discord.gg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <GlassCard
                      hover
                      className="p-6 text-center h-full"
                      glow="primary"
                    >
                      <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">
                        Join Discord
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Connect instantly
                      </p>
                    </GlassCard>
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <GlassCard
                      hover
                      className="p-6 text-center h-full"
                      glow="secondary"
                    >
                      <ExternalLink className="w-8 h-8 text-secondary mx-auto mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">
                        Follow LinkedIn
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Stay updated
                      </p>
                    </GlassCard>
                  </a>
                  <Link to="/forum" className="block">
                    <GlassCard
                      hover
                      className="p-6 text-center h-full"
                      glow="accent"
                    >
                      <Users className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">
                        Explore Forum
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Start a conversation
                      </p>
                    </GlassCard>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 6 - DISCORD & LINKEDIN */}
      {!isSuccess && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <motion.div variants={fadeUp} custom={0}>
                <GlassCard className="p-8 h-full" hover glow="primary">
                  <MessageCircle className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Talk in Real Time
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Join our Discord to connect instantly with others, join
                    voice chats, and participate in discussions.
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href="https://discord.gg/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Discord
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp} custom={1}>
                <GlassCard className="p-8 h-full" hover glow="secondary">
                  <ExternalLink className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    Stay Updated
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Follow us for updates, insights, and opportunities shared
                    regularly.
                  </p>
                  <Button
                    variant="outline"
                    className="border-secondary/30 hover:bg-secondary/10"
                    asChild
                  >
                    <a
                      href="https://linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Follow on LinkedIn
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SECTION 7 - TRUST & PRIVACY */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-6 h-6 text-muted-foreground mx-auto mb-4 opacity-60" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              We respect your privacy. Your information is safe and will only be
              used to build and improve this community. You can leave anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
