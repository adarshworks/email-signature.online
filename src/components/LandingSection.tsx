"use client";

import { useI18n } from "./I18nProvider";

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface Step {
  title: string;
  desc: string;
}

interface FAQ {
  q: string;
  a: string;
}

export default function LandingSection() {
  const { dict } = useI18n();
  const { landing } = dict;

  if (!landing) return null;

  return (
    <div className="w-full bg-background relative selection:bg-foreground selection:text-background border-t border-border">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-12 py-24 sm:py-32 space-y-32">

        {/* Editorial Hero Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-border">
            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-serif tracking-tighter leading-[0.95] text-foreground max-w-5xl uppercase">
              {landing.hero.title}
            </h1>
            <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-subtext block">
                {landing.hero.badge}
              </span>
              <p className="text-sm font-sans text-subtext leading-relaxed">
                {landing.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Brutalist Features Grid */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">
              {landing.features.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-y border-border">
            {(landing.features.list as Feature[]).map((feature, i) => (
              <div key={i} className="group flex flex-col justify-between p-8 sm:p-12 min-h-[320px] bg-background hover:bg-foreground hover:text-background transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px] font-light opacity-50 group-hover:opacity-100 transition-opacity">
                  {feature.icon}
                </span>
                <div className="space-y-4">
                   <h3 className="text-3xl font-serif tracking-tight">{feature.title}</h3>
                   <p className="text-xs font-mono leading-relaxed opacity-60">
                     {feature.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Structured Steps */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 pt-16">
          <div className="lg:col-span-4 lg:pr-12">
            <h2 className="text-4xl sm:text-6xl font-serif tracking-tighter leading-none sticky top-32 uppercase">
              {landing.howItWorks.title}
            </h2>
            <div className="mt-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-subtext">
                {landing.howItWorks.badge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-border border-y border-border">
            {(landing.howItWorks.steps as Step[]).map((step, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-8 sm:gap-16 py-12 group">
                <div className="text-[120px] font-serif leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--border)] group-hover:[-webkit-text-stroke:2px_var(--foreground)] transition-all duration-300 select-none">
                  {i + 1}
                </div>
                <div className="flex flex-col justify-center space-y-4 max-w-md">
                  <h4 className="text-2xl font-serif tracking-tight text-foreground uppercase">{step.title}</h4>
                  <p className="text-sm font-sans text-subtext leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial SEO & FAQ Split */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 pt-24">
          {/* Manifesto / SEO Text */}
          <div className="space-y-12">
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tighter leading-[1.1] uppercase">
              {landing.seo.title}
            </h2>
            <div className="space-y-8 text-sm font-sans leading-loose text-subtext columns-1 sm:columns-2 gap-8">
              <p className="break-inside-avoid-column">{landing.seo.p1}</p>
              <p className="break-inside-avoid-column">{landing.seo.p2}</p>
              <p className="break-inside-avoid-column">{landing.seo.p3}</p>
            </div>
          </div>

          {/* FAQ as a structured index */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 pb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">
                {landing.faq.badge}
              </span>
            </div>

            <div className="flex flex-col divide-y divide-border border-y border-border">
              {(dict.faq.questions as FAQ[]).map((q, i) => (
                <div key={i} className="py-8 space-y-4 pr-8">
                  <h4 className="text-lg font-serif tracking-tight text-foreground">
                    <span className="text-xs font-mono opacity-50 mr-4">0{i + 1}</span>
                    {q.q}
                  </h4>
                  <p className="text-xs font-mono text-subtext leading-relaxed pl-8">
                    {q.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Footer Section */}
        <section className="pt-32 pb-12 border-t border-border space-y-16">
          <div className="flex flex-col items-center text-center space-y-12">
            <h2 className="text-[12vw] font-serif tracking-tighter leading-none text-foreground select-none opacity-5 uppercase">
              Signature
            </h2>
            <div className="flex flex-col items-center gap-6 -mt-[6vw]">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex flex-col items-center gap-4 transition-all duration-200 hover:-translate-y-2 active:scale-90 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-foreground group-hover:bg-foreground/[0.03] transition-all duration-200">
                  <span className="material-symbols-outlined text-[20px] group-hover:text-foreground">north</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-subtext group-hover:text-foreground transition-colors duration-200">
                  {landing.footer.backToTop}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-subtext">
            <div className="space-y-2">
              <div>{landing.footer.performance}</div>
              <div className="text-foreground">{landing.footer.techStack}</div>
            </div>
            <div className="text-center md:text-right space-y-2">
              <div>{new Date().getFullYear()} © {landing.footer.rights}</div>
              <div className="text-foreground">{landing.footer.designedBy} Adarsh Kumar</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
