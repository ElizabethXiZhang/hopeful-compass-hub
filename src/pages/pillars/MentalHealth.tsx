import { Brain } from "lucide-react";
import PillarPage from "@/components/pillars/PillarPage";

const MentalHealth = () => (
  <PillarPage
    metaTitle="Mental Health Support During Job Loss | Unemployment Reboot"
    metaDescription="Cope with depression and anxiety after losing your job. Practical mental health support, daily reset routines, and emotional recovery during unemployment."
    canonicalPath="/rebuild/mental-health"
    keywords="mental health after unemployment, depression after losing job, anxiety after layoff"
    HeroIcon={Brain}
    accentGradient="from-rose-500 to-pink-500"
    heroGlowColor="270 70% 65%"
    heroGlowSecondary="190 80% 55%"
    eyebrow="Pillar 1 · Mental Health"
    h1="Your mind needs support"
    heroHighlight="before your career needs decisions."
    heroSubtitle="Job loss is a real psychological shock. Before forcing the next move, give your mind room to stabilize. Healing first is progress."
    sections={[
      {
        title: "What You're Actually",
        highlight: "Going Through",
        intro:
          "Unemployment triggers more than financial stress. It hits identity, structure, and self-worth all at once.",
        bullets: [
          "Emotional shock that comes in waves",
          "Identity loss tied to your old role",
          "Anxiety about the unknown future",
          "Shame around telling people",
          "Burnout you didn't notice while working",
          "Numbness, irritability, or low motivation",
        ],
        glowColor: "330 70% 60%",
      },
      {
        title: "Why It",
        highlight: "Happens",
        intro:
          "These reactions are not weakness. They are predictable responses to losing key psychological anchors.",
        bullets: [
          "Loss of daily structure and rhythm",
          "Repeated rejection from applications",
          "Uncertainty about money and timing",
          "Comparison with peers on social media",
          "Disrupted sense of purpose and contribution",
          "Reduced social interaction and feedback",
        ],
        glowColor: "270 60% 65%",
      },
      {
        title: "Practical",
        highlight: "Help",
        intro: "Small, repeatable actions that calm the nervous system and rebuild stability.",
        bullets: [
          "Regulate sleep — same wake time daily",
          "Reduce doom scrolling and news binges",
          "Journal for 5 minutes, no rules",
          "Move your body — walks count",
          "Talk to one safe person this week",
          "Reduce self-judgment — you're adapting",
        ],
        glowColor: "190 80% 55%",
      },
      {
        title: "If Symptoms Feel",
        highlight: "Severe",
        intro:
          "If you feel hopeless for weeks, can't function, or have thoughts of self-harm, please reach out to a mental health professional or a local crisis line. You deserve real support, not silence.",
        glowColor: "20 80% 65%",
      },
    ]}
    checklists={[
      {
        title: "Morning Reset",
        items: [
          { label: "Wake at the same time", description: "Even without a job to go to." },
          { label: "10 min sunlight + water", description: "Cheap, powerful nervous system reset." },
          { label: "One small intention", description: "Not a to-do list. Just one anchor." },
        ],
      },
      {
        title: "Afternoon Anchor",
        items: [
          { label: "30 min focused task", description: "Application, learning, or chore." },
          { label: "Movement break", description: "Walk, stretch, anything off the chair." },
          { label: "Eat a real meal", description: "Skipping food fuels anxiety." },
        ],
      },
      {
        title: "Evening Wind-down",
        items: [
          { label: "Screens off 45 min before bed", description: "Protects sleep quality." },
          { label: "Write 3 lines in a journal", description: "What happened. How you felt. One win." },
          { label: "Same bedtime as yesterday", description: "Consistency > perfection." },
        ],
      },
    ]}
    faqs={[
      {
        question: "Is it normal to feel depressed after losing my job?",
        answer:
          "Yes. Job loss is consistently ranked among the most stressful life events. Sadness, anxiety, and low motivation are normal initial responses. They become a concern when they last many weeks without lifting at all — that's when professional support helps most.",
      },
      {
        question: "How long does emotional recovery take after a layoff?",
        answer:
          "There's no fixed timeline. Most people see early stabilization within 4–8 weeks if they protect sleep, structure, and connection. Deeper identity recovery often takes longer and runs in parallel with the practical rebuild.",
      },
      {
        question: "Should I take time off before job hunting again?",
        answer:
          "If you can afford even a short pause, it usually helps. Even 1–2 weeks of intentional rest before applying tends to produce clearer thinking and stronger applications than panic-applying from day one.",
      },
      {
        question: "How do I deal with shame about being unemployed?",
        answer:
          "Shame shrinks in conversation. Tell one trusted person honestly. Layoffs are happening at scale across industries — your situation is shared by millions, even if your social feed hides it.",
      },
    ]}
    ctaTitle="Healing first is progress."
    ctaSubtitle="You don't have to be 'fine' before you're allowed to rebuild. You're allowed to do both at the same time, slowly."
    ctaPrimary={{ label: "Join the Community", to: "/community" }}
    related={[
      {
        title: "Healthy Lifestyle",
        href: "/rebuild/lifestyle",
        description: "Rebuild routine, sleep, and energy when work no longer provides structure.",
      },
      {
        title: "Community Support",
        href: "/rebuild/community",
        description: "Reconnect with others — isolation makes everything heavier.",
      },
      {
        title: "Purpose Beyond Work",
        href: "/rebuild/purpose",
        description: "Rediscover identity and meaning that isn't tied to a job title.",
      },
    ]}
  />
);

export default MentalHealth;
