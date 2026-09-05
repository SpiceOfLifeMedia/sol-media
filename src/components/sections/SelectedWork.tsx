import { Link } from 'wouter';

const FULL_CIRCLE_DESKTOP = '/assets/work/full-circle-website-desktop.png';
const HILLIER_DESKTOP = '/assets/work/hillier-website-desktop.webp';
const HILLIER_MOBILE = '/assets/work/hillier-website-mobile.webp';
const PETIOLA_DESKTOP = '/assets/work/petiola-wilson-desktop.webp';
const PETIOLA_MOBILE = '/assets/work/petiola-wilson-mobile.webp';

type SelectedWorkProps = {
  showAllLink?: boolean;
};

export function SelectedWork({ showAllLink = true }: SelectedWorkProps) {
  const projects = [
    {
      href: '/work/full-circle-hair-society',
      name: 'Full Circle Hair Society',
      type: 'Hair salon',
      desktop: FULL_CIRCLE_DESKTOP,
      mobile: FULL_CIRCLE_DESKTOP,
      alt: 'Full Circle Hair Society website designed by Spice of Life Media',
    },
    {
      href: '/work/hillier-plumbing-excavation',
      name: 'Hillier Plumbing & Excavation',
      type: 'Trades and excavation',
      desktop: HILLIER_DESKTOP,
      mobile: HILLIER_MOBILE,
      alt: 'Hillier Plumbing and Excavation website designed by Spice of Life Media',
    },
    {
      href: '/work/petiola-wilson',
      name: 'Petiola Wilson',
      type: 'Cultural speaker and educator',
      desktop: PETIOLA_DESKTOP,
      mobile: PETIOLA_MOBILE,
      alt: 'Petiola Wilson website designed by Spice of Life Media',
    },
  ];

  return (
    <section className="bg-[var(--paper)] px-5 py-20 text-[var(--ink)] md:px-12 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="caps-label mb-4 text-[var(--verm-text-light)]">OUR WORK</div>
            <h2 className="text-[38px] font-[800] leading-none tracking-[-0.03em] md:text-[56px]">
              Real websites for real businesses<span className="text-[var(--verm)]">.</span>
            </h2>
          </div>
          {showAllLink && (
            <Link href="/work" className="group inline-flex items-center gap-2 text-[14px] font-[800] text-[var(--verm-text-light)]">
              See all work <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.name} href={project.href} className="group overflow-hidden border border-[rgba(22,21,15,0.16)] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ink)]">
                <picture>
                  <source media="(max-width: 767px)" srcSet={project.mobile} />
                  <img
                    src={project.desktop}
                    alt={project.alt}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    loading="lazy"
                    decoding="async"
                    width="1512"
                    height="900"
                  />
                </picture>
              </div>
              <div className="flex items-end justify-between gap-5 p-6">
                <div>
                  <div className="mb-2 text-[12px] font-[700] uppercase tracking-[0.08em] text-[rgba(22,21,15,0.55)]">{project.type}</div>
                  <h3 className="text-[22px] font-[800] leading-[1.1] tracking-[-0.02em]">{project.name}</h3>
                </div>
                <span className="text-[20px] text-[var(--verm-text-light)] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
