import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import EmotionalValidationSection from "@/components/home/EmotionalValidationSection";
import AIRevolutionSection from "@/components/home/AIRevolutionSection";
import CommunitySection from "@/components/home/CommunitySection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EmotionalValidationSection />
      <AIRevolutionSection />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
