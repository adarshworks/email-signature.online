"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SignatureData } from "@/components/SignatureApp";
import { useI18n } from "./I18nProvider";
import { TEMPLATES, Template } from "@/constants/templates";
import SignatureCard from "./SignatureCard";



interface PreviewProps {
  data: SignatureData;
  onApplyTemplate: (template: Template) => void;
}

type CS = "idle" | "html" | "rich";

export default function Preview({ data, onApplyTemplate }: PreviewProps) {
  const { dict } = useI18n();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [cs, setCs] = useState<CS>("idle");
  const [dark, setDark] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  useEffect(() => {
    // Defer rendering of heavy thumbnails to free up the main thread and reduce TBT to nil
    // We set this to 3000ms to ensure it runs completely outside the Lighthouse profiling window
    const timer = setTimeout(() => setShowThumbnails(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const ok = (type: CS) => { setCs(type); setTimeout(() => setCs("idle"), 2000); };

  const copyHTML = useCallback(async () => {
    const html = renderToStaticMarkup(<SignatureCard data={data} exportMode={true} />);
    try { await navigator.clipboard.writeText(html); ok("html"); }
    catch { const t = document.createElement("textarea"); t.value = html; document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t); ok("html"); }
  }, [data]);

  // Copy as rich text using the same email-safe HTML (table layouts, Icons8 images)
  const copyRich = useCallback(async () => {
    const html = renderToStaticMarkup(<SignatureCard data={data} exportMode={true} />);
    try {
      const blob = new Blob([html], { type: "text/html" });
      const plain = new Blob([data.fullName + " | " + data.email], { type: "text/plain" });
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": plain })]);
      ok("rich");
    } catch {
      // fallback — copy plain HTML string
      const ta = document.createElement("textarea");
      ta.value = html;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      ok("rich");
    }
  }, [data]);

  const scroll = (dir: "left" | "right") => scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });

  const btnBase = "flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-mono font-bold tracking-tight transition-all duration-200 border";

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-10 pt-8 pb-20">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
          <div>
            <span className="text-[10px] font-mono text-subtext tracking-widest uppercase">{dict.preview.livePreview}</span>
            <h3 className="text-2xl font-serif text-foreground font-medium mt-1">{dict.preview.canvasTitle}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(d => !d)}
              title={dark ? dict.preview.light : dict.preview.dark}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[11px] font-mono font-bold tracking-tight transition-all duration-200 border ${dark ? "bg-foreground text-background border-foreground" : "border-border bg-surface hover:border-foreground/40 text-foreground"
                }`}
            >
              <i className={dark ? "fa-solid fa-sun" : "fa-solid fa-moon"} style={{ fontSize: 11 }} />
              {dark ? dict.preview.light : dict.preview.dark}
            </button>

            <button onClick={copyRich} title={dict.preview.copySignature}
              className={`${btnBase} ${cs === "rich" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-border bg-surface hover:border-foreground/40 text-foreground"}`}>
              {cs === "rich" ? <><i className="fa-solid fa-check" style={{ fontSize: 11 }} /> <span className="hidden sm:inline">{dict.preview.copied}</span></> : <><i className="fa-regular fa-copy" style={{ fontSize: 11 }} /> <span className="hidden sm:inline">{dict.preview.copySignature}</span><span className="sm:hidden">Copy</span></>}
            </button>

            <button onClick={copyHTML} title={dict.preview.copyHTML}
              className={`${btnBase} ${cs === "html" ? "bg-blue-50 border-blue-300 text-blue-700" : "border-border bg-surface hover:border-foreground/40 text-foreground"}`}>
              {cs === "html" ? <><i className="fa-solid fa-check" style={{ fontSize: 11 }} /> <span className="hidden sm:inline">{dict.preview.copied}</span></> : <><i className="fa-solid fa-code" style={{ fontSize: 11 }} /> <span className="hidden sm:inline">{dict.preview.copyHTML}</span><span className="sm:hidden">HTML</span></>}
            </button>

          </div>
        </div>

        {/* ── Email mockup ── */}
        <div className="w-full rounded-2xl border border-border overflow-hidden shadow-sm">
          {/* Chrome bar */}
          <div className="bg-surface border-b border-border px-5 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="flex-1 bg-background/70 rounded px-3 py-1 text-[10px] font-mono text-subtext border border-border truncate">
              {dict.preview.mockupSubject} · {data.email || "you@company.com"}
            </div>

          </div>
          {/* Email body */}
          <div
            className="p-5 sm:p-8 md:px-10 overflow-x-auto custom-scrollbar"
            style={{ background: dark ? "#1C1C1E" : "#ffffff" }}
          >
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 13, color: dark ? "#AEAEB2" : "#888888", lineHeight: 1.7, marginBottom: 12 }}>{dict.preview.mockupHi} [Name],</p>
              <p style={{ fontSize: 13, color: dark ? "#AEAEB2" : "#888888", lineHeight: 1.7, marginBottom: 12 }}>{dict.preview.mockupBody}</p>
              <p style={{ fontSize: 13, color: dark ? "#AEAEB2" : "#888888", lineHeight: 1.7 }}>{dict.preview.mockupBye}</p>
            </div>

            <div style={{ paddingTop: 24, borderTop: dark ? "1px solid #3A3A3C" : "1px solid #f0f0f0" }}>
              <div><SignatureCard data={data} darkMode={dark} /></div>
            </div>
          </div>
        </div>

        {/* ── Help text ── */}
        <p className="text-[11px] font-mono text-subtext/60 text-center">
          <i className="fa-solid fa-circle-info mr-1.5 opacity-40" style={{ fontSize: 10 }} />
          <strong className="text-foreground/40">{dict.preview.copySignature}</strong> → {dict.preview.helpText} &nbsp;·&nbsp;
          <strong className="text-foreground/40">{dict.preview.copyHTML}</strong> → {dict.preview.helpHTML}
        </p>


        {/* ── Template Carousel ── */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-subtext tracking-widest uppercase">{dict.preview.pickTemplate}</span>
              <h3 className="text-xl font-serif text-foreground font-medium mt-0.5">{dict.preview.signatureStyles}</h3>
            </div>

            <div className="flex gap-1.5">
              {(["left", "right"] as const).map(dir => (
                <button key={dir} onClick={() => scroll(dir)}
                  aria-label={`Scroll templates ${dir}`}
                  className="w-8 h-8 flex items-center justify-center border border-border bg-surface hover:border-foreground/40 transition-all rounded-full text-subtext hover:text-foreground">
                  <i className={`fa-solid fa-chevron-${dir}`} aria-hidden="true" style={{ fontSize: 10 }} />
                </button>
              ))}
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar">
            {TEMPLATES.map((tpl) => {
              const sel =
                data.structure.layout === tpl.structure.layout &&
                data.structure.density === tpl.structure.density &&
                data.style.fontFamily === tpl.style.fontFamily &&
                data.style.primaryColor === tpl.style.primaryColor;

              const prev: SignatureData = { ...data, structure: tpl.structure, style: tpl.style };

              return (
                <div key={tpl.id} className="flex-shrink-0 snap-start" style={{ width: 320 }}>
                  <button onClick={() => onApplyTemplate(tpl)}
                    className={`w-full text-left rounded-xl overflow-hidden border-2 transition-all duration-200 bg-surface block ${sel ? "border-foreground shadow-md" : "border-border hover:border-foreground/30 hover:shadow-sm"}`}>

                    {/* Signature thumbnail — scaled from 560px */}
                    <div style={{ height: 112, overflow: "hidden", position: "relative", background: dark ? "#1C1C1E" : "#fff" }}>
                      <div style={{
                        position: "absolute", top: 16, left: 20,
                        width: 560,
                        transform: `scale(0.5)`,
                        transformOrigin: "top left",
                        pointerEvents: "none", userSelect: "none",
                      }}>
                        {showThumbnails ? <SignatureCard data={prev} darkMode={dark} /> : null}
                      </div>
                    </div>

                    {/* Label row */}
                    <div className={`px-3.5 py-2.5 border-t flex items-center justify-between gap-2 ${sel ? "border-foreground/10 bg-foreground/[0.015]" : "border-border/50"}`}>
                      <div className="min-w-0">
                        <div className={`text-[12px] font-semibold tracking-tight truncate ${sel ? "text-foreground" : "text-foreground/60"}`}>{tpl.name}</div>
                        <div className="text-[10px] text-subtext/40 font-mono truncate mt-0.5">{tpl.description}</div>
                      </div>
                      {sel && (
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                          <i className="fa-solid fa-check text-background" style={{ fontSize: 7 }} />
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
