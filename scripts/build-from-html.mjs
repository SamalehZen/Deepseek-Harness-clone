// Regenerate the React components from a saved copy of the original page.
//
//   node scripts/build-from-html.mjs /path/to/page.html
//
// The page markup is converted 1:1 to JSX (attributes, inline styles, SVG)
// and split along its own section boundaries.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { parse } = require("node-html-parser");

const source = process.argv[2] || "/tmp/dsh-page/page.html";
const outDir = path.resolve("components");

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

const SKIP = new Set(["script", "noscript", "style", "link", "meta"]);

const BOOL = new Set([
  "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls",
  "default", "defer", "disabled", "formnovalidate", "hidden", "inert", "ismap",
  "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open",
  "playsinline", "readonly", "required", "reversed", "selected",
]);

const ATTR_ALIASES = {
  class: "className",
  for: "htmlFor",
  srcset: "srcSet",
  fetchpriority: "fetchPriority",
  allowfullscreen: "allowFullScreen",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  charset: "charSet",
  colspan: "colSpan",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  datetime: "dateTime",
  enctype: "encType",
  formaction: "formAction",
  frameborder: "frameBorder",
  maxlength: "maxLength",
  minlength: "minLength",
  playsinline: "playsInline",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  spellcheck: "spellCheck",
  srclang: "srcLang",
  tabindex: "tabIndex",
  usemap: "useMap",
  "xlink:href": "xlinkHref",
  "xlink:title": "xlinkTitle",
  "xml:lang": "xmlLang",
  "xmlns:xlink": "xmlnsXlink",
  "stroke-width": "strokeWidth",
};

const reactAttr = (name) => {
  if (name.startsWith("aria-") || name.startsWith("data-")) return name;
  if (ATTR_ALIASES[name]) return ATTR_ALIASES[name];
  if (name.includes(":")) return name.replace(/:/g, "");
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
};

const parseStyle = (raw) => {
  const entries = [];
  for (const part of raw.split(";")) {
    const i = part.indexOf(":");
    if (i < 0) continue;
    const key = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    if (!key) continue;
    const reactKey = key.startsWith("--")
      ? key
      : key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    entries.push({ key: reactKey, value });
  }
  return entries;
};

// The live site hides these blocks until its client JS animates them in. Keep
// them visible here and flag them for the scroll-reveal component instead.
const stripEntranceState = (entries) => {
  const hidden = entries.some((e) => e.key === "opacity" && e.value === "0");
  if (!hidden) return { entries, reveal: false };
  return {
    entries: entries.filter(
      (e) => !["opacity", "transform", "filter", "WebkitFilter"].includes(e.key),
    ),
    reveal: true,
  };
};

const escapeText = (text) => JSON.stringify(text.replace(/\s+/g, " "));

// HTML parsing lowercases tag names; React needs the exact SVG spellings.
const SVG_TAGS = {
  altglyph: "altGlyph",
  altglyphdef: "altGlyphDef",
  altglyphitem: "altGlyphItem",
  animatecolor: "animateColor",
  animatemotion: "animateMotion",
  animatetransform: "animateTransform",
  clippath: "clipPath",
  feblend: "feBlend",
  fecolormatrix: "feColorMatrix",
  fecomponenttransfer: "feComponentTransfer",
  fecomposite: "feComposite",
  feconvolvematrix: "feConvolveMatrix",
  fediffuselighting: "feDiffuseLighting",
  fedisplacementmap: "feDisplacementMap",
  fedistantlight: "feDistantLight",
  fedropshadow: "feDropShadow",
  feflood: "feFlood",
  fefunca: "feFuncA",
  fefuncb: "feFuncB",
  fefuncg: "feFuncG",
  fefuncr: "feFuncR",
  fegaussianblur: "feGaussianBlur",
  feimage: "feImage",
  femerge: "feMerge",
  femergenode: "feMergeNode",
  femorphology: "feMorphology",
  feoffset: "feOffset",
  fepointlight: "fePointLight",
  fespecularlighting: "feSpecularLighting",
  fespotlight: "feSpotLight",
  fetile: "feTile",
  feturbulence: "feTurbulence",
  foreignobject: "foreignObject",
  glyphref: "glyphRef",
  lineargradient: "linearGradient",
  radialgradient: "radialGradient",
  textpath: "textPath",
};

