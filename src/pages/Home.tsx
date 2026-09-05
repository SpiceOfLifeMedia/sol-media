import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ServiceTicker } from '@/components/sections/ServiceTicker';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { BrandKitOffer } from '@/components/sections/BrandKitOffer';

export default function Home() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <ServiceTicker />
        <SelectedWork />
        <BrandKitOffer />
      </main>
      <Footer />
    </div>
  );
}
