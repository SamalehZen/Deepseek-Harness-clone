"use client";

import { useEffect } from "react";

export default function LanguageTag({ lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
