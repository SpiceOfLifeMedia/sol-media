const services = ['Website design', 'Branding', 'SEO', 'Content'];

export function ServiceTicker() {
  return (
    <div className="overflow-hidden bg-[var(--verm)] py-4 text-[var(--ink)]" aria-label="Website design, branding, SEO and content">
      <div className="service-ticker flex w-max whitespace-nowrap" aria-hidden="true">
        {[0, 1].map((group) => (
          <div key={group} className="flex w-screen shrink-0 items-center justify-around">
            {services.map((service) => (
              <div key={`${group}-${service}`} className="flex items-center">
                <span className="px-4 text-[15px] font-[850] uppercase tracking-[0.09em] md:px-8 md:text-[17px]">{service}</span>
                <span className="text-[18px] font-[900]">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
