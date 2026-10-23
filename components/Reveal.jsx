"use client";

import { useEffect } from "react";

/**
 * The original page reveals most of its blocks on scroll from client JS.
 * This ports that behaviour: every element the generator flagged with
 * `data-reveal` fades/slides in the first time it enters the viewport.
 *
 * The `reveal-armed` class is added in <head> before first paint, so visitors
 * without JS (or with reduced motion) still get the fully visible page.
 */
export default function Reveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.remove("reveal-armed");
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
