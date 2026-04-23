"use client";

import { Tab, SignatureData } from "@/components/SignatureApp";
import { useI18n } from "./I18nProvider";


interface EditorProps {
  activeTab: Tab;
  data: SignatureData;
  updateData: (updates: Partial<SignatureData>) => void;
}

export default function Editor({ activeTab, data, updateData }: EditorProps) {
  const { dict } = useI18n();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const SIZE = 200;
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, SIZE, SIZE);
          const dataUrl = canvas.toDataURL("image/webp", 0.8);
          updateData({ avatarUrl: dataUrl });
        }
      };
      if (typeof ev.target?.result === "string") {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const renderIdentity = () => (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif text-foreground font-medium">{dict.editor.identity.title}</h1>
        <p className="text-subtext text-sm font-mono tracking-tight">{dict.editor.identity.subtitle}</p>
      </div>


      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.profileImage}</label>

          <div className="flex items-center gap-4">
            {data.avatarUrl ? (
              <div className="relative group">
                <img src={data.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-border" /> {/* eslint-disable-line @next/next/no-img-element */}
                <button 
                  onClick={() => updateData({ avatarUrl: "" })}
                  className="absolute inset-0 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Image"
                  aria-label="Remove Image"
                >
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">delete</span>
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center">
                <span className="material-symbols-outlined text-subtext">person</span>
              </div>
            )}
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-xs font-mono text-foreground hover:border-subtext transition-colors bg-background">
                <span className="material-symbols-outlined text-sm">upload</span>
                {dict.editor.identity.upload}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <p className="text-[10px] text-subtext mt-1.5 font-mono">{dict.editor.identity.maxSize}</p>
            </div>

          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.fullName}</label>

          <input
            id="fullName"
            className="w-full bg-background border border-border p-3 font-mono text-sm focus:border-foreground focus:ring-0 transition-all outline-none rounded-lg text-foreground hover:border-subtext"
            type="text"
            placeholder="e.g. Johnathan Doe"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="profTitle" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.jobTitle}</label>

          <input
            id="profTitle"
            className="w-full bg-background border border-border p-3 font-mono text-sm focus:border-foreground focus:ring-0 transition-all outline-none rounded-lg text-foreground hover:border-subtext"
            type="text"
            placeholder="e.g. Senior Product Designer"
            value={data.profTitle}
            onChange={(e) => updateData({ profTitle: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.company}</label>

          <input
            id="company"
            className="w-full bg-background border border-border p-3 font-mono text-sm focus:border-foreground focus:ring-0 transition-all outline-none rounded-lg text-foreground hover:border-subtext"
            type="text"
            placeholder="e.g. Cyberdyne Systems"
            value={data.company}
            onChange={(e) => updateData({ company: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.email}</label>

          <input
            id="email"
            className="w-full bg-background border border-border p-3 font-mono text-sm focus:border-foreground focus:ring-0 transition-all outline-none rounded-lg text-foreground hover:border-subtext"
            type="email"
            placeholder="e.g. john@cyberdyne.io"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.phone}</label>

          <input
            id="phone"
            className="w-full bg-background border border-border p-3 font-mono text-sm focus:border-foreground focus:ring-0 transition-all outline-none rounded-lg text-foreground hover:border-subtext"
            type="text"
            placeholder="e.g. +1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.identity.location}</label>

          <input
            id="location"
            className="w-full bg-background border border-border p-3 font-mono text-sm focus:border-foreground focus:ring-0 transition-all outline-none rounded-lg text-foreground hover:border-subtext"
            type="text"
            placeholder="e.g. Palo Alto, California"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  const renderSocials = () => {
    const labels: Record<string, string> = {
      linkedin: dict.editor.socials.linkedin,
      github: dict.editor.socials.github,
      twitter: dict.editor.socials.twitter,
      portfolio: dict.editor.socials.portfolio,
      whatsapp: dict.editor.socials.whatsapp,
      instagram: dict.editor.socials.instagram,
    };

    const moveSocialItem = (index: number, direction: 'up' | 'down') => {
      const newOrder = [...data.socialOrder];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newOrder.length) return;
      
      const [movedItem] = newOrder.splice(index, 1);
      newOrder.splice(targetIndex, 0, movedItem);
      updateData({ socialOrder: newOrder });
    };

    const socialIcons: Record<string, string> = {
      linkedin: "fa-brands fa-linkedin",
      github: "fa-brands fa-github",
      twitter: "fa-brands fa-x-twitter",
      portfolio: "fa-solid fa-globe",
      whatsapp: "fa-brands fa-whatsapp",
      instagram: "fa-brands fa-instagram",
    };

    return (
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-foreground font-medium">{dict.editor.socials.title}</h1>
          <p className="text-subtext text-sm font-mono tracking-tight">{dict.editor.socials.subtitle}</p>
        </div>


        <div className="space-y-8">
          {data.socialOrder.map((key, index) => {
            const socialKey = key as keyof typeof data.socials;
            return (
              <div key={key} className="space-y-4 group/item">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-subtext text-sm">drag_indicator</span>
                    <i className={`${socialIcons[key]} text-sm text-foreground/40`} />
                    <label htmlFor={`social-${key}`} className="text-[11px] font-mono text-subtext tracking-tight uppercase">{labels[key]}</label>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => moveSocialItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-background rounded disabled:opacity-20 text-subtext hover:text-foreground transition-colors"
                      title="Move up"
                    >
                      <span className="material-symbols-outlined text-xs">expand_less</span>
                    </button>
                    <button 
                      onClick={() => moveSocialItem(index, 'down')}
                      disabled={index === data.socialOrder.length - 1}
                      className="p-1 hover:bg-background rounded disabled:opacity-20 text-subtext hover:text-foreground transition-colors"
                      title="Move down"
                    >
                      <span className="material-symbols-outlined text-xs">expand_more</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <input
                      id={`social-${key}`}
                      className="bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-foreground transition-all duration-200 outline-none rounded-lg hover:border-subtext"
                      type="text"
                      placeholder={`Enter ${labels[key]} URL...`}
                      value={data.socials[socialKey].url}
                      onChange={(e) =>
                        updateData({
                          socials: {
                            ...data.socials,
                            [socialKey]: { ...data.socials[socialKey], url: e.target.value },
                          },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono text-subtext tracking-tight whitespace-nowrap">{dict.editor.socials.displayPrefs}</span>

                    <div className="flex gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={data.socials[socialKey].showIcon}
                          onChange={(e) =>
                            updateData({
                              socials: {
                                ...data.socials,
                                [socialKey]: { ...data.socials[socialKey], showIcon: e.target.checked },
                              },
                            })
                          }
                        />
                        <div className="w-4 h-4 rounded border border-border peer-checked:border-foreground flex items-center justify-center transition-all bg-background group-hover:border-subtext peer-checked:[&_svg]:opacity-100">
                          <svg 
                            className="w-2.5 h-2.5 text-foreground opacity-0 transition-opacity" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-mono text-subtext group-hover:text-foreground transition-colors tracking-tight whitespace-nowrap">{dict.editor.socials.icon}</span>

                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={data.socials[socialKey].showLabel}
                          onChange={(e) =>
                            updateData({
                              socials: {
                                ...data.socials,
                                [socialKey]: { ...data.socials[socialKey], showLabel: e.target.checked },
                              },
                            })
                          }
                        />
                        <div className="w-4 h-4 rounded border border-border peer-checked:border-foreground flex items-center justify-center transition-all bg-background group-hover:border-subtext peer-checked:[&_svg]:opacity-100">
                          <svg 
                            className="w-2.5 h-2.5 text-foreground opacity-0 transition-opacity" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-mono text-subtext group-hover:text-foreground transition-colors tracking-tight whitespace-nowrap">{dict.editor.socials.label}</span>

                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStyle = () => (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif text-foreground font-medium">{dict.editor.style.title}</h1>
        <p className="text-subtext text-sm font-mono tracking-tight">{dict.editor.style.subtitle}</p>
      </div>


      {/* Color Control */}
      <div className="space-y-4">
        <label id="primary-color-label" className="block text-[11px] font-mono text-subtext tracking-tight">{dict.editor.style.primaryColor}</label>

        <div className="grid grid-cols-5 gap-2" role="group" aria-labelledby="primary-color-label">
          {[
            { color: "#2563EB", label: "Indigo" },
            { color: "#059669", label: "Teal" },
            { color: "#D97706", label: "Amber" },
            { color: "#DC2626", label: "Crimson" },
            { color: "#7C3AED", label: "Violet" },
            { color: "#111827", label: "Charcoal" },
            { color: "#0F766E", label: "Dark teal" },
            { color: "#B45309", label: "Brown" },
            { color: "#9D174D", label: "Rose" },
          ].map(({ color, label }) => (
            <button
              key={color}
              title={label}
              aria-label={label}
              className={`aspect-square border-2 transition-all duration-200 active:scale-95 rounded-lg ${
                data.style.primaryColor === color ? "border-foreground scale-105 z-10 shadow-md" : "border-transparent hover:border-subtext/40"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateData({ style: { ...data.style, primaryColor: color } })}
            />
          ))}
          <div className="aspect-square bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 relative flex items-center justify-center border border-border overflow-hidden group cursor-pointer rounded-lg">
            <span className="material-symbols-outlined text-xs z-10 pointer-events-none text-white" aria-hidden="true">colorize</span>
            <input
              type="color"
              aria-label="Custom color picker"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              value={data.style.primaryColor}
              onChange={(e) => updateData({ style: { ...data.style, primaryColor: e.target.value } })}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 bg-surface p-3 border border-border rounded-lg shadow-sm">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: data.style.primaryColor }}></div>
          <span className="text-xs font-mono text-foreground uppercase">{data.style.primaryColor}</span>
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-4">
        <label className="block text-[11px] font-mono text-subtext tracking-tight">{dict.editor.style.fontFamily}</label>

        <div className="space-y-1.5">
          {[
            { id: "Arial",            label: "Arial",             style: { fontFamily: "'Arial', sans-serif" } },
            { id: "Inter",            label: "Inter",             style: { fontFamily: "'Inter', sans-serif" } },
            { id: "DM Sans",          label: "DM Sans",           style: { fontFamily: "'DM Sans', sans-serif" } },
            { id: "Space Grotesk",    label: "Space Grotesk",     style: { fontFamily: "'Space Grotesk', sans-serif" } },
            { id: "Outfit",           label: "Outfit",            style: { fontFamily: "'Outfit', sans-serif" } },
            { id: "Plus Jakarta Sans",label: "Plus Jakarta Sans", style: { fontFamily: "'Plus Jakarta Sans', sans-serif" } },
            { id: "Newsreader",       label: "Newsreader",        style: { fontFamily: "'Newsreader', Georgia, serif", fontStyle: "italic" } },
            { id: "Playfair Display", label: "Playfair Display",  style: { fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" } },
            { id: "Lora",             label: "Lora",              style: { fontFamily: "'Lora', Georgia, serif" } },
            { id: "Roboto Mono",      label: "Roboto Mono",       style: { fontFamily: "'Roboto Mono', monospace" } },
          ].map((font) => (
            <button
              key={font.id}
              onClick={() => updateData({ style: { ...data.style, fontFamily: font.id } })}
              className={`w-full flex items-center justify-between px-4 py-3 border transition-all duration-200 rounded-xl ${
                data.style.fontFamily === font.id
                  ? "bg-background border-foreground text-foreground shadow-sm"
                  : "bg-surface/50 border-border text-subtext hover:border-foreground/30 hover:bg-background/60"
              }`}
            >
              <span className="text-[13px]" style={font.style}>{font.label}</span>
              {data.style.fontFamily === font.id && (
                <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Sliders */}
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="font-size" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.style.fontSize}</label>
            <span className="text-xs font-mono text-subtext">{data.style.fontSize}px</span>
          </div>

          <input
            id="font-size"
            className="w-full"
            max="24"
            min="12"
            type="range"
            value={data.style.fontSize}
            onChange={(e) => updateData({ style: { ...data.style, fontSize: parseInt(e.target.value) } })}
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="line-height" className="text-[11px] font-mono text-subtext tracking-tight">{dict.editor.style.lineHeight}</label>
            <span className="text-xs font-mono text-subtext">{data.style.lineHeight}</span>
          </div>

          <input
            id="line-height"
            className="w-full"
            max="2"
            min="1"
            step="0.1"
            type="range"
            value={data.style.lineHeight}
            onChange={(e) => updateData({ style: { ...data.style, lineHeight: parseFloat(e.target.value) } })}
          />
        </div>
      </div>

      {/* Border Weight */}
      <div className="space-y-4">
        <label className="block text-[11px] font-mono text-subtext tracking-tight">{dict.editor.style.borderWeight}</label>

        <div className="flex gap-2">
          {[0, 1, 2].map((weight) => (
            <button
              key={weight}
              onClick={() => updateData({ style: { ...data.style, borderWeight: weight } })}
              className={`flex-1 py-3 text-xs font-mono border transition-all duration-200 rounded-lg ${
                data.style.borderWeight === weight
                  ? "bg-foreground border-foreground text-background font-bold shadow-lg shadow-black/10"
                  : "bg-surface border-border text-subtext hover:border-foreground"
              }`}
            >
              {weight}px
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStructure = () => {
    const moveItem = (index: number, direction: 'up' | 'down') => {
      const newOrder = [...data.structure.contentOrder];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newOrder.length) return;
      
      const [movedItem] = newOrder.splice(index, 1);
      newOrder.splice(targetIndex, 0, movedItem);
      updateData({ structure: { ...data.structure, contentOrder: newOrder } });
    };

    return (
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-foreground font-medium">{dict.editor.structure.title}</h1>
          <p className="text-subtext text-sm font-mono tracking-tight">{dict.editor.structure.subtitle}</p>
        </div>

        
        <section className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: "minimal",   label: "Minimal",   desc: "Name · title · contacts, one line",      icon: "remove" },
              { id: "classic",   label: "Classic",   desc: "Circular avatar, horizontal",            icon: "person" },
              { id: "executive", label: "Executive", desc: "Italic serif, small-caps, dots",          icon: "workspace_premium" },
              { id: "modern",    label: "Modern",    desc: "Square avatar, company pill badge",       icon: "view_column" },
              { id: "corporate", label: "Corporate", desc: "Two-column split with divider",           icon: "grid_view" },
              { id: "bold",      label: "Bold",      desc: "28px name, accent underline",            icon: "format_size" },
              { id: "elegant",   label: "Elegant",   desc: "Company above, large name",              icon: "star" },
              { id: "startup",   label: "Startup",   desc: "Square avatar, icon-pill socials",       icon: "rocket_launch" },
              { id: "creative",  label: "Creative",  desc: "Avatar, italic name, colored pill",      icon: "palette" },
              { id: "compact",   label: "Compact",   desc: "Single-line strip, pipe-separated",      icon: "compress" },
            ].map((layout) => (
              <button
                key={layout.id}
                onClick={() => updateData({ structure: { ...data.structure, layout: layout.id } })}
                className={`flex items-center justify-between px-4 py-3 border transition-all duration-200 rounded-xl ${
                  data.structure.layout === layout.id
                    ? "bg-background border-foreground text-foreground"
                    : "bg-surface/50 border-border text-subtext hover:border-foreground/30 hover:bg-background/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[17px] text-foreground/60">{layout.icon}</span>
                  <div className="text-left">
                    <div className="text-[12px] font-semibold">{layout.label}</div>
                    <div className="text-[10px] opacity-40 font-mono">{layout.desc}</div>
                  </div>
                </div>
                {data.structure.layout === layout.id && (
                  <svg className="w-3.5 h-3.5 text-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Content Order */}
        <section className="space-y-6">
          <h3 className="font-serif text-xl text-foreground italic">{dict.editor.structure.contentOrder}</h3>

          <div className="space-y-2">
            {data.structure.contentOrder.map((item, index) => {
              const labels: Record<string, string> = {
                avatar: dict.editor.structure.labels.avatar,
                info: dict.editor.structure.labels.info,
                contacts: dict.editor.structure.labels.contacts,
                socials: dict.editor.structure.labels.socials,
              };

              return (
                <div 
                  key={item} 
                  className="flex items-center justify-between p-3 bg-surface border border-border transition-colors group hover:border-subtext rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-subtext text-sm">drag_indicator</span>
                    <span className="text-xs font-mono text-foreground uppercase tracking-tight">{labels[item]}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      aria-label={`Move ${labels[item]} up`}
                      className="p-1 hover:bg-background rounded disabled:opacity-20 text-subtext hover:text-foreground"
                    >
                      <span className="material-symbols-outlined text-xs" aria-hidden="true">expand_less</span>
                    </button>
                    <button 
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === data.structure.contentOrder.length - 1}
                      aria-label={`Move ${labels[item]} down`}
                      className="p-1 hover:bg-background rounded disabled:opacity-20 text-subtext hover:text-foreground"
                    >
                      <span className="material-symbols-outlined text-xs" aria-hidden="true">expand_more</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visual Density */}
        <section className="space-y-6">
          <h3 className="font-serif text-xl text-foreground italic">{dict.editor.structure.visualDensity}</h3>

          <div className="flex gap-1 bg-surface p-1 border border-border rounded-xl">
            {["relaxed", "balanced", "tight"].map((d) => (
              <button
                key={d}
                onClick={() => updateData({ structure: { ...data.structure, density: d as "relaxed" | "balanced" | "tight" } })}
                className={`flex-1 py-3 text-[11px] font-mono tracking-tight transition-all duration-300 rounded-xl border ${
                  data.structure.density === d
                    ? "bg-background border-foreground text-foreground font-bold shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
                    : "bg-transparent border-transparent text-subtext hover:text-foreground hover:bg-background/40"
                }`}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="p-8">
      {activeTab === "identity" && renderIdentity()}
      {activeTab === "socials" && renderSocials()}
      {activeTab === "style" && renderStyle()}
      {activeTab === "structure" && renderStructure()}
    </div>
  );
}
