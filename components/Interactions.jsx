"use client";

import { useEffect } from "react";

/**
 * The live page ships its own client components for these controls. The clone
 * is static markup, so the small amount of behaviour it needs is ported here:
 * mobile menu, mobile download accordion, desktop download menu, copy buttons.
 */
export default function Interactions() {
  useEffect(() => {
    const cleanups = [];

    /* ---------------------------------------------------------------- menu */
    const trigger = document.querySelector('[aria-controls="harness-mobile-menu"]');
    const menu = document.getElementById("harness-mobile-menu");
    const close = menu?.querySelector(".ds-mobile-menu-header button");
    const setMenu = (open) => {
      menu?.classList.toggle("is-open", open);
      trigger?.setAttribute("aria-expanded", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    const onTrigger = () => setMenu(!menu?.classList.contains("is-open"));
    trigger?.addEventListener("click", onTrigger);
    close?.addEventListener("click", () => setMenu(false));
    cleanups.push(() => trigger?.removeEventListener("click", onTrigger));

    /* ------------------------------------------- mobile download accordion */
    const dlTrigger = document.querySelector(".harness-mobile-download-trigger");
    const dlRoot = dlTrigger?.closest(".harness-mobile-download");
    const dlPanel = document.getElementById("harness-mobile-download-options");
    const onDl = () => {
      const open = dlRoot?.getAttribute("data-open") !== "true";
      dlRoot?.setAttribute("data-open", String(open));
      dlTrigger?.setAttribute("aria-expanded", String(open));
      dlPanel?.setAttribute("aria-hidden", String(!open));
    };
    dlTrigger?.addEventListener("click", onDl);
    cleanups.push(() => dlTrigger?.removeEventListener("click", onDl));

    /* ------------------------------------------------- desktop download menu */
    const CTAS = document.querySelectorAll('a[href="/en/download/"]');
    const DOWNLOADS = [
      ["macOS (Apple silicon)", "https://download.deepseek.com/desktop/dsh-latest-macos-arm64.dmg"],
      ["Windows (64-bit)", "https://download.deepseek.com/desktop/dsh-latest-windows-x64.exe"],
      ["All downloads", "https://www.deepseek.com/en/download/"],
    ];
    const menus = [];
    const closeMenus = () => {
      menus.forEach((el) => el.remove());
      menus.length = 0;
    };
    const openMenu = (anchor) => {
      closeMenus();
      const parent = anchor.parentElement;
      if (!parent) return;
      if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
      const panel = document.createElement("div");
      panel.setAttribute("role", "menu");
      panel.style.cssText = [
        "position:absolute", "top:calc(100% + 8px)", "left:50%", "transform:translateX(-50%)",
        "z-index:80", "min-width:230px", "padding:6px", "border-radius:12px",
        "background:rgba(18,20,24,.96)", "border:1px solid rgba(255,255,255,.14)",
        "box-shadow:0 18px 50px rgba(0,0,0,.55)", "backdrop-filter:blur(12px)",
      ].join(";");
      for (const [label, href] of DOWNLOADS) {
        const link = document.createElement("a");
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("role", "menuitem");
        link.textContent = label;
        link.style.cssText =
          "display:block;padding:9px 12px;border-radius:8px;font-size:13px;color:#f9fafb;text-decoration:none;white-space:nowrap";
        link.addEventListener("mouseenter", () => (link.style.background = "rgba(255,255,255,.08)"));
        link.addEventListener("mouseleave", () => (link.style.background = "transparent"));
        panel.appendChild(link);
      }
      parent.appendChild(panel);
      menus.push(panel);
    };
    const onCta = (event) => {
      const anchor = event.target.closest('a[href="/en/download/"]');
      if (!anchor) return;
      event.preventDefault();
      if (menus.length) closeMenus();
      else openMenu(anchor);
    };
    document.addEventListener("click", onCta);
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenus());
    cleanups.push(() => document.removeEventListener("click", onCta));

    /* ---------------------------------------------------------- copy buttons */
    const onCopy = async (event) => {
      const button = event.target.closest("button");
      if (!button || button.textContent.trim() !== "Copy") return;
      const scope =
        button.closest(".min-w-0") || button.closest("section") || button.parentElement;
      const source = scope?.querySelector("code, pre, [data-copy-value]");
      const value = (source?.textContent || "").trim();
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const area = document.createElement("textarea");
        area.value = value;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      const original = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => (button.textContent = original), 1500);
    };
    document.addEventListener("click", onCopy);
    cleanups.push(() => document.removeEventListener("click", onCopy));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
