/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { SignatureData } from "@/components/SignatureApp";

export interface SignatureCardProps { data: SignatureData; darkMode?: boolean; exportMode?: boolean; }

const FONTS: Record<string,string> = {
  "Arial": "'Arial', Helvetica, sans-serif",
  "Inter": "'Inter','Arial',sans-serif",
  "DM Sans": "'DM Sans','Arial',sans-serif",
  "Space Grotesk": "'Space Grotesk','Arial',sans-serif",
  "Outfit": "'Outfit','Arial',sans-serif",
  "Plus Jakarta Sans": "'Plus Jakarta Sans','Arial',sans-serif",
  "Newsreader": "'Newsreader','Georgia',serif",
  "Playfair Display": "'Playfair Display','Georgia',serif",
  "Lora": "'Lora','Georgia',serif",
  "Roboto Mono": "'Roboto Mono','Courier New',monospace",
};

const FA: Record<string,string> = { 
  linkedin: "fa-brands fa-linkedin", 
  github: "fa-brands fa-github", 
  twitter: "fa-brands fa-x-twitter", 
  portfolio: "fa-solid fa-globe",
  whatsapp: "fa-brands fa-whatsapp",
  instagram: "fa-brands fa-instagram"
};
const SL: Record<string,string> = { 
  linkedin: "LinkedIn", 
  github: "GitHub", 
  twitter: "Twitter / X", 
  portfolio: "Website",
  whatsapp: "WhatsApp",
  instagram: "Instagram"
};

const PLACEHOLDERS = {
  fullName: "Johnathan Doe",
  profTitle: "Senior Product Designer",
  company: "Cyberdyne Systems",
  email: "john@cyberdyne.io",
  phone: "+1 (555) 123-4567",
  location: "Palo Alto, California",
  avatarUrl: "https://i.pravatar.cc/150?u=john",
};

function Val({ v, p, exp, style={} }: { v:string|undefined|null; p:string; exp:boolean; style?:React.CSSProperties }) {
  if (v && v.trim().length > 0) return <span style={style}>{v}</span>;
  if (exp) return null;
  return (
    <span 
      style={{ 
        display: "inline-block",
        backgroundColor: "rgba(120,120,120,0.15)", 
        borderRadius: "4px",
        padding: "0 6px",
        letterSpacing: "0.02em",
        ...style,
      }}
    >
      <span>{p}</span>
    </span>
  );
}

type D = SignatureData;
type C = { name:string; sub:string; muted:string; rule:string; bg:string; dim:string; link:string; icon:string };
type SI = { key:string; s:{url:string;showIcon:boolean;showLabel:boolean}; url:string; label:string; icon:string; ac:string };

// In dark mode, if the accent color is black or very dark, we default it to white so it's visible.
const resolveAcc = (c:string, dark:boolean) => {
  const isBlack = !c || c.toLowerCase() === "#ffffff" || c === "#111111" || c === "#000000";
  return isBlack ? (dark ? "#FFFFFF" : "#111111") : c;
};
const getFF = (f:string) => FONTS[f] ?? "'Arial',sans-serif";
const isSerif = (f:string) => ["Newsreader","Playfair Display","Lora"].includes(f);

// Light palette
const LC: C = { name:"#111111", sub:"#666666", muted:"#AAAAAA", rule:"#EEEEEE", bg:"#FFFFFF", dim:"#CCCCCC", link:"#555555", icon:"#111111" };
// Dark palette — everything optimized for #1C1C1E
const DC: C = { name:"#FFFFFF", sub:"#BBBBBB", muted:"#888888", rule:"#3A3A3C", bg:"#1C1C1E", dim:"#777777", link:"#DDDDDD", icon:"#FFFFFF" };

