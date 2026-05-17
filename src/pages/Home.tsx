import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Problem } from "@/components/sections/Problem";
import { MainOffer } from "@/components/sections/MainOffer";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { MediaSupport } from "@/components/sections/MediaSupport";
import { WhyUs } from "@/components/sections/WhyUs";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Comparison } from "@/components/sections/Comparison";
import { FAQ } from "@/components/sections/FAQ";
import { Urgency } from "@/components/sections/Urgency";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <TrustStrip />
      <Problem />
      <MainOffer />
      <Packages />
      <Process />
      <MediaSupport />
      <WhyUs />
      <SelectedWork />
      <Comparison />
      <FAQ />
      <Urgency />
      <Contact />
    </Layout>
  );
}
