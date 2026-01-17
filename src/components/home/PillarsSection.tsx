import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import { Heart, Compass, Wallet, Users, Globe, Leaf, TrendingDown } from "lucide-react";
const pillars = [{
  icon: TrendingDown,
  title: "Current Global Job Cuts",
  description: "Understanding the global impact of AI-driven job displacement and staying informed about workforce changes worldwide.",
  color: "from-red-500 to-rose-500",
  link: null
}, {
  icon: Heart,
  title: "Mental Health Support",
  description: "Providing emotional resources, coping strategies, and professional guidance for those navigating job loss and career uncertainty.",
  color: "from-rose-500 to-pink-500",
  link: null
}, {
  icon: Leaf,
  title: "Healthy Lifestyle",
  description: "Promoting physical wellness, mental balance, and sustainable self-care practices to maintain well-being during times of transition.",
  color: "from-lime-500 to-green-500",
  link: null
}, {
  icon: Compass,
  title: "Meaning Beyond Work",
  description: "Helping individuals discover purpose, identity, and fulfillment outside of traditional employment structures.",
  color: "from-violet-500 to-purple-500",
  link: null
}, {
  icon: Users,
  title: "Community & Belonging",
  description: "Creating safe spaces where people can connect, share experiences, and support one another through change.",
  color: "from-cyan-500 to-blue-500",
  link: null
}, {
  icon: Wallet,
  title: "Financial Resilience",
  description: "Offering practical tools and education for building financial stability during times of career transition.",
  color: "from-emerald-500 to-teal-500",
  link: null
}, {
  icon: Globe,
  title: "Government Policy Updates",
  description: "Advocating for Universal Basic Income, social safety nets, and global adaptation strategies for the AI economy.",
  color: "from-amber-500 to-orange-500",
  link: "/government-policies"
}];
const PillarsSection = () => {
  const navigate = useNavigate();
  return <section className="relative py-24 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl mb-6">Build Your Six Pillars<span className="gradient-text">Pillars</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">The foundation of your support system, designed to address every aspect of wellbeing during unemployment.</p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="space-y-6">
          {pillars.map((pillar, index) => <motion.div key={pillar.title} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} viewport={{
          once: true
        }} onClick={() => pillar.link && navigate(pillar.link)} className={pillar.link ? "cursor-pointer" : ""}>
              <GlassCard className={`p-6 sm:p-8 ${pillar.link ? "group" : ""}`} hover>
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} ${pillar.link ? "group-hover:scale-110 transition-transform" : ""}`}>
                    <pillar.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2 relative inline-block">
                      {pillar.title}
                      {pillar.link && <span className="ml-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>)}
        </div>

        {/* Closing Statement */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="mt-16 text-center">
          <GlassCard className="p-8 sm:p-10" variant="strong">
            <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-medium italic">
              "In times of profound change, it is the learners who inherit the earth, 
              while the learned find themselves beautifully equipped to deal with a 
              world that no longer exists."
            </p>
            <p className="text-muted-foreground mt-4">— Eric Hoffer</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>;
};
export default PillarsSection;