function getSocials(d:D, ac:string, exp:boolean): SI[] {
  const order = d.socialOrder || Object.keys(d.socials);
  let keys = order.filter(k => d.socials[k as keyof typeof d.socials]?.url);
  
  // If no socials are filled, show a few standard ones as "ghost" placeholders in preview
  if (!exp && keys.length === 0) {
    keys = ["linkedin", "twitter", "github"];
  }

  return keys.map(k => { 
      const key = k as keyof typeof d.socials;
      const s = d.socials[key] || { url: "", showIcon: true, showLabel: false }; 
      return { 
        key, 
        s, 
        url: s.url ? (s.url.startsWith("http") ? s.url : `https://${s.url}`) : "#", 
        label: SL[key] || key, 
        icon: FA[key] || "fa-solid fa-link", 
        ac 
      }; 
    });
}

function sz(base:number, scale:number) { return Math.round(base * scale); }

// Returns the correct Icons8 URL for external image export
function getIconUrl(key: string, color: string) {
  let hex = color.replace("#", "");
  // Gmail Dark Mode fix: pure black images become invisible on dark backgrounds. 
  // We lighten pure black to a deep gray (#555555) so the icons remain visible on both white and black backgrounds.
  if (hex.toLowerCase() === "111111" || hex.toLowerCase() === "000000" || hex.toLowerCase() === "ffffff") {
    hex = "555555";
  }
  const map: Record<string, string> = {
    linkedin: "linkedin", github: "github", twitter: "twitterx--v2", portfolio: "domain",
    whatsapp: "whatsapp", instagram: "instagram",
    phone: "phone", email: "new-post", location: "marker"
  };
  return `https://img.icons8.com/ios-filled/50/${hex}/${map[key] || key}.png`;
}

