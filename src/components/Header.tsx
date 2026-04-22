"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import FAQModal from "./FAQModal";
import { useI18n } from "./I18nProvider";

export default function Header({ onReset }: { onReset?: () => void }) {
  const { dict } = useI18n();
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center w-full h-16 border-b border-border bg-background/80 backdrop-blur-xl fixed top-0 z-50 transition-colors pr-4 sm:pr-6">
        {/* Left section: Aligned Logo & Branding */}
        <div className="flex items-center h-full select-none">
          <Link href="/" className="group flex items-center h-full">
            {/* Exactly 80px (w-20) wide to perfectly align with the sidebar below on desktop. */}
            <div className="w-16 sm:w-20 flex items-center justify-center h-full">
              <svg
                className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] text-foreground transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                viewBox="0 0 128 128"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <g>
                    <g>
                      <path d="m83.6 108c-.7 0-1.4-.2-1.9-.7-1.3-1.1-1.4-3-.3-4.2l2.9-3.4c1.3-2 3.5-3.2 5.8-3.1s4.3 1.4 5.4 3.5l.9 1.7c0 .1.1.2.3.2s.3-.1.3-.2l2.1-6.7c.9-2.8 3.3-4.8 6.2-5 2.9-.3 5.7 1.2 7 3.8l3 5.7c.6 1.1 1.6 1.8 2.8 2s2.4-.2 3.3-1.1c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2-2.2 2.2-5.3 3.2-8.4 2.8-3.1-.5-5.7-2.3-7.2-5.1l-3-5.7c-.3-.6-.9-.7-1.2-.6-.3 0-.8.2-1 .8l-2.1 6.7c-.8 2.5-2.9 4.2-5.5 4.4s-5-1.2-6.2-3.5l-.9-1.7c-.1-.2-.2-.2-.2-.2-.1 0-.4.1-.6.4-.1.1-.2.3-.3.4l-3 3.5c-.7.7-1.5 1.1-2.4 1.1z" />
                    </g>
                  </g>
                  <path d="m104 20h-80c-7.2 0-13 5.8-13 13v62c0 7.2 5.8 13 13 13h25c1.7 0 3-1.3 3-3s-1.3-3-3-3h-25c-3.9 0-7-3.1-7-7v-62c0-3.9 3.1-7 7-7h80c3.9 0 7 3.1 7 7v44c0 1.7 1.3 3 3 3s3-1.3 3-3v-44c0-7.2-5.8-13-13-13z" />
                </g>
                <path d="m65 102c-1.7 0-3 1.3-3 3s1.3 3 3 3h4c1.7 0 3-1.3 3-3s-1.3-3-3-3z" fill="currentColor" />
                <path d="m100.6 47.8s-20.4 24.2-36.6 24.2-36.6-24.2-36.6-24.2" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
              </svg>
            </div>
            <span className="text-[20px] sm:text-[22px] font-serif text-foreground font-medium tracking-tight -ml-2 sm:-ml-3 leading-none -translate-y-[-0.5px] hidden sm:block">{dict.common.title}</span>
          </Link>
        </div>

        {/* Right section: Utilities */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Reset Action */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-[13px] font-medium text-subtext hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
            title={dict.common.reset}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[16px]">device_reset</span>
            <span className="hidden sm:inline">{dict.common.reset}</span>
          </button>

          {/* FAQ Toggle */}
          <button
            onClick={() => setIsFAQOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-foreground hover:bg-surface transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            <span className="hidden sm:inline">{dict.common.faq}</span>
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

        </div>
      </header>

      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </>


  );
}

