"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "./I18nProvider";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export default function LanguageSwitcher() {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    setIsOpen(false);
    const newPathname = pathname.replace(`/${locale}`, `/${code}`);
    router.push(newPathname);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface/50 backdrop-blur-md hover:bg-surface transition-all duration-200 group"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="text-[13px] font-medium text-foreground hidden sm:inline">{currentLang.name}</span>
        <span className={`material-symbols-outlined text-[18px] text-subtext transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-1.5 mb-1">
            <span className="text-[10px] font-mono text-subtext uppercase tracking-widest">Select Language</span>
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-2 text-[13px] transition-colors hover:bg-surface ${
                locale === lang.code ? "text-foreground font-bold bg-surface/50" : "text-subtext"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {locale === lang.code && (
                <span className="material-symbols-outlined text-[16px] text-foreground">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