function Socs({ items, c, fs, mt=10, exp=false }: { items:SI[]; c:C; fs:number; mt?:number; exp?:boolean }) {
  if (!items.length) return null;
  const isz = sz(fs, 1.3);
  return (
    <table cellPadding={0} cellSpacing={0} border={0} style={{ marginTop:mt }}>
      <tbody>
        <tr>
          {items.map(({ key, s, url, label, icon, ac }) => {
            const isGhost = !s.url && !exp;
            return (
              <td key={key} style={{ paddingRight:12, verticalAlign:"middle" }}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", textDecoration:"none" }}>
                  {s.showIcon && exp && <img src={getIconUrl(key, ac)} width={isz} height={isz} alt={label} style={{ display:"inline-block", verticalAlign:"middle", border:0 }} />}
                  {s.showIcon && !exp && <i className={icon} style={{ fontSize:isz, color:ac, verticalAlign:"middle" }} />}
                  {s.showLabel && <span style={{ fontSize:sz(fs,0.8), color:c.sub, marginLeft:s.showIcon?6:0, verticalAlign:"middle" }}>{label}</span>}
                </a>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

function Icon({ name, color, isz, exp }: { name:string, color:string, isz:number, exp:boolean }) {
  return exp
    ? <img src={getIconUrl(name, color)} width={isz} height={isz} style={{ display:"inline-block", verticalAlign:"middle", marginRight:5, border:0 }} alt={name} />
    : <i className={`fa-solid fa-${name==="new-post"?"envelope":name==="marker"?"location-dot":name}`} style={{ fontSize:isz, color, marginRight:5, verticalAlign:"middle" }} />;
}

function Ctacts({ d, ac, c, fs, exp=false }: { d:D; ac:string; c:C; fs:number; exp?:boolean }) {
  const s12 = sz(fs, 0.86);
  const isz = sz(fs, 0.86);
  const items = [];

  const phone = d.phone || (!exp ? PLACEHOLDERS.phone : "");
  if (phone) items.push(
    <a href={d.phone ? `tel:${d.phone}` : "#"} style={{ color:c.link, textDecoration:"none", fontSize:s12, display:"inline-block", verticalAlign:"middle" }}>
      <Icon name="phone" color={ac} isz={isz} exp={exp} />
      <Val v={d.phone} p={PLACEHOLDERS.phone} exp={exp} />
    </a>
  );

  const email = d.email || (!exp ? PLACEHOLDERS.email : "");
  if (email) items.push(
    <a href={d.email ? `mailto:${d.email}` : "#"} style={{ color:ac, fontWeight:600, textDecoration:"none", fontSize:s12, display:"inline-block", verticalAlign:"middle" }}>
      <Icon name="new-post" color={ac} isz={isz} exp={exp} />
      <Val v={d.email} p={PLACEHOLDERS.email} exp={exp} />
    </a>
  );

  const loc = d.location || (!exp ? PLACEHOLDERS.location : "");
  if (loc) items.push(
    <span style={{ color:c.muted, fontSize:s12, display:"inline-block", verticalAlign:"middle" }}>
      <Icon name="marker" color={c.dim} isz={isz} exp={exp} />
      <Val v={d.location} p={PLACEHOLDERS.location} exp={exp} />
    </span>
  );

  if (!items.length) return null;

  return (
    <table cellPadding={0} cellSpacing={0} border={0}>
      <tbody>
        <tr>
          {items.map((it, i) => (
            <React.Fragment key={i}>
              {i > 0 && <td style={{ padding:"0 8px", color:c.dim, fontSize:s12 }}>&middot;</td>}
              <td style={{ verticalAlign:"middle" }}>{it}</td>
            </React.Fragment>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

type LP = { d:D; ac:string; c:C; fs:number; serif:boolean; exp:boolean };

/* ── 1. Minimal ── */
function LMinimal({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr>
          <td style={{ paddingBottom:6 }}>
            <Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.14), fontWeight:700, color:c.name, letterSpacing:"-0.3px", marginRight:8 }} />
            <Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} style={{ fontSize:sz(fs,0.79), color:c.sub, marginRight:8 }} />
            <Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ fontSize:sz(fs,0.79), color:ac, fontWeight:600 }} />
          </td>
        </tr>
        <tr><td height={1} style={{ fontSize:1, lineHeight:"1px", backgroundColor:c.rule }}>&nbsp;</td></tr>
        <tr><td style={{ paddingTop:10 }}><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
        {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={8} /></td></tr>}
      </tbody>
    </table>
  );
}

/* ── 2. Classic ── */
function LClassic({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  const av = d.avatarUrl || (!exp ? PLACEHOLDERS.avatarUrl : "");
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr>
          {av && <td width="80" valign="top" style={{ paddingRight:16, paddingTop:2 }}><img src={av} alt={d.fullName || "Avatar"} width="64" height="64" fetchPriority="high" decoding="sync" style={{ width:64, height:64, borderRadius:"50%", display:"block", border:0, objectFit:"cover", opacity: d.avatarUrl ? 1 : 0.4 }} /></td>}
          <td valign="top">
            <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
                <tr><td style={{ paddingBottom:3 }}><Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.21), fontWeight:700, color:c.name, letterSpacing:"-0.3px" }} /></td></tr>
                <tr><td style={{ fontSize:sz(fs,0.86), color:c.sub, paddingBottom:10 }}><Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} />{(d.company || (!exp)) && <><span style={{ color:c.dim }}> &middot; </span><Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ color:ac, fontWeight:600 }} /></>}</td></tr>
                <tr><td height={1} style={{ fontSize:1, lineHeight:"1px", backgroundColor:c.rule }}>&nbsp;</td></tr>
                <tr><td style={{ paddingTop:10 }}><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
                {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={8} /></td></tr>}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ── 3. Executive ── */
function LExecutive({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr><td style={{ paddingBottom:5 }}><Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.57), fontWeight:700, color:c.name, letterSpacing:"-0.5px", fontStyle:"italic" }} /></td></tr>
        <tr><td style={{ fontSize:sz(fs,0.79), color:c.sub, letterSpacing:"0.1em", textTransform:"uppercase", paddingBottom:14 }}>
          <Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} />
          {(d.company || !exp) && <><span style={{ color:ac }}> &middot; </span><Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ color:ac }} /></>}
        </td></tr>
        <tr><td style={{ paddingBottom:14 }}><div style={{ height:1, backgroundColor:c.rule, width:48, fontSize:1, lineHeight:"1px" }}>&nbsp;</div></td></tr>
        <tr><td><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
        {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={8} /></td></tr>}
      </tbody>
    </table>
  );
}

