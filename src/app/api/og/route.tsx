import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import settings from "@/config/og-settings.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // Use settings from file as defaults, allow overrides from URL for real-time preview
  const name = searchParams.get("name");
  const title = searchParams.get("title") || settings.title;
  const subtitle = searchParams.get("subtitle") || settings.subtitle;
  const description = searchParams.get("description") || settings.description;
  const titleSize = parseInt(searchParams.get("titleSize") || settings.titleSize.toString());
  const descriptionSize = parseInt(searchParams.get("descriptionSize") || settings.descriptionSize.toString());
  const iconSize = parseInt(searchParams.get("iconSize") || settings.iconSize.toString());
  const backgroundColor = searchParams.get("backgroundColor") || settings.backgroundColor;
  const textColor = searchParams.get("textColor") || settings.textColor;
  const accentColor = searchParams.get("accentColor") || settings.accentColor;
  const cta = searchParams.get("cta") || settings.cta;
  const url = searchParams.get("url") || settings.url;
  const mockName = searchParams.get("mockName") || settings.mockName || "Jane Cooper";
  const mockTitle = searchParams.get("mockTitle") || settings.mockTitle || "Director of Design • Acme Corp";
  const avatar = searchParams.get("avatar") || settings.avatar;

  // Defensive checks for values
  const safeAvatar = (avatar && avatar.startsWith("http")) ? avatar : null;
  const safeBgColor = backgroundColor?.startsWith("#") ? backgroundColor : "#000000";
  const safeTextColor = textColor?.startsWith("#") ? textColor : "#FFFFFF";
  const safeAccentColor = accentColor?.startsWith("#") ? accentColor : "#888888";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: safeBgColor,
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Top Left: Logo */}
        <div style={{ display: "flex", position: "absolute", top: "60px", left: "60px" }}>
          <svg width={iconSize} height={iconSize} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" rx="24" fill="#111111" />
            <g transform="translate(16, 16) scale(0.75)" fill={safeTextColor}>
              <path d="m83.6 108c-.7 0-1.4-.2-1.9-.7-1.3-1.1-1.4-3-.3-4.2l2.9-3.4c1.3-2 3.5-3.2 5.8-3.1s4.3 1.4 5.4 3.5l.9 1.7c0 .1.1.2.3.2s.3-.1.3-.2l2.1-6.7c.9-2.8 3.3-4.8 6.2-5 2.9-.3 5.7 1.2 7 3.8l3 5.7c.6 1.1 1.6 1.8 2.8 2s2.4-.2 3.3-1.1c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2-2.2 2.2-5.3 3.2-8.4 2.8-3.1-.5-5.7-2.3-7.2-5.1l-3-5.7c-.3-.6-.9-.7-1.2-.6-.3 0-.8.2-1 .8l-2.1 6.7c-.8 2.5-2.9 4.2-5.5 4.4s-5-1.2-6.2-3.5l.9-1.7c-.1-.2-.2-.2-.2-.2-.1 0-.4.1-.6.4-.1.1-.2.3-.3.4l-3 3.5c-.7.7-1.5 1.1-2.4 1.1z" />
              <path d="m104 20h-80c-7.2 0-13 5.8-13 13v62c0 7.2 5.8 13 13 13h25c1.7 0 3-1.3 3-3s-1.3-3-3-3h-25c-3.9 0-7-3.1-7-7v-62c0-3.9 3.1-7 7-7h80c3.9 0 7 3.1 7 7v44c0 1.7 1.3 3 3 3s3-1.3 3-3v-44c0-7.2-5.8-13-13-13z" />
              <path d="m65 102c-1.7 0-3 1.3-3 3s1.3 3 3 3h4c1.7 0 3-1.3 3-3s-1.3-3-3-3z" />
              <path d="m100.6 47.8s-20.4 24.2-36.6 24.2-36.6-24.2-36.6-24.2" fill="none" stroke={safeTextColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
            </g>
          </svg>
        </div>

        {/* Center Section: Headline & Subheadline + Signature Mock */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", marginTop: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
            <span style={{ fontSize: `${titleSize}px`, fontWeight: "bold", color: safeTextColor, lineHeight: 1.1, letterSpacing: "-0.05em" }}>
              {title}
            </span>
            <span style={{ fontSize: `${titleSize}px`, fontWeight: "bold", color: safeTextColor, lineHeight: 1.1, letterSpacing: "-0.05em" }}>
              {subtitle}
            </span>
            <span style={{ fontSize: `${descriptionSize}px`, color: safeAccentColor, marginTop: "24px", fontWeight: 400, letterSpacing: "0.01em", maxWidth: "500px" }}>
              {description}
            </span>
          </div>

          {/* Right: Premium Corporate Signature UI Mockup */}
          <div style={{ 
            display: "flex", 
            backgroundColor: "#0A0A0A", 
            border: "1px solid #222", 
            borderRadius: "16px", 
            padding: "32px",
            width: "480px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Avatar Image or Icon */}
            <div style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "40px", 
              backgroundColor: "#1A1A1A", 
              marginRight: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${safeAccentColor}44`,
              overflow: "hidden"
            }}>
              {safeAvatar ? (
                <img src={safeAvatar} width="80" height="80" style={{ objectFit: "cover" }} />
              ) : (
                <svg width="40" height="40" viewBox="0 0 24 24" fill={safeAccentColor}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>

            {/* Identity Info */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: safeTextColor, marginBottom: "4px" }}>
                {mockName}
              </div>
              <div style={{ fontSize: "16px", color: safeAccentColor, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {mockTitle}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "3px", backgroundColor: safeAccentColor }} />
                  <span style={{ fontSize: "14px", color: "#666" }}>jane@acme-corp.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "3px", backgroundColor: safeAccentColor }} />
                  <span style={{ fontSize: "14px", color: "#666" }}>+1 (555) 000-0000</span>
                </div>
              </div>

              {/* Social Icons Mockup */}
              <div style={{ display: "flex", gap: "12px" }}>
                {/* LinkedIn */}
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#111", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={safeAccentColor}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                {/* X (Twitter) */}
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#111", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={safeAccentColor}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                {/* GitHub */}
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#111", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={safeAccentColor}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.841 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                {/* Instagram */}
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#111", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={safeAccentColor}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Accent Bar */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", backgroundColor: safeAccentColor }} />
          </div>
        </div>

        {/* Bottom: CTA & URL */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #222", paddingTop: "30px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#000000", backgroundColor: safeTextColor, padding: "8px 20px", borderRadius: "6px", marginRight: "20px" }}>
              {cta.toUpperCase()}
            </span>
            <span style={{ fontSize: "20px", color: safeAccentColor, fontWeight: "bold", letterSpacing: "0.05em" }}>
              {url.toUpperCase()}
            </span>
          </div>
          {name && (
            <span style={{ fontSize: "16px", color: safeAccentColor, fontWeight: "bold" }}>
              PREVIEW FOR {name.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
