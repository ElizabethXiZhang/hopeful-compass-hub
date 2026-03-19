import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import EmotionalValidationSection from "@/components/home/EmotionalValidationSection";
import AIRevolutionSection from "@/components/home/AIRevolutionSection";
import MissionSection from "@/components/home/MissionSection";
import PillarsSection from "@/components/home/PillarsSection";
import CommunitySection from "@/components/home/CommunitySection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EmotionalValidationSection />
      <AIRevolutionSection />
      <MissionSection />
      <PillarsSection />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
