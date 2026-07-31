export function Disconnect() {
  const problems = [
    { num: '01', title: 'DATED IDENTITY', desc: 'The brand looks like an earlier, smaller company.' },
    { num: '02', title: 'UNCLEAR MESSAGE', desc: "Visitors can't quickly tell what you do best." },
    { num: '03', title: 'A WEBSITE THAT UNDERSELLS', desc: 'The site reads below the quality of the work.' },
    { num: '04', title: 'INVISIBLE IN SEARCH', desc: "The people already looking can't find you." },
    { num: '05', title: 'SCATTERED CONTENT', desc: 'Posting happens, but without direction or system.' },
  ];

  return (
    <section className="bg-[var(--paper)] py-[76px] md:py-[96px] px-5 md:px-12 text-[var(--ink)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="caps-label text-[rgba(22,21,15,0.65)] mb-8">THE DISCONNECT</div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-12">
          <h2 className="text-[36px] md:text-[54px] font-[800] leading-[1.05] tracking-[-0.025em] max-w-[18ch]" style={{ fontStretch: '125%' }}>
            Your business evolved.<br/>
            Your digital presence didn't<span className="text-[var(--verm)]">.</span>
          </h2>
          <p className="text-[16px] leading-[1.6] text-[rgba(22,21,15,0.72)] max-w-[430px]">
            Established businesses outgrow the way they show up. It's rarely one problem — it is often a disconnected system that can make the business harder to understand and choose.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 mt-[52px]">
          {problems.map((p) => (
            <div key={p.num} className="border-t border-[rgba(22,21,15,0.25)] pt-4 flex flex-col gap-3">
              <div className="text-[11px] font-[800] tracking-[0.1em] text-[var(--verm-text-light)]">{p.num}</div>
              <div className="text-[16.5px] font-[800] leading-[1.2]" style={{ fontStretch: '120%' }}>{p.title}</div>
              <div className="text-[13px] leading-[1.5] text-[rgba(22,21,15,0.62)] pr-4">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
