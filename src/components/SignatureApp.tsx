"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import { useI18n } from "./I18nProvider";



export type Tab = "identity" | "structure" | "socials" | "style";

export interface SocialLink {
  url: string;
  showIcon: boolean;
  showLabel: boolean;
}

export interface SignatureData {
  fullName: string;
  profTitle: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  avatarUrl: string;
  socials: {
    linkedin: SocialLink;
    github: SocialLink;
    twitter: SocialLink;
    portfolio: SocialLink;
    whatsapp: SocialLink;
    instagram: SocialLink;
  };
  socialOrder: string[];
  style: {
    primaryColor: string;
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    borderWeight: number;
  };
  structure: {
    layout: string;
    contentOrder: string[];
    density: "relaxed" | "balanced" | "tight";
  };
}

export const INITIAL_DATA: SignatureData = {
  fullName: "Alexandra Mitchell",
  profTitle: "Senior Product Architect",
  email: "alexandra.m@lumina.tech",
  phone: "+1 (555) 000-1928",
  company: "Lumina Systems",
  location: "San Francisco, CA",
  avatarUrl: "/avatar.png",
  socials: {
    linkedin: { url: "linkedin.com/in/alexandramitchell", showIcon: true, showLabel: false },
    github: { url: "github.com/amitchell-dev", showIcon: true, showLabel: false },
    twitter: { url: "twitter.com/alexmitchell", showIcon: true, showLabel: false },
    portfolio: { url: "amitchell.studio", showIcon: true, showLabel: false },
    whatsapp: { url: "wa.me/15550001928", showIcon: true, showLabel: false },
    instagram: { url: "instagram.com/alexmitchell", showIcon: true, showLabel: false },
  },
  socialOrder: ["linkedin", "github", "twitter", "whatsapp", "instagram", "portfolio"],
  style: {
    primaryColor: "#000000",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: 1.5,
    borderWeight: 0,
  },
  structure: {
    layout: "minimal",
    contentOrder: ["info", "contacts", "socials"],
    density: "balanced",
  },
};

export default function SignatureApp() {
  const [activeTab, setActiveTab] = useState<Tab>("identity");
  const [data, setData] = useState<SignatureData>(INITIAL_DATA);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("signature_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedSocials = { ...INITIAL_DATA.socials, ...(parsed.socials || {}) };
        
        if (!mergedSocials.whatsapp?.url) mergedSocials.whatsapp = INITIAL_DATA.socials.whatsapp;
        if (!mergedSocials.instagram?.url) mergedSocials.instagram = INITIAL_DATA.socials.instagram;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData({
          ...INITIAL_DATA,
          ...parsed,
          socials: mergedSocials,
          style: { ...INITIAL_DATA.style, ...(parsed.style || {}) },
          structure: { ...INITIAL_DATA.structure, ...(parsed.structure || {}) }
        });
      }
    } catch (e) {
      console.error("Failed to parse local storage data", e);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("signature_data", JSON.stringify(data));
    }
  }, [data, mounted]);

  const updateData = (updates: Partial<SignatureData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const { dict } = useI18n();

  const resetData = () => {
    if (confirm(dict.common.resetConfirm || "Are you sure you want to reset everything?")) {
      setData(INITIAL_DATA);
      setActiveTab("identity");
      localStorage.removeItem("signature_data");
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background relative">
      {/* Editor Section - Occupies full viewport initially */}
      <div className="h-screen flex flex-col relative shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200/50 via-background to-background pointer-events-none -z-10 dark:from-gray-800/30"></div>
        <Header onReset={resetData} />

        <div className="flex flex-1 overflow-hidden pt-16 pb-[88px] md:pb-7">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex flex-col-reverse md:flex-row flex-1 relative z-0 overflow-hidden">
            <section className="w-full md:w-84 border-t md:border-t-0 md:border-r border-border bg-surface/80 backdrop-blur-md overflow-y-auto custom-scrollbar h-full">
              <Editor activeTab={activeTab} data={data} updateData={updateData} />
            </section>

            <section
              className="w-full md:flex-1 overflow-y-auto custom-scrollbar min-h-[45vh] md:min-h-0"
              style={{ scrollbarGutter: "stable" }}
            >
              <div className="min-h-full flex flex-col items-center justify-start p-6 lg:p-10">
                <Preview
                  data={data}
                  onApplyTemplate={(template) =>
                    updateData({ structure: template.structure, style: template.style })
                  }
                />
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>

      {/* SEO Landing Section - Below the Fold */}
      <LandingSection />
    </div>
  );
}
