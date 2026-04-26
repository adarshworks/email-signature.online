"use client";
import { useI18n } from "./I18nProvider";

export default function Footer() {
  const { dict } = useI18n();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-6 sm:h-7 bg-surface border-t border-border z-[60] flex items-center justify-between px-3 sm:px-4 select-none">

      {/* Left: Project & Version */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-subtext/60 tracking-tight font-bold">Email Signature Online v1.2</span>
        </div>
        <div className="h-3 w-[1px] bg-border/50 hidden sm:block" />
      </div>

      {/* Right: Credits & GitHub */}
      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href="https://github.com/adarshworks/email-signature.online"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[10px] font-mono text-subtext/60 hover:text-foreground transition-colors group"
        >
          <i className="fa-brands fa-github text-[12px] opacity-70 group-hover:opacity-100" />
          <span className="hidden sm:inline">{dict.common.source}</span>
        </a>

        <div className="flex items-center gap-1">
          <span className="text-[9px] font-mono text-subtext/40">{dict.common.by}</span>
          <a
            href="https://github.com/adarshworks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-foreground/70 hover:text-foreground transition-all font-bold"
          >
            Adarsh Kumar
          </a>
        </div>
      </div>

    </footer>
  );
}


