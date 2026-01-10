import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickAccessSection } from "@/components/home/QuickAccessSection";
import { FeaturedTemplates } from "@/components/home/FeaturedTemplates";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuickAccessSection />
      <FeaturedTemplates />
    </Layout>
  );
};

export default Index;
