import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Link } from 'wouter';

const services = [
  {
    title: 'Website design',
    copy: 'New websites and complete rebuilds that make your business easy to understand and contact.',
    href: '/services/websites-rebuilds',
  },
  {
    title: 'Branding',
    copy: 'A clear logo, colour system and message that make your business look consistent.',
    href: '/services/brand-systems',
  },
  {
    title: 'SEO',
    copy: 'The search foundations your website needs to be understood and found by Google.',
    href: '/services/seo-search-growth',
  },
  {
    title: 'Content',
    copy: 'Practical content and social media support that keeps your business visible.',
    href: '/services/social-content-systems',
  },
];

export default function Capabilities() {
  useSeo();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <Header />
      <main className="w-full flex-1 pt-[64px]">
        <section className="px-5 py-20 md:px-12 md:py-24">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="mb-12 text-[48px] font-[800] leading-none tracking-[-0.03em] md:text-[72px]" style={{ fontStretch: '125%' }}>
              How we can help<span className="text-[var(--verm)]">.</span>
            </h1>

            <div className="grid gap-px bg-[rgba(22,21,15,0.18)] sm:grid-cols-2">
              {services.map((service) => (
                <Link key={service.title} href={service.href} className="group flex min-h-[220px] flex-col justify-between bg-white p-7 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] md:p-9">
                  <div>
                    <h2 className="mb-4 text-[30px] font-[800] tracking-[-0.02em]">{service.title}</h2>
                    <p className="max-w-[36ch] text-[16px] leading-[1.6] text-[rgba(22,21,15,0.66)] transition-colors group-hover:text-[rgba(242,238,230,0.7)]">
                      {service.copy}
                    </p>
                  </div>
                  <span className="mt-8 text-[20px] text-[var(--verm)] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