/* ── 4. Modern ── */
function LModern({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  const av = d.avatarUrl || (!exp ? PLACEHOLDERS.avatarUrl : "");
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr>
          {av && <td width="76" valign="top" style={{ paddingRight:16 }}><img src={av} alt={d.fullName || "Avatar"} width="60" height="60" fetchPriority="high" decoding="sync" style={{ width:60, height:60, borderRadius:10, display:"block", border:0, objectFit:"cover", opacity: d.avatarUrl ? 1 : 0.4 }} /></td>}
          <td valign="top">
            <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
                <tr>
                  <td style={{ paddingBottom:3 }}>
                    <Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.29), fontWeight:800, color:c.name, letterSpacing:"-0.4px", marginRight:8 }} />
                    {(d.company || !exp) && <Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ fontSize:sz(fs,0.71), fontWeight:700, color:ac, backgroundColor:`${ac}18`, padding:"2px 9px", borderRadius:20, letterSpacing:"0.06em", textTransform:"uppercase" }} />}
                  </td>
                </tr>
                <tr><td style={{ fontSize:sz(fs,0.86), color:c.sub, paddingBottom:12 }}><Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} /></td></tr>
                <tr><td><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
                {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={8} /></td></tr>}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ── 5. Corporate ── */
function LCorporate({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:560, margin:0 }}>
      <tbody>
        <tr>
          <td valign="top" style={{ paddingRight:24, borderRight:`1px solid ${c.rule}` }}>
            <div style={{ marginBottom:4 }}><Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.29), fontWeight:700, color:c.name, letterSpacing:"-0.4px" }} /></div>
            <div style={{ fontSize:sz(fs,0.86), color:c.sub, marginBottom:3 }}><Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} /></div>
            <div style={{ fontSize:sz(fs,0.86), color:ac, fontWeight:600 }}><Val v={d.company} p={PLACEHOLDERS.company} exp={exp} /></div>
          </td>
          <td valign="top" style={{ paddingLeft:24 }}>
            <table cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
                <tr><td style={{ paddingBottom:6 }}><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
                {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={4} /></td></tr>}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ── 6. Bold ── */
function LBold({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr><td style={{ paddingBottom:6 }}><Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,2), fontWeight:900, color:c.name, letterSpacing:"-1px", lineHeight:1 }} /></td></tr>
        <tr><td style={{ paddingBottom:10 }}><div style={{ height:3, width:40, backgroundColor:ac, borderRadius:2, fontSize:1, lineHeight:"1px" }}>&nbsp;</div></td></tr>
        <tr><td style={{ fontSize:sz(fs,0.86), color:c.sub, paddingBottom:12 }}><Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} />{(d.company || !exp) && <><span style={{ color:c.dim }}> &middot; </span><Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ color:ac, fontWeight:600 }} /></>}</td></tr>
        <tr><td><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
        {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={12} /></td></tr>}
      </tbody>
    </table>
  );
}

/* ── 7. Elegant ── */
function LElegant({ d, ac, c, fs, serif, exp }: LP) {
  const s = getSocials(d, ac, exp);
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        {(d.company || !exp) && <tr><td style={{ paddingBottom:8 }}><Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ fontSize:sz(fs,0.71), color:ac, letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:700 }} /></td></tr>}
        <tr><td style={{ paddingBottom:4 }}><Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.71), fontWeight:700, color:c.name, letterSpacing:"-0.6px", lineHeight:1.1, fontStyle:serif?"italic":"normal" }} /></td></tr>
        <tr><td style={{ fontSize:sz(fs,0.79), color:c.sub, letterSpacing:"0.05em", paddingBottom:14 }}><Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} /></td></tr>
        <tr><td height={1} style={{ fontSize:1, lineHeight:"1px", backgroundColor:c.rule }}>&nbsp;</td></tr>
        <tr><td style={{ paddingTop:14 }}><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
        {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={8} /></td></tr>}
      </tbody>
    </table>
  );
}

