import { Link } from 'wouter';

const FULL_CIRCLE_DESKTOP = '/assets/work/full-circle-tablet-showcase.webp';
const HILLIER_DESKTOP = '/assets/work/hillier-tablet-showcase.webp';
const PETIOLA_DESKTOP = '/assets/work/petiola-tablet-showcase.webp';

type SelectedWorkProps = {
  showAllLink?: boolean;
};

export function SelectedWork({ showAllLink = true }: SelectedWorkProps) {
  const projects = [
    {
      href: '/work/full-circle-hair-society',
      name: 'Full Circle Hair Society',
      desktop: FULL_CIRCLE_DESKTOP,
      alt: 'Full Circle Hair Society website designed by Spice of Life Media',
    },
    {
      href: '/work/hillier-plumbing-excavation',
      name: 'Hillier Plumbing & Excavation',
      desktop: HILLIER_DESKTOP,
      alt: 'Hillier Plumbing and Excavation website designed by Spice of Life Media',
    },
    {
      href: '/work/petiola-wilson',
      name: 'Petiola Wilson',
      desktop: PETIOLA_DESKTOP,
      alt: 'Petiola Wilson website designed by Spice of Life Media',
    },
  ];

  return (
    <section className="bg-[var(--paper)] px-5 py-16 text-[var(--ink)] md:px-12 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[38px] font-[800] leading-none tracking-[-0.03em] md:text-[52px]">
            Websites we’ve built<span className="text-[var(--verm)]">.</span>
          </h2>
          {showAllLink && (
            <Link href="/work" className="group inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm-text-light)]">
              See all work <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <Link key={project.name} href={project.href} className="group block">
              <div className="rounded-[28px] bg-[var(--ink)] p-[10px] shadow-[0_18px_45px_rgba(22,21,15,0.16)] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-white">
                  <img
                    src={project.desktop}
                    alt={project.alt}
                    className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.015]"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="900"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-5 px-1">
                <h3 className="text-[20px] font-[800] leading-[1.1] tracking-[-0.02em]">{project.name}</h3>
                <span className="text-[20px] text-[var(--verm-text-light)] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
