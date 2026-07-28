import { SiteHeader } from "@/components/site/SiteHeader";
import {
  AgencyModelSection,
  ApproachSection,
  ConversionSection,
  HeroSection,
  PropositionSection,
  ServicesSection,
  SiteFooter,
  StudiesSection,
} from "@/components/site/HomeSections";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <PropositionSection />
        <ServicesSection />
        <StudiesSection />
        <ApproachSection />
        <AgencyModelSection />
        <ConversionSection />
      </main>
      <SiteFooter />
    </>
  );
}
