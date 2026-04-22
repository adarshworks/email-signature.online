"use client";

import { useI18n } from "./I18nProvider";
import { useState, useEffect } from "react";

export default function FAQModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { dict } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-hidden pointer-events-none">
      {/* Backdrop - captures clicks to close */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Modal Content - ensures it's always centered and fits viewport */}
      <div className="relative w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 max-h-full flex flex-col pointer-events-auto">


        <div className="flex items-center justify-between p-6 border-b border-border bg-surface/50 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-serif text-foreground font-medium">{dict.faq.title}</h2>
            <p className="text-subtext text-xs font-mono mt-1">{dict.faq.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-full transition-colors group"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-subtext group-hover:text-foreground">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">

          <div className="space-y-6">
            {dict.faq.questions.map((faq: { q: string; a: string }, index: number) => (
              <div key={index} className="space-y-3 group">
                <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-foreground text-background flex items-center justify-center text-[10px] font-mono shrink-0">Q{index + 1}</span>
                  {faq.q}
                </h3>
                <div className="pl-8">
                  <p className="text-sm text-subtext leading-relaxed font-sans">{faq.a}</p>
                </div>
                {index < dict.faq.questions.length - 1 && (
                  <div className="h-px w-full bg-gradient-to-r from-border via-border/20 to-transparent mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border bg-surface/30 flex justify-between items-center">
          <span className="text-[10px] font-mono text-subtext uppercase tracking-widest">email-signature.online • SEO optimized</span>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
