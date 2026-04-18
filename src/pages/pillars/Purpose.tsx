import { Compass } from "lucide-react";
import PillarPage from "@/components/pillars/PillarPage";

const Purpose = () => (
  <PillarPage
    metaTitle="Finding Purpose Beyond Work | Identity After Job Loss"
    metaDescription="Rediscover identity and meaning when your job is gone. Reframe self-worth, find purpose, and rebuild a sense of contribution beyond employment."
    canonicalPath="/rebuild/purpose"
    keywords="identity after losing job, purpose without career, meaning after unemployment"
    HeroIcon={Compass}
    accentGradient="from-violet-500 to-purple-500"
    heroGlowColor="270 70% 65%"
    heroGlowSecondary="20 80% 65%"
    eyebrow="Pillar 4 · Purpose & Meaning"
    h1="Your job was a role,"
    heroHighlight="not your entire identity."
    heroSubtitle="Modern culture quietly teaches us that worth equals productivity. When work disappears, that belief is exposed, and that's actually an invitation to rebuild a deeper foundation."
    sections={[
      {
        title: "Why It",
        highlight: "Hits So Hard",
        intro:
          "If most of your identity was built around your role, losing the role can feel like losing yourself. That's a wound, not a defect.",
        bullets: [
          "Worth tied to titles and salary",
          "Few hobbies outside of work",
          "Friendships mostly from the office",
          "Productivity used to silence anxiety",
          "Limited language for non-work success",
          "Quiet shame at family events",
        ],
        glowColor: "270 60% 65%",
      },
      {
        title: "Reframe",
        highlight: "Where Purpose Comes From",
        intro:
          "Purpose isn't only earned at a job. It shows up wherever you're contributing, growing, or caring.",
        bullets: [
          "Learning something hard",
          "Helping one person this week",
          "Creating, writing, art, building",
          "Caring for family or partner",
          "Health and physical mastery",
          "Faith, service, or community",
        ],
        glowColor: "270 70% 65%",
      },
      {
        title: "Quick",
        highlight: "Exercises",
        intro: "Take 20 minutes with a notebook. No pressure to share. No 'right' answers.",
        bullets: [
          "What actually matters to me now?",
          "What used to energize me before this role?",
          "Who in my life could use my help?",
          "What would I do if money stopped being the metric?",
          "What did I admire in others this month?",
          "What kind of person do I want to become?",
        ],
        glowColor: "20 80% 65%",
      },
      {
        title: "Stories of",
        highlight: "Reinvention",
        intro:
          "Across history and today, the most grounded second chapters rarely come from chasing the old role harder. They come from people who used the gap to listen, and then rebuilt slowly around what they actually valued.",
        glowColor: "190 80% 55%",
      },
    ]}
    faqs={[
      {
        question: "How do I find purpose when I feel completely lost?",
        answer:
          "Start microscopic. Pick one small act of contribution this week, helping a friend, learning something, finishing a creative project. Purpose is built through action, not discovered through thinking.",
      },
      {
        question: "Is it normal to feel like nothing matters after a layoff?",
        answer:
          "Very common, especially in the first weeks. It's often grief, not nihilism. As routine and connection return, meaning usually does too, sometimes in unexpected places.",
      },
      {
        question: "How do I separate my self-worth from my job title?",
        answer:
          "Notice the language you use about yourself. Replace 'I am a [job title]' with 'I do [job title]'. Then deliberately spend time on identities that aren't work, family member, friend, learner, creator.",
      },
      {
        question: "What if I find a new purpose that pays less?",
        answer:
          "That's a real choice many people make. The key is making it consciously, with clear numbers and a workable plan, not as an escape from a hard job search.",
      },
    ]}
    ctaTitle="You are more than employment status."
    ctaSubtitle="The version of you that emerges from this can be more honest and more grounded than the one that walked in."
    related={[
      {
        title: "Mental Health Support",
        href: "/rebuild/mental-health",
        description: "Stabilize emotionally before forcing big identity decisions.",
      },
      {
        title: "Community & Belonging",
        href: "/rebuild/community",
        description: "Purpose grows fastest in conversation with people who get it.",
      },
      {
        title: "Future Direction",
        href: "/rebuild/future-direction",
        description: "Translate new clarity into a sane next step, not a panic move.",
      },
    ]}
  />
);

export default Purpose;
