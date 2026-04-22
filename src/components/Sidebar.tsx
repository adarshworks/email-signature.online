"use client";

import { Tab } from "@/components/SignatureApp";
import { useI18n } from "./I18nProvider";


interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { dict } = useI18n();
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "identity", label: dict.tabs.identity, icon: "fingerprint" },
    { id: "socials", label: dict.tabs.socials, icon: "share" },
    { id: "style", label: dict.tabs.style, icon: "palette" },
    { id: "structure", label: dict.tabs.structure, icon: "grid_view" },
  ];


  return (
    <aside className="w-full md:w-20 border-t md:border-t-0 md:border-r border-border flex flex-row md:flex-col bg-surface transition-all duration-500 z-50 fixed bottom-6 sm:bottom-7 left-0 md:relative md:bottom-auto md:left-auto">

      <div className="flex-1 flex flex-row md:flex-col items-center justify-around md:justify-start md:pb-10 md:space-y-1 px-2 md:px-0 h-16 md:h-auto">

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full h-full md:h-auto flex flex-col items-center justify-center md:py-4 transition-all duration-200 relative ${
                isActive 
                  ? "text-foreground bg-background/50 shadow-inner" 
                  : "text-subtext hover:text-foreground hover:bg-background/30"
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] md:text-[22px] mb-0.5 md:mb-1.5 ${isActive ? 'font-fill text-foreground' : 'opacity-80'} transition-transform`}>
                {tab.icon}
              </span>
              <span className={`text-[8px] md:text-[9px] font-mono tracking-widest transition-opacity ${isActive ? 'opacity-100 font-bold' : 'opacity-60'}`}>
                {tab.label}
              </span>
              
              {isActive && (
                <div className="absolute top-0 md:top-1/2 md:-translate-y-1/2 left-0 md:left-0 w-full h-[2px] md:w-1 md:h-12 bg-foreground md:rounded-r-full shadow-[0_2px_15px_rgba(0,0,0,0.1)] md:shadow-[2px_0_15px_rgba(0,0,0,0.1)]" />
              )}
            </button>
          );
        })}
      </div>
      
    </aside>
  );
}