/* ── 8. Startup ── */
function LStartup({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  const av = d.avatarUrl || (!exp ? PLACEHOLDERS.avatarUrl : "");
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr>
          {av && <td width="66" valign="top" style={{ paddingRight:14 }}><img src={av} alt={d.fullName || "Avatar"} width="52" height="52" fetchPriority="high" decoding="sync" style={{ width:52, height:52, borderRadius:8, display:"block", border:0, objectFit:"cover", opacity: d.avatarUrl ? 1 : 0.4 }} /></td>}
          <td valign="top">
            <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
                <tr>
                  <td style={{ paddingBottom:2 }}>
                    <Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.14), fontWeight:800, color:c.name, letterSpacing:"-0.3px", marginRight:8 }} />
                    {(d.company || !exp) && <Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ fontSize:sz(fs,0.71), color:ac, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }} />}
                  </td>
                </tr>
                <tr><td style={{ fontSize:sz(fs,0.79), color:c.sub, paddingBottom:10 }}><Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} /></td></tr>
                <tr><td><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
                {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={10} /></td></tr>}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ── 9. Creative ── */
function LCreative({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  const av = d.avatarUrl || (!exp ? PLACEHOLDERS.avatarUrl : "");
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, maxWidth:520, margin:0 }}>
      <tbody>
        <tr>
          {av && <td width="92" valign="top" style={{ paddingRight:20 }}><img src={av} alt={d.fullName || "Avatar"} width="72" height="72" fetchPriority="high" decoding="sync" style={{ width:72, height:72, borderRadius:12, display:"block", border:0, objectFit:"cover", opacity: d.avatarUrl ? 1 : 0.4 }} /></td>}
          <td valign="top">
            <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
                <tr><td style={{ paddingBottom:6 }}><Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1.43), fontWeight:700, color:c.name, letterSpacing:"-0.4px", fontStyle:"italic", lineHeight:1.2 }} /></td></tr>
                <tr>
                  <td style={{ paddingBottom:12 }}>
                    <div style={{ display:"inline-block", backgroundColor:`${ac}18`, padding:"3px 10px", borderRadius:20 }}>
                      <Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} style={{ fontSize:sz(fs,0.79), color:ac, fontWeight:600 }} />
                      {(d.company || !exp) && (d.profTitle || !exp) && <span style={{ color:`${ac}66`, fontSize:sz(fs,0.71), margin:"0 6px" }}>&middot;</span>}
                      {(d.company || !exp) && <Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ fontSize:sz(fs,0.79), color:ac, fontWeight:700 }} />}
                    </div>
                  </td>
                </tr>
                <tr><td><Ctacts d={d} ac={ac} c={c} fs={fs} exp={exp} /></td></tr>
                {s.length>0 && <tr><td><Socs items={s} c={c} fs={fs} exp={exp} mt={8} /></td></tr>}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ── 10. Compact ── */
