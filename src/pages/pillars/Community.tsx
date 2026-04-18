import { Users } from "lucide-react";
import PillarPage from "@/components/pillars/PillarPage";

const CommunityPillar = () => (
  <PillarPage
    metaTitle="Community Support During Hard Times | Loneliness After Unemployment"
    metaDescription="Reconnect after a layoff. How community and honest conversation reduce loneliness, restore perspective, and create unexpected opportunities."
    canonicalPath="/rebuild/community"
    keywords="loneliness after unemployment, support after layoffs, community mental health"
    HeroIcon={Users}
    accentGradient="from-cyan-500 to-blue-500"
    heroGlowColor="200 80% 55%"
    heroGlowSecondary="20 80% 65%"
    eyebrow="Pillar 5 · Community & Relationships"
    h1="Isolation makes pain louder."
    heroHighlight="Connection softens it."
    heroSubtitle="After a setback, most people quietly withdraw. Calls get returned later, events get skipped, and the silence starts to confirm the shame. The fix is usually one honest conversation."
    sections={[
      {
        title: "Why People",
        highlight: "Withdraw",
        intro: "Pulling back feels protective in the moment. Over weeks, it makes everything heavier.",
        bullets: [
          "Shame about being unemployed",
          "Not wanting to 'bring people down'",
          "Energy too low for small talk",
          "Comparison with friends doing well",
          "Avoiding 'so what do you do?' questions",
          "Believing you should 'fix it first'",
        ],
        glowColor: "270 60% 65%",
      },
      {
        title: "Why Community",
        highlight: "Helps",
        intro: "Connection isn't a soft extra. It's a core driver of recovery.",
        bullets: [
          "Outside perspective on your situation",
          "Gentle accountability and rhythm",
          "Emotional safety to be honest",
          "A felt sense of belonging",
          "Unexpected opportunities and intros",
          "Reminder that you're not alone in this",
        ],
        glowColor: "200 80% 55%",
      },
      {
        title: "How to",
        highlight: "Reconnect",
        intro: "Small, low-cost moves. None of these require you to be 'doing well' first.",
        bullets: [
          "Talk to one friend honestly this week",
          "Join one online community (Discord, forum)",
          "Show up at one in-person event",
          "Help someone else with something small",
          "Ask for support clearly, not vaguely",
          "Reply to one message you've been avoiding",
        ],
        glowColor: "190 80% 55%",
      },
      {
        title: "Relationship",
        highlight: "Stress",
        intro:
          "Unemployment stresses every close relationship. Naming the strain reduces it. Hiding it amplifies it.",
        bullets: [
          "Money tension with a partner",
          "Communication going short or sharp",
          "Feeling like a burden at home",
          "Comparison with employed friends",
          "Family pressure to 'just take anything'",
          "Self-worth shrinking inside the relationship",
        ],
        glowColor: "20 80% 65%",
      },
    ]}
    faqs={[
      {
        question: "How do I tell friends and family I lost my job?",
        answer:
          "Keep it short and direct: 'I was let go. I'm okay, I'm working through next steps, and I'd appreciate your support.' You don't owe a full story or a polished plan.",
      },
      {
        question: "What if I feel too embarrassed to reach out?",
        answer:
          "Embarrassment is a sign that the muscle hasn't been used in a while. Start with the lowest-risk person you know. One conversation usually unlocks the next two.",
      },
      {
        question: "How do I deal with comparison on social media?",
        answer:
          "Mute or unfollow accounts that consistently leave you feeling worse. This isn't avoidance — it's protecting your nervous system while you rebuild. You can always re-follow later.",
      },
      {
        question: "Where can I find a real community for people in this situation?",
        answer:
          "Our community space is built for exactly this. You can also find peer groups in industry-specific Discords, local meetups, and reskilling cohorts where everyone is mid-transition.",
      },
    ]}
    ctaTitle="You were never meant to carry this alone."
    ctaSubtitle="One honest conversation can shift more than a week of overthinking."
    ctaPrimary={{ label: "Join the Community", to: "/community" }}
    related={[
      {
        title: "Mental Health Support",
        href: "/rebuild/mental-health",
        description: "Stabilize what you're feeling so connection feels safer.",
      },
      {
        title: "Purpose Beyond Work",
        href: "/rebuild/purpose",
        description: "Rediscover identity in conversation with people who understand.",
      },
      {
        title: "Future Direction",
        href: "/rebuild/future-direction",
        description: "Most opportunities still arrive through people, not portals.",
      },
    ]}
  />
);

export default CommunityPillar;
