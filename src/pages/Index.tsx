import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import EmotionalValidationSection from "@/components/home/EmotionalValidationSection";
import AIRevolutionSection from "@/components/home/AIRevolutionSection";
import PerspectiveSection from "@/components/home/PerspectiveSection";
import MeaningSection from "@/components/home/MeaningSection";
import CommunitySection from "@/components/home/CommunitySection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <EmotionalValidationSection />
      <AIRevolutionSection />
      <PerspectiveSection />
      <MeaningSection />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