function serialize(node, depth) {
  const pad = "  ".repeat(depth);
  if (node.nodeType === 3) {
    // Keep the explicit spaces that separate inline spans; drop pure indentation.
    if (!node.text.trim()) {
      return node.text.includes(" ") ? `${pad}{" "}\n` : "";
    }
    return `${pad}{${escapeText(node.text)}}\n`;
  }
  if (node.nodeType !== 1) return "";

  const tag = SVG_TAGS[node.tagName.toLowerCase()] || node.tagName.toLowerCase();
  if (SKIP.has(tag)) return "";

  const attrs = [];
  const seen = new Set();
  for (const [rawName, rawValue] of Object.entries(node.attributes || {})) {
    const name = reactAttr(rawName);
    if (seen.has(name)) continue;
    seen.add(name);
    if (name === "style") {
      const { entries, reveal } = stripEntranceState(parseStyle(rawValue));
      if (reveal) attrs.push("data-reveal");
      if (entries.length) {
        const css = entries
          .map((e) => `${JSON.stringify(e.key)}: ${JSON.stringify(e.value)}`)
          .join(", ");
        attrs.push(`style={{ ${css} }}`);
      }
      continue;
    }
    if (name === "srcset" || name === "sizes") continue; // plain src is enough here
    if (BOOL.has(rawName) && rawValue === "") {
      attrs.push(name);
      continue;
    }
    attrs.push(/^[^"\\\n\r]*$/.test(rawValue) ? `${name}="${rawValue}"` : `${name}={${JSON.stringify(rawValue)}}`);
  }

  const attrText = attrs.length ? " " + attrs.join(" ") : "";
  if (VOID.has(tag)) return `${pad}<${tag}${attrText} />\n`;

  const children = (node.childNodes || [])
    .map((child) => serialize(child, depth + 1))
    .filter(Boolean)
    .join("");

  if (!children) return `${pad}<${tag}${attrText} />\n`;
  return `${pad}<${tag}${attrText}>\n${children}${pad}</${tag}>\n`;
}

function component(name, element, note) {
  const jsx = indent(serialize(element, 0).replace(/\n$/, ''));
  fs.writeFileSync(
    path.join(outDir, `${name}.jsx`),
    `// ${note}
// Generated from the original page markup by scripts/build-from-html.mjs

export default function ${name}() {
  return (
${jsx}
  );
}
`,
  );
}

const indent = (text) =>
  text
    .split('\n')
    .map((line) => (line ? '    ' + line : line))
    .join('\n');

const root = parse(fs.readFileSync(source, "utf8"));
const site = root.querySelector(".harness-site");
if (!site) throw new Error("Could not find .harness-site in " + source);

const [header, mobileMenu, main] = site.childNodes.filter(
  (n) => n.nodeType === 1,
);
const mainKids = main.childNodes.filter((n) => n.nodeType === 1);
const footer = mainKids[4];

fs.mkdirSync(outDir, { recursive: true });
component("SiteHeader", header, "Top navigation bar");
component("MobileMenu", mobileMenu, "Mobile navigation drawer (hidden at md and up)");
component("Hero", mainKids[0], "Hero section");
component("Capabilities", mainKids[1], "Capabilities section");
component("DeveloperExperience", mainKids[2], "Developer experience section");
component("Ecosystem", mainKids[3], "Plugin ecosystem / call to action");
component("SiteFooter", footer, "Footer");

console.log("components written to", outDir);
