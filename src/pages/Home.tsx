import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ReelStage } from '@/components/sections/ReelStage';
import { Disconnect } from '@/components/sections/Disconnect';
import { Capabilities } from '@/components/sections/Capabilities';
import { Process } from '@/components/sections/Process';
import { WorkingWith } from '@/components/sections/WorkingWith';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  useSeo('', 'Spice of Life Media is a remote-first brand, web, SEO and content agency based in Adelaide, Australia. We make brands harder to ignore.');

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <ReelStage />
        <Disconnect />
        <Capabilities />
        <Process />
        <WorkingWith />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
