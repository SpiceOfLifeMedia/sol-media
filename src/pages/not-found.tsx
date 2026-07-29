import { useSeo } from '@/hooks/useSeo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'wouter';

export default function NotFound() {
  useSeo('Page Not Found', 'The page you are looking for does not exist.');

  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden bg-[var(--ink)] text-[var(--paper)]">
      <Header />
      <main className="flex-1 w-full flex items-center justify-center pt-[76px] px-5">
        <div className="max-w-[800px] text-center">
          <h1 className="text-[64px] md:text-[96px] leading-[1.02] font-[800] tracking-[-0.025em] mb-6 text-[var(--paper)]" style={{ fontStretch: '125%' }}>
            404<span className="text-[var(--verm)]">.</span>
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[rgba(242,238,230,0.7)] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="bg-[var(--verm)] text-[var(--ink)] text-[14.5px] font-[750] tracking-[0.02em] px-[28px] py-[16px] hover:bg-[var(--verm-pressed)] transition-colors inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
