import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import EmotionalValidationSection from "@/components/home/EmotionalValidationSection";
import MissionSection from "@/components/home/MissionSection";
import CommunitySection from "@/components/home/CommunitySection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EmotionalValidationSection />
      <MissionSection />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
