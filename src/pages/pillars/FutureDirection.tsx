import { Rocket } from "lucide-react";
import PillarPage from "@/components/pillars/PillarPage";

const FutureDirection = () => (
  <PillarPage
    metaTitle="Future Direction Without Panic | Next Step After Unemployment"
    metaDescription="Plan your next career move calmly. A 30-day direction framework to choose between job search, freelancing, business, or reskilling, without panic."
    canonicalPath="/rebuild/future-direction"
    keywords="what to do after layoff, career direction after AI, next step after unemployment"
    HeroIcon={Rocket}
    accentGradient="from-amber-500 to-orange-500"
    heroGlowColor="35 85% 60%"
    heroGlowSecondary="190 80% 55%"
    eyebrow="Pillar 6 · Future Direction"
    h1="You do not need"
    heroHighlight="all the answers today."
    heroSubtitle="Most regret after a layoff comes from rushed pivots, not from waiting too long. A clearer direction beats a faster one. Progress beats panic."
    sections={[
      {
        title: "Why People",
        highlight: "Panic-Pivot",
        intro: "Three weeks of fear can produce a five-year detour. Notice the pull before you act on it.",
        bullets: [
          "Anxiety mistaken for clarity",
          "Comparing yourself to fast-movers",
          "Pressure from family or partner",
          "Fear of 'gap' on the resume",
          "Money clock louder than the plan",
          "Chasing trends instead of strengths",
        ],
        glowColor: "0 70% 55%",
      },
      {
        title: "A Better",
        highlight: "Approach",
        intro: "Choose direction based on inputs you actually control.",
        bullets: [
          "Strengths, what you do better than most",
          "Energy, what doesn't drain you",
          "Lifestyle goals, what kind of life you want",
          "Market reality, where money actually moves",
          "Curiosity, what you'd explore for free",
          "Risk capacity, runway and dependents",
        ],
        glowColor: "190 80% 55%",
      },
      {
        title: "Possible",
        highlight: "Paths",
        intro: "These aren't ranked. The right one depends on you, not the trend cycle.",
        bullets: [
          "Job search, same field, better fit",
          "Freelancing, sell skills you already have",
          "Business, solve a problem you understand",
          "Reskilling, invest 3-12 months in a pivot",
          "Portfolio career, multiple income streams",
          "Simpler lifestyle, lower spend, lower pressure",
        ],
        glowColor: "270 70% 65%",
      },
    ]}
    checklists={[
      {
        title: "Week 1 · Listen",
        items: [
          { label: "Stop applying for 7 days", description: "Yes, really." },
          { label: "Journal: energy & drain audit", description: "Past 3 jobs, honest." },
          { label: "Talk to 2 people in different paths", description: "Curiosity, not pressure." },
        ],
      },
      {
        title: "Weeks 2-3 · Test",
        items: [
          { label: "Pick 2 directions to explore", description: "Not 7. Two." },
          { label: "Run a tiny experiment in each", description: "Conversation, project, or course." },
          { label: "Track what energizes you", description: "Energy beats logic here." },
        ],
      },
      {
        title: "Week 4 · Commit",
        items: [
          { label: "Choose one primary direction", description: "Backup is allowed." },
          { label: "Define a 90-day plan", description: "3 outcomes, not 30 tasks." },
          { label: "Schedule a monthly review", description: "Direction is a habit." },
        ],
      },
    ]}
    faqs={[
      {
        question: "What should I do in the first month after a layoff?",
        answer:
          "Stabilize before you strategize. Sleep, runway, and one honest conversation matter more in week 1 than a perfect application. From week 2, start small experiments toward direction, not commitments.",
      },
      {
        question: "Should I switch careers or look for the same role?",
        answer:
          "Switch only if at least two are true: you've been unhappy for a while, your old field is shrinking, you have runway for a learning curve, and you've validated the new field with real conversations.",
      },
      {
        question: "How do I explain a career gap to employers?",
        answer:
          "Briefly and confidently. 'I was let go in [month]. I used the time to [recover, learn X, take on Y project]. I'm focused on roles like [target] now.' Employers respect clarity more than continuity.",
      },
      {
        question: "Is freelancing or starting a business a good move after a layoff?",
        answer:
          "It can be, especially if you already have a sellable skill and 6+ months of runway. It's a hard move with no runway and no audience. Run small paid experiments before committing.",
      },
    ]}
    ctaTitle="Progress beats panic."
    ctaSubtitle="You're allowed to move slowly and wisely. The right next step is usually closer than the perfect one."
    related={[
      {
        title: "Financial Survival",
        href: "/rebuild/financial-survival",
        description: "Know your runway so you can choose direction with calm math.",
      },
      {
        title: "Purpose Beyond Work",
        href: "/rebuild/purpose",
        description: "Direction without meaning becomes the next layoff waiting to happen.",
      },
      {
        title: "Community & Belonging",
        href: "/rebuild/community",
        description: "Most great next moves arrive through people, not job boards.",
      },
    ]}
  />
);

export default FutureDirection;