function LCompact({ d, ac, c, fs, exp }: LP) {
  const s = getSocials(d, ac, exp);
  const items: React.ReactNode[] = [];
  const isz = sz(fs, 0.86);

  const phone = d.phone || (!exp ? PLACEHOLDERS.phone : "");
  if (phone) items.push(<a key="p" href={d.phone ? `tel:${d.phone}` : "#"} style={{ color:c.link, textDecoration:"none", fontSize:sz(fs,0.86), display:"inline-block", verticalAlign:"middle" }}><Icon name="phone" color={ac} isz={isz} exp={exp} /> <Val v={d.phone} p={PLACEHOLDERS.phone} exp={exp} /></a>);
  
  const email = d.email || (!exp ? PLACEHOLDERS.email : "");
  if (email) items.push(<a key="e" href={d.email ? `mailto:${d.email}` : "#"} style={{ color:ac, fontWeight:600, textDecoration:"none", fontSize:sz(fs,0.86), display:"inline-block", verticalAlign:"middle" }}><Icon name="new-post" color={ac} isz={isz} exp={exp} /> <Val v={d.email} p={PLACEHOLDERS.email} exp={exp} /></a>);
  
  const loc = d.location || (!exp ? PLACEHOLDERS.location : "");
  if (loc) items.push(<span key="l" style={{ color:c.muted, fontSize:sz(fs,0.86), display:"inline-block", verticalAlign:"middle" }}><Icon name="marker" color={c.dim} isz={isz} exp={exp} /> <Val v={d.location} p={PLACEHOLDERS.location} exp={exp} /></span>);
  
  s.filter(({ s:ss }) => ss.showIcon||ss.showLabel).forEach(({ key,s:ss,url,icon }) => {
    items.push(
      <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{ color:c.sub, textDecoration:"none", fontSize:sz(fs,0.86), display:"inline-block", verticalAlign:"middle" }}>
        {ss.showIcon && (exp ? <img src={getIconUrl(key, ac)} width={isz} height={isz} style={{ display:"inline-block", verticalAlign:"middle", marginRight:ss.showLabel?4:0, border:0 }} alt={key} /> : <i className={icon} style={{ fontSize:isz, color:ac, marginRight:ss.showLabel?4:0, verticalAlign:"middle" }} />)}
        {ss.showLabel && <span>{SL[key]}</span>}
      </a>
    );
  });
  
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor:c.bg, borderTop:`1px solid ${c.rule}` }}>
      <tbody>
        <tr>
          <td style={{ padding:"12px 0" }}>
            <Val v={d.fullName} p={PLACEHOLDERS.fullName} exp={exp} style={{ fontSize:sz(fs,1), fontWeight:700, color:c.name, letterSpacing:"-0.2px", marginRight:8 }} />
            <Val v={d.profTitle} p={PLACEHOLDERS.profTitle} exp={exp} style={{ fontSize:sz(fs,0.79), color:c.muted, marginRight:8 }} />
            <Val v={d.company} p={PLACEHOLDERS.company} exp={exp} style={{ fontSize:sz(fs,0.79), color:ac, fontWeight:600, marginRight:8 }} />
            <span style={{ color:c.dim, margin:"0 10px", fontSize:sz(fs,0.79) }}>|</span>
            {items.map((item,i) => <React.Fragment key={i}>{i>0 && <span style={{ color:c.dim, margin:"0 10px", fontSize:sz(fs,0.79) }}>|</span>}{item}</React.Fragment>)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ── Layout map ─────────────────────────────────────────────────────────── */
const MAP: Record<string,(p:LP)=>React.ReactElement> = {
  minimal:   p => <LMinimal {...p} />,
  classic:   p => <LClassic {...p} />,
  modernist: p => <LClassic {...p} />,
  executive: p => <LExecutive {...p} />,
  modern:    p => <LModern {...p} />,
  horizontal:p => <LModern {...p} />,
  corporate: p => <LCorporate {...p} />,
  bold:      p => <LBold {...p} />,
  elegant:   p => <LElegant {...p} />,
  startup:   p => <LStartup {...p} />,
  creative:  p => <LCreative {...p} />,
  compact:   p => <LCompact {...p} />,
};

export default function SignatureCard({ data, darkMode = false, exportMode = false }: SignatureCardProps) {
  const ac     = resolveAcc(data.style.primaryColor, darkMode);
  const c      = darkMode ? DC : LC;
  const serif  = isSerif(data.style.fontFamily);
  const fs     = data.style.fontSize;
  const render = MAP[data.structure.layout] ?? MAP["minimal"];

  return (
    <div style={{ fontFamily: getFF(data.style.fontFamily), lineHeight: data.style.lineHeight, color: c.name, backgroundColor: c.bg }}>
      {render({ d: data, ac, c, fs, serif, exp: exportMode })}
    </div>
  );
}
