import { Wallet } from "lucide-react";
import PillarPage from "@/components/pillars/PillarPage";

const FinancialSurvival = () => (
  <PillarPage
    metaTitle="Financial Survival During Career Transition | Budget After Job Loss"
    metaDescription="Practical money tips after a layoff. Calculate your runway, prioritize spending, manage debt, and reduce financial stress with a 30-day stabilization plan."
    canonicalPath="/rebuild/financial-survival"
    keywords="budget after job loss, unemployment money tips, financial stress layoffs"
    HeroIcon={Wallet}
    accentGradient="from-emerald-500 to-teal-500"
    heroGlowColor="160 70% 45%"
    heroGlowSecondary="210 70% 55%"
    eyebrow="Pillar 3 · Financial Survival"
    h1="Money stress feels heavy."
    heroHighlight="Clarity reduces the pressure."
    heroSubtitle="Most financial fear comes from unclear numbers. The moment you see your real picture, the panic starts to shrink, even if the numbers aren't great."
    sections={[
      {
        title: "Why Money Feels",
        highlight: "Out of Control",
        intro:
          "Avoidance is the most expensive habit during unemployment. Looking at the numbers feels worse for an hour and better for a month.",
        bullets: [
          "You don't know your real monthly burn",
          "Multiple accounts, no overview",
          "Subscriptions you forgot about",
          "Debt minimums creeping up",
          "No clear runway in weeks or months",
          "Decisions made in panic, not plan",
        ],
        glowColor: "0 70% 55%",
      },
      {
        title: "Practical",
        highlight: "Help",
        intro: "Six concrete moves that bring stability faster than any single income win.",
        bullets: [
          "Calculate your runway in months",
          "Separate essential vs optional spending",
          "Rank debts by interest, not size",
          "Brainstorm temporary income ideas",
          "Build a 60-day emergency budget",
          "Negotiate bills, call, don't email",
        ],
        glowColor: "160 70% 45%",
      },
      {
        title: "Mistakes",
        highlight: "to Avoid",
        intro: "These quietly turn a hard month into a much harder year.",
        bullets: [
          "Panic spending or 'treat' shopping",
          "Hiding debt from your partner",
          "Ignoring statements and emails",
          "Withdrawing retirement money first",
          "Taking the first low offer out of fear",
          "Using new credit to pay old credit",
        ],
        glowColor: "20 80% 65%",
      },
    ]}
    checklists={[
      {
        title: "Days 1-10 · See It",
        items: [
          { label: "List every account & balance", description: "One simple sheet." },
          { label: "Calculate monthly essentials", description: "Rent, food, utilities, debt min." },
          { label: "Cancel 3 subscriptions today", description: "Quick wins build momentum." },
        ],
      },
      {
        title: "Days 11-20 · Stretch It",
        items: [
          { label: "Negotiate 2 bills", description: "Internet, insurance, phone." },
          { label: "Pause non-essentials", description: "Eating out, premium plans." },
          { label: "List 3 short-term income ideas", description: "Freelance, gig, contract." },
        ],
      },
      {
        title: "Days 21-30 · Plan It",
        items: [
          { label: "Set a weekly spend cap", description: "One number to track." },
          { label: "Pick a debt strategy", description: "Highest interest first." },
          { label: "Define your runway target", description: "How many months you need." },
        ],
      },
    ]}
    faqs={[
      {
        question: "How do I calculate my runway after losing my job?",
        answer:
          "Add up cash and accessible savings. Divide by your essential monthly spend (rent, food, utilities, transport, debt minimums, insurance). The result is your runway in months. Update it monthly.",
      },
      {
        question: "Should I pay off debt or save cash during unemployment?",
        answer:
          "During active unemployment, prioritize cash buffer over extra debt payments, keep paying minimums on time, but liquidity protects you from worse decisions later. Resume aggressive payoff once income stabilizes.",
      },
      {
        question: "Is it okay to take a lower-paid job to stabilize?",
        answer:
          "Often yes, especially if it preserves runway and mental energy for a better next move. The risk is staying too long. Set a review date when you accept it.",
      },
      {
        question: "What benefits or support should I check first?",
        answer:
          "Check unemployment benefits in your country, healthcare subsidies, and any severance, payout, or job-transition support from your former employer. See our Government Policies page for region-specific information.",
      },
    ]}
    ctaTitle="Small financial control creates emotional relief."
    ctaSubtitle="You don't need more money this week. You need a clearer picture of the money you already have."
    ctaPrimary={{ label: "View Policy Support", to: "/government-policies" }}
    related={[
      {
        title: "Mental Health Support",
        href: "/rebuild/mental-health",
        description: "Money stress and anxiety feed each other, work both at once.",
      },
      {
        title: "Future Direction",
        href: "/rebuild/future-direction",
        description: "Choose your next move from clarity instead of panic.",
      },
      {
        title: "Government Policies",
        href: "/government-policies",
        description: "See official support programs and safety nets in your region.",
      },
    ]}
  />
);

export default FinancialSurvival;
