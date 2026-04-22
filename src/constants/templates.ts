import { SignatureData } from "../components/SignatureApp";

export interface Template {
  id: string;
  name: string;
  description: string;
  structure: SignatureData["structure"];
  style: SignatureData["style"];
}

const DEFAULT_STYLE = {
  primaryColor: "#000000",
  fontFamily: "Arial",
  fontSize: 12,
  lineHeight: 1.5,
  borderWeight: 0,
};

export const TEMPLATES: Template[] = [
  // 1 — DEFAULT
  {
    id: "minimal",
    name: "Minimal",
    description: "Name · title · contacts in a single clean line. No avatar.",
    structure: { layout: "minimal", contentOrder: ["info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 2
  {
    id: "classic",
    name: "Classic",
    description: "Circular avatar, horizontal layout, thin divider rule.",
    structure: { layout: "classic", contentOrder: ["avatar", "info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 3
  {
    id: "executive",
    name: "Executive",
    description: "Italic serif name, small-caps title, dot-separated contacts.",
    structure: { layout: "executive", contentOrder: ["info", "contacts", "socials"], density: "relaxed" },
    style: DEFAULT_STYLE,
  },
  // 4
  {
    id: "modern",
    name: "Modern",
    description: "Square avatar, company pill badge, bold 800-weight name.",
    structure: { layout: "modern", contentOrder: ["avatar", "info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 5
  {
    id: "corporate",
    name: "Corporate",
    description: "Two-column split — name/title left, contacts right. No avatar.",
    structure: { layout: "corporate", contentOrder: ["info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 6
  {
    id: "bold",
    name: "Bold",
    description: "Oversized name at 28px, accent underline, icon-only socials.",
    structure: { layout: "bold", contentOrder: ["info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 7
  {
    id: "elegant",
    name: "Elegant",
    description: "Company name uppercase above, name large, full-width rule.",
    structure: { layout: "elegant", contentOrder: ["info", "contacts", "socials"], density: "relaxed" },
    style: DEFAULT_STYLE,
  },
  // 8
  {
    id: "startup",
    name: "Startup",
    description: "Avatar with name + company, icon-only social pills row.",
    structure: { layout: "startup", contentOrder: ["avatar", "info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 9
  {
    id: "creative",
    name: "Creative",
    description: "Avatar + large italic serif name, contacts with colored icon squares.",
    structure: { layout: "creative", contentOrder: ["avatar", "info", "contacts", "socials"], density: "balanced" },
    style: DEFAULT_STYLE,
  },
  // 10
  {
    id: "compact",
    name: "Compact",
    description: "Single-line strip — name | title | contacts | socials, pipe-separated.",
    structure: { layout: "compact", contentOrder: ["info", "contacts", "socials"], density: "tight" },
    style: DEFAULT_STYLE,
  },
];
