import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { useSeo } from '@/hooks/useSeo';

export default function Work() {
  useSeo();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 pt-[64px]">
        <SelectedWork showAllLink={false} />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
