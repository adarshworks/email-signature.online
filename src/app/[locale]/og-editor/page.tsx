"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OGEditorPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    title: "Email Signature",
    subtitle: "Generator Online",
    description: "For professionals, freelancers, and modern businesses.",
    titleSize: 65,
    descriptionSize: 24,
    iconSize: 100,
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
    accentColor: "#888888",
    cta: "Create yours for free",
    url: "email-signature.online",
    mockName: "Jane Cooper",
    mockTitle: "Director of Design • Acme Corp"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [mounted, setMounted] = useState(false);

  // Load initial settings and handle mounting
  useEffect(() => {
    setMounted(true);
    const fetchSettings = async () => {
      try {
        const res = await import("@/config/og-settings.json");
        setSettings(res.default);
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name.endsWith("Size") ? parseInt(value) : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("Saving...");
    try {
      const res = await fetch("/api/og/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaveStatus("Saved successfully!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Failed to save.");
      }
    } catch (e) {
      setSaveStatus("Error saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // Construct preview URL - only add cache buster on client to avoid hydration mismatch
  const previewUrl = `/api/og?${new URLSearchParams({
    ...Object.entries(settings).reduce((acc, [k, v]) => ({ ...acc, [k]: v.toString() }), {}),
    ...(mounted ? { t: Date.now().toString() } : {})
  }).toString()}`;

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter mb-4">OG EDITOR</h1>
            <p className="text-zinc-500 text-xl max-w-md leading-relaxed">
              Tweak your SEO visual identity in real-time. Changes here affect how your site appears when shared.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {saveStatus && <span className="text-zinc-400 font-mono text-sm uppercase animate-pulse">{saveStatus}</span>}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="xl:col-span-4 space-y-10 bg-[#0A0A0A] p-8 border border-zinc-900 rounded-sm">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Typography</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Main Title</label>
                <input 
                  name="title" 
                  value={settings.title} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Subtitle</label>
                <input 
                  name="subtitle" 
                  value={settings.subtitle} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Description Line</label>
                <textarea 
                  name="description" 
                  value={settings.description} 
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Signature Mock Data</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Avatar Image URL</label>
                <input 
                  name="avatar" 
                  value={settings.avatar || ""} 
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Mockup Name</label>
                <input 
                  name="mockName" 
                  value={settings.mockName || "Jane Cooper"} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Mockup Title & Company</label>
                <input 
                  name="mockTitle" 
                  value={settings.mockTitle || "Director of Design • Acme Corp"} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Call to Action</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">CTA Button Text</label>
                <input 
                  name="cta" 
                  value={settings.cta} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Website URL</label>
                <input 
                  name="url" 
                  value={settings.url} 
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Scaling</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Text Size</label>
                  <input 
                    type="number" 
                    name="titleSize" 
                    value={settings.titleSize} 
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Icon Size</label>
                  <input 
                    type="number" 
                    name="iconSize" 
                    value={settings.iconSize} 
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Colors</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-zinc-400">Background</label>
                  <input 
                    type="color" 
                    name="backgroundColor" 
                    value={settings.backgroundColor} 
                    onChange={handleChange}
                    className="bg-transparent border-none w-10 h-10 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-zinc-400">Text Color</label>
                  <input 
                    type="color" 
                    name="textColor" 
                    value={settings.textColor} 
                    onChange={handleChange}
                    className="bg-transparent border-none w-10 h-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="xl:col-span-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Live Engine Preview</h3>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative border border-zinc-800 rounded-sm overflow-hidden bg-black aspect-[1200/630] shadow-2xl">
                <img 
                  src={previewUrl} 
                  alt="OG Preview" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] p-6 border border-zinc-900 rounded-sm">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Meta Tag Output
              </h4>
              <code className="text-xs text-zinc-500 break-all block font-mono">
                {`<meta property="og:image" content="${typeof window !== 'undefined' ? window.location.origin : ''}${previewUrl}" />`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
