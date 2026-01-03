import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, CheckCircle2, Users, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters").optional(),
  gender: z.string().min(1, "Please select your gender"),
  age: z.number().min(16, "Age must be at least 16").max(120, "Please enter a valid age").optional(),
  profession: z.string().max(100, "Profession must be less than 100 characters").optional(),
  yearsOfService: z.number().min(0, "Years of service cannot be negative").max(60, "Please enter a valid number").optional(),
  country: z.string().min(1, "Country is required").max(100, "Country must be less than 100 characters"),
  city: z.string().min(1, "City is required").max(100, "City must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  shareStory: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const Community = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    age: undefined,
    profession: "",
    yearsOfService: undefined,
    country: "",
    city: "",
    email: "",
    shareStory: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { label: "Personal", completed: !!(formData.gender) },
    { label: "Location", completed: !!(formData.country && formData.city) },
    { label: "Contact", completed: !!(formData.email) },
  ];

  const validateField = (field: keyof FormData, value: string | boolean | number | undefined) => {
    try {
      const partialSchema = z.object({ [field]: formSchema.shape[field] });
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

  const handleChange = (field: keyof FormData, value: string | boolean | number | undefined) => {
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
      const { error } = await supabase.from("community_members").insert({
        name: formData.name || null,
        gender: formData.gender,
        age: formData.age || null,
        profession: formData.profession || null,
        years_of_service: formData.yearsOfService || null,
        country: formData.country,
        city: formData.city,
        email: formData.email,
        share_story: formData.shareStory,
      });

      if (error) throw error;
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Page background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[180%] h-[80vh]"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 100%, 
              hsl(190 90% 45% / 0.4) 0%,
              hsl(270 70% 50% / 0.25) 30%,
              transparent 60%
            )`,
          }}
        />
      </div>

      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6"
                  >
                    <Users className="w-8 h-8 text-white" />
                  </motion.div>
                  <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl mb-4">
                    Join Our <span className="gradient-text">Community</span>
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    You're not alone in this journey. Join thousands who understand what you're going through.
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center justify-center gap-2 mb-10">
                  {steps.map((step, index) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <motion.div
                        animate={{
                          backgroundColor: step.completed
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted))",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <span className="text-muted-foreground">{index + 1}</span>
                        )}
                      </motion.div>
                      <span className="text-sm text-muted-foreground hidden sm:inline">
                        {step.label}
                      </span>
                      {index < steps.length - 1 && (
                        <div className="w-8 h-0.5 bg-muted mx-2" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Form */}
                <GlassCard className="p-8 sm:p-10" glow="primary">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Name <span className="text-muted-foreground text-sm">(optional)</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="How should we call you?"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        className="bg-white/5 border-white/10 focus:border-primary"
                      />
                      {errors.name && (
                        <p className="text-sm text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Gender & Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-foreground">
                          Gender <span className="text-rose-400">*</span>
                        </Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => handleChange("gender", value)}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-white/10">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && (
                          <p className="text-sm text-rose-400">{errors.gender}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-foreground">
                          Age <span className="text-muted-foreground text-sm">(optional)</span>
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Your age"
                          value={formData.age ?? ""}
                          onChange={(e) => handleChange("age", e.target.value ? parseInt(e.target.value) : undefined)}
                          onBlur={() => handleBlur("age")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                          min={16}
                          max={120}
                        />
                        {errors.age && (
                          <p className="text-sm text-rose-400">{errors.age}</p>
                        )}
                      </div>
                    </div>

                    {/* Profession & Years of Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profession" className="text-foreground">
                          Profession <span className="text-muted-foreground text-sm">(optional)</span>
                        </Label>
                        <Input
                          id="profession"
                          placeholder="Your profession"
                          value={formData.profession}
                          onChange={(e) => handleChange("profession", e.target.value)}
                          onBlur={() => handleBlur("profession")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                        {errors.profession && (
                          <p className="text-sm text-rose-400">{errors.profession}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearsOfService" className="text-foreground">
                          Years of Service <span className="text-muted-foreground text-sm">(last company)</span>
                        </Label>
                        <Input
                          id="yearsOfService"
                          type="number"
                          placeholder="Years worked"
                          value={formData.yearsOfService ?? ""}
                          onChange={(e) => handleChange("yearsOfService", e.target.value ? parseInt(e.target.value) : undefined)}
                          onBlur={() => handleBlur("yearsOfService")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                          min={0}
                          max={60}
                        />
                        {errors.yearsOfService && (
                          <p className="text-sm text-rose-400">{errors.yearsOfService}</p>
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
                          onChange={(e) => handleChange("country", e.target.value)}
                          onBlur={() => handleBlur("country")}
                          className="bg-white/5 border-white/10 focus:border-primary"
                        />
                        {errors.country && (
                          <p className="text-sm text-rose-400">{errors.country}</p>
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
                          <p className="text-sm text-rose-400">{errors.city}</p>
                        )}
                      </div>
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

                    {/* Share Story */}
                    <div className="space-y-3">
                      <Label className="text-foreground">
                        Would you like to share your story with our community?
                      </Label>
                      <RadioGroup
                        value={formData.shareStory ? "yes" : "no"}
                        onValueChange={(value) => handleChange("shareStory", value === "yes")}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes" className="text-muted-foreground cursor-pointer">
                            Yes, I'd love to
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no" className="text-muted-foreground cursor-pointer">
                            Not right now
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Submit */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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

                    <p className="text-center text-sm text-muted-foreground">
                      No spam, ever. We respect your privacy.
                    </p>
                  </form>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-center py-20"
              >
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
                  Welcome to the Family!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground max-w-md mx-auto mb-8"
                >
                  You've taken a brave step. We're honored to have you with us on this journey.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <GlassCard className="p-6 inline-block">
                    <p className="text-foreground/80 italic">
                      "Together, we are stronger than any storm."
                    </p>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
