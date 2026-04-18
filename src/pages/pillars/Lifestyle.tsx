import { Leaf } from "lucide-react";
import PillarPage from "@/components/pillars/PillarPage";

const Lifestyle = () => (
  <PillarPage
    metaTitle="Healthy Lifestyle During Unemployment | Routine & Habits"
    metaDescription="Rebuild routine, sleep, and healthy habits after job loss. A simple daily structure and 7-day reset to feel stable again without a 9–5."
    canonicalPath="/rebuild/lifestyle"
    keywords="routine after job loss, healthy habits unemployed, structure without work"
    HeroIcon={Leaf}
    accentGradient="from-lime-500 to-green-500"
    heroGlowColor="140 60% 50%"
    heroGlowSecondary="190 80% 55%"
    eyebrow="Pillar 2 · Healthy Lifestyle"
    h1="When work disappears,"
    heroHighlight="routine must be rebuilt."
    heroSubtitle="Without external structure, days quietly slide into late nights, low energy, and endless scrolling. A simple routine restores energy and self-trust."
    sections={[
      {
        title: "What Usually",
        highlight: "Slips First",
        intro:
          "Notice these early. They're not character flaws — they're signals that structure has left the building.",
        bullets: [
          "Sleeping later and waking later",
          "Skipping meals or grazing on snacks",
          "Hours of scrolling between tasks",
          "No daylight or fresh air",
          "Working out 'when motivation returns'",
          "Days blurring into each other",
        ],
        glowColor: "140 60% 50%",
      },
      {
        title: "Core",
        highlight: "Systems",
        intro: "Six anchors that hold a day together when there's no boss or office to do it for you.",
        bullets: [
          "Sleep rhythm — fixed wake time",
          "Sunlight within 30 min of waking",
          "Movement most days, even small",
          "Real meals at roughly the same times",
          "Focus blocks — 60–90 min, no phone",
          "Digital boundaries — apps off after dark",
        ],
        glowColor: "190 80% 55%",
      },
    ]}
    checklists={[
      {
        title: "Morning",
        items: [
          { label: "Wake at fixed time", description: "Anchor the whole day." },
          { label: "Sunlight + water", description: "Skip the phone first." },
          { label: "Plan 1 priority", description: "Not 10. Just 1." },
        ],
      },
      {
        title: "Midday",
        items: [
          { label: "60–90 min focus block", description: "Job search, learning, or building." },
          { label: "Real lunch, away from screen", description: "Resets attention." },
          { label: "Walk or short workout", description: "20 minutes is plenty." },
        ],
      },
      {
        title: "Evening",
        items: [
          { label: "Cook or eat slowly", description: "No autopilot scrolling." },
          { label: "Wind-down hour", description: "Dim lights, no doomscroll." },
          { label: "Sleep at same time", description: "Consistency builds energy." },
        ],
      },
    ]}
    faqs={[
      {
        question: "How do I stay motivated without a boss or schedule?",
        answer:
          "Replace external pressure with external anchors. Fixed wake time, daily walk, and a single morning priority remove the need for daily willpower. Motivation follows action, not the other way around.",
      },
      {
        question: "What's the most important habit during unemployment?",
        answer:
          "Sleep timing. A fixed wake-up time stabilizes mood, focus, and appetite more than almost anything else. Build everything else on top of that one anchor.",
      },
      {
        question: "How long does the 7-day reset take to feel different?",
        answer:
          "Most people feel calmer and clearer within 3–5 days of consistent sleep, daylight, and movement. Energy continues to rise across the second and third week.",
      },
      {
        question: "Is it okay to rest a lot in the first weeks?",
        answer:
          "Yes — intentional rest is part of recovery. The goal is rest with rhythm, not collapse without structure. Keep wake time fixed even on slow days.",
      },
    ]}
    ctaTitle="Consistency creates confidence."
    ctaSubtitle="You don't need a perfect routine. You need a small one you can repeat tomorrow."
    related={[
      {
        title: "Mental Health Support",
        href: "/rebuild/mental-health",
        description: "Calm the nervous system before pushing for big decisions.",
      },
      {
        title: "Financial Survival",
        href: "/rebuild/financial-survival",
        description: "Reduce money stress with a clear runway and simple plan.",
      },
      {
        title: "Future Direction",
        href: "/rebuild/future-direction",
        description: "Choose your next path with energy you've actually rebuilt.",
      },
    ]}
  />
);

export default Lifestyle;
