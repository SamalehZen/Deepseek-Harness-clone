// Post-processing applied after scripts/build-from-html.mjs regenerates the
// components: the live hero backdrop is a WebGL canvas, so it is replaced with
// the CSS approximation defined in app/globals.css (.hero-aurora).
import fs from "node:fs";

const file = new URL("../components/Hero.jsx", import.meta.url);
let source = fs.readFileSync(file, "utf8");

const heroBackground = /<div className="absolute inset-0 z-0 overflow-hidden"[\s\S]*?<canvas[^>]*\/>\s*<\/div>/;
if (heroBackground.test(source)) {
  source = source.replace(
    heroBackground,
    '<div className="absolute inset-0 z-0 overflow-hidden hero-aurora" />',
  );
  fs.writeFileSync(file, source);
  console.log("hero backdrop replaced");
} else {
  console.log("nothing to patch (already applied)");
}
