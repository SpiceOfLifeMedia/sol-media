export function WorkingWith() {
  const commitments = [
    {
      title: "A fixed project lead.",
      desc: "One person oversees every project from brief to delivery. No handoffs to a junior team halfway through."
    },
    {
      title: "Honest timelines.",
      desc: "We scope projects carefully and communicate early when anything changes. No surprises."
    },
    {
      title: "Work that can be measured.",
      desc: "Every recommendation connects to a business outcome, not just an aesthetic preference."
    },
    {
      title: "Australia-wide, remote-first.",
      desc: "Based in Adelaide and structured to work seamlessly with clients across Australia."
    }
  ];

  return (
    <section className="bg-[var(--paper)] py-[96px] px-5 md:px-12 text-[var(--ink)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="caps-label text-[rgba(22,21,15,0.65)] mb-8">HIGH STANDARDS. CLEAR COMMUNICATION.</div>
        
        <h2 className="text-[36px] md:text-[54px] font-[800] leading-[1.05] tracking-[-0.02em] max-w-[20ch] mb-16 md:mb-24" style={{ fontStretch: '125%' }}>
          Built to deliver —<br/>not just to present.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
          {commitments.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 max-w-[500px]">
              <h3 className="text-[18px] font-[800] tracking-tight">{item.title}</h3>
              <p className="text-[15.5px] leading-[1.6] text-[rgba(22,21,15,0.7)]">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 pt-10 border-t border-[rgba(22,21,15,0.15)]">
          <p className="text-[16px] leading-[1.6] text-[rgba(22,21,15,0.8)] max-w-[700px]">
            Every project is scoped around the expertise it needs, with one lead responsible for keeping strategy, delivery and communication connected.
          </p>
        </div>
      </div>
    </section>
  );
}
