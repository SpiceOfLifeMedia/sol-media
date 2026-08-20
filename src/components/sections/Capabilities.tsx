import { Link } from 'wouter';

export function Capabilities() {
  const caps = [
    {
      num: '01',
      title: 'DIGITAL PRESENCE\nAUDIT',
      sub: "Find what's holding the brand back — before anything gets rebuilt.",
      prob: 'Symptoms are easy to see. The audit finds the system underneath them.',
      out: '→ A clear roadmap: what should change, why it matters, and what happens first.',
      inc: 'Website audit · SEO audit · Brand & messaging review · Competitor review · Content review · Customer journey · Conversion review · Prioritised recommendations',
      link: '/services/digital-presence-audit',
      cta: 'Explore the audit',
      label: 'WHAT SHOULD CHANGE — AND WHAT HAPPENS FIRST',
      mediaType: 'audit'
    },
    {
      num: '02',
      title: 'BRAND SYSTEMS',
      sub: 'Build a brand people recognise, understand and trust.',
      prob: 'The business has moved forward, but its identity still signals an earlier stage.',
      out: '→ A coherent identity and message that operates consistently across every platform.',
      inc: 'Positioning · Audience · Messaging · Logo direction · Brand kits · Colour & typography · Digital guidelines · Social templates · Campaign direction',
      link: '/services/brand-systems',
      cta: 'Explore brand systems',
      label: 'ONE IDENTITY — EVERY PLATFORM',
      mediaType: 'brand'
    },
    {
      num: '03',
      title: 'WEBSITES &\nREBUILDS',
      sub: 'Turn the website into your strongest digital asset.',
      prob: 'The current website makes it harder for ideal clients to understand the offer and act.',
      out: '→ A premium website that communicates authority, gets found and turns attention into action.',
      inc: 'Website strategy · Information architecture · UX & UI · Website copy · Responsive design · New builds · Complete rebuilds · Landing pages · Conversion pathways · Analytics · Technical launch',
      link: '/services/websites-rebuilds',
      cta: 'Explore website design',
      label: 'ONE DESIGN — EVERY DEVICE',
      mediaType: 'web'
    },
    {
      num: '04',
      title: 'SEO &\nSEARCH GROWTH',
      sub: 'Get found by the people already looking for what you do.',
      prob: "Good work stays invisible when the site isn't structured for search intent.",
      out: '→ Sustained organic visibility that compounds over time and converts at the right stage.',
      inc: 'Technical SEO · On-page optimisation · Keyword strategy · Content architecture · Local SEO · Link building · Core Web Vitals · Search analytics · Long-term growth planning',
      link: '/services/seo-search-growth',
      cta: 'Explore SEO services',
      label: 'VISIBLE WHERE INTENT IS HIGHEST',
      mediaType: 'seo'
    },
    {
      num: '05',
      title: 'SOCIAL &\nCONTENT SYSTEMS',
      sub: 'Build a content system that runs — not a content calendar that collapses.',
      prob: 'Posting happens, but content is reactive, inconsistent and disconnected from the brand.',
      out: '→ A structured content system that reinforces the brand, builds authority and compounds over time.',
      inc: 'Content strategy · Platform selection · Content calendar · Template design · Campaign frameworks · Short-form video · Captions & copy · Scheduling systems · Performance review',
      link: '/services/social-content-systems',
      cta: 'Explore content systems',
      label: 'CONTENT WITH DIRECTION — NOT JUST POSTS',
      mediaType: 'content'
    }
  ];

  return (
    <section className="bg-[var(--paper)] px-5 md:px-12 pb-[96px]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Capabilities header bar */}
        <div className="flex items-center justify-between py-10 mb-8 border-b border-[rgba(22,21,15,0.18)]">
          <div className="caps-label text-[var(--ink)]">CAPABILITIES</div>
          <div className="caps-label text-[rgba(22,21,15,0.65)]">01–05 · CONNECTED DISCIPLINES</div>
        </div>

        {/* Capability Rows */}
        <div className="flex flex-col gap-20 md:gap-[120px]">
          {caps.map((cap, i) => {
            const isEven = i % 2 !== 0; // 0-indexed, so 1 (02) is even
            const TextBlock = (
              <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
                <div className="text-[13px] font-[800] tracking-[0.12em] text-[var(--verm-text-light)]">{cap.num}</div>
                <h2 className="text-[40px] md:text-[56px] leading-[1] font-[800] tracking-[-0.02em] text-[var(--ink)] whitespace-pre-line" style={{ fontStretch: '125%' }}>
                  {cap.title}
                </h2>
                <div className="text-[20px] md:text-[24px] leading-[1.3] font-[650] text-[var(--ink)] max-w-[26ch] mt-2">
                  {cap.sub}
                </div>
                <p className="text-[15.5px] leading-[1.55] text-[rgba(22,21,15,0.68)] max-w-[46ch]">
                  {cap.prob}
                </p>
                <p className="text-[15.5px] font-[650] text-[var(--ink)] max-w-[46ch]">
                  {cap.out}
                </p>
                <div className="text-[12px] tracking-[0.06em] uppercase leading-[1.9] text-[rgba(22,21,15,0.65)] mt-4">
                  {cap.inc}
                </div>
                <Link href={cap.link} className="group mt-4 text-[13.5px] font-[750] text-[var(--verm-text-light)] flex items-center gap-2 w-max">
                  {cap.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            );

            const MediaBlock = (
              <div className="w-full md:w-[560px] h-[360px] md:h-[440px] bg-[var(--ink-stage)] rounded-sm overflow-hidden relative group hover:-translate-y-2 transition-transform duration-300 flex-shrink-0 flex items-center justify-center">
                {/* Media internals based on type */}
                {cap.mediaType === 'audit' && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-[280px] h-[320px] border-[1.5px] border-[rgba(242,238,230,0.2)] rounded-md opacity-40"></div>
                    <div className="absolute top-[80px] left-[50px] bg-[var(--verm)] text-[var(--ink)] p-3 text-[10px] font-bold tracking-wider shadow-lg">PRIORITY 01<br/><span className="font-normal">Message clarity</span></div>
                    <div className="absolute top-[160px] right-[40px] bg-[var(--verm)] text-[var(--ink)] p-3 text-[10px] font-bold tracking-wider shadow-lg">PRIORITY 02<br/><span className="font-normal">Page architecture</span></div>
                    <div className="absolute bottom-[80px] left-[80px] bg-[var(--verm)] text-[var(--ink)] p-3 text-[10px] font-bold tracking-wider shadow-lg">PRIORITY 03<br/><span className="font-normal">Search structure</span></div>
                  </div>
                )}
                
                {cap.mediaType === 'brand' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-[120px] h-[120px] bg-[var(--paper)] text-[var(--ink)] flex items-center justify-center text-[54px] font-bold shadow-xl">N</div>
                      <div className="flex flex-col gap-2">
                        <div className="text-[28px] font-serif font-bold text-[var(--paper)]">Aa</div>
                        <div className="text-[12px] tracking-widest text-[rgba(242,238,230,0.5)]">CONCEPT STUDY</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-12 h-8 bg-[var(--paper)]"></div>
                      <div className="w-12 h-8 bg-[var(--verm)]"></div>
                      <div className="w-12 h-8 bg-[#2A2A2A]"></div>
                      <div className="w-12 h-8 bg-[#444]"></div>
                    </div>
                  </div>
                )}

                {cap.mediaType === 'web' && (
                  <Link
                    href="/work/full-circle-hair-society"
                    className="relative flex h-full w-full flex-col overflow-hidden text-[var(--paper)]"
                    aria-label="View the Full Circle Hair Society website rebuild case study"
                  >
                    <div className="relative h-[64%] min-h-0 overflow-hidden border-b border-[rgba(242,238,230,0.14)]">
                      <img
                        src="/assets/work/full-circle-website-desktop.png"
                        alt="Full Circle Hair Society website designed by SOL Media"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        width="1512"
                        height="773"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,21,15,0.22)] to-transparent" aria-hidden="true" />
                    </div>
                    <div className="relative flex flex-1 flex-col justify-center px-7 py-5 md:px-8">
                      <span className="absolute -top-7 left-7 h-14 w-[3px] bg-[var(--verm)] md:left-8" aria-hidden="true" />
                      <div className="text-[9px] font-[800] tracking-[0.22em] text-[var(--verm)]">CLIENT WORK</div>
                      <div className="mt-2 text-[20px] font-[800] leading-none tracking-[-0.01em] md:text-[22px]">FULL CIRCLE HAIR SOCIETY</div>
                      <div className="mt-2 text-[11px] text-[rgba(242,238,230,0.62)] md:text-[12.5px]">Website rebuild · Seacliff Park, Adelaide</div>
                      <div className="mt-3 text-[12px] font-[750] text-[var(--verm)]">See the case study <span aria-hidden="true">→</span></div>
                    </div>
                  </Link>
                )}

                {cap.mediaType === 'seo' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 px-10">
                    <div className="w-full bg-[var(--paper)] rounded-full h-[44px] flex items-center px-5 shadow-lg relative z-10">
                      <div className="w-4 h-4 border-[2px] border-[var(--ink)] rounded-full"></div>
                      <span className="ml-3 text-[14px] font-medium text-[var(--ink)]">brand agency australia</span>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <div className="text-[10px] tracking-wider text-[rgba(242,238,230,0.5)]">HOME &gt; SERVICES &gt; WEB DESIGN</div>
                      <div className="text-[20px] font-bold text-[#8AB4F8] hover:underline cursor-pointer">Australian Brand Agency | Concept Study</div>
                      <div className="text-[13px] text-[rgba(242,238,230,0.7)] mt-1 line-clamp-2">We audit, sharpen and rebuild the way your business shows up. Clear websites structured for people and search.</div>
                    </div>
                  </div>
                )}

                {cap.mediaType === 'content' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8 gap-4">
                    <div className="w-full flex justify-between items-center text-[var(--paper)] border-b border-[rgba(242,238,230,0.1)] pb-2">
                      <span className="text-[12px] tracking-widest font-bold">CONTENT CALENDAR</span>
                      <span className="text-[12px] tracking-widest font-bold opacity-50">MAY</span>
                    </div>
                    <div className="w-full grid grid-cols-7 gap-2">
                      {Array.from({ length: 28 }).map((_, idx) => (
                        <div key={idx} className={`aspect-square rounded-sm ${[4,9,12,18,22,25].includes(idx) ? 'bg-[var(--verm)]' : 'bg-[rgba(242,238,230,0.05)] border border-[rgba(242,238,230,0.1)]'}`}></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom label */}
                {cap.mediaType !== 'web' && (
                  <div className="absolute bottom-5 right-5 text-[9px] font-[800] tracking-[0.15em] text-[rgba(242,238,230,0.6)] z-20 bg-[var(--ink-stage)] px-2">
                    {cap.label}
                  </div>
                )}
              </div>
            );

            return (
              <div key={cap.num} className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-[80px] pt-12 border-t border-[rgba(22,21,15,0.14)]`}>
                {TextBlock}
                {MediaBlock}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
