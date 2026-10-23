import "./globals.css";
// Original site stylesheets, imported in the same order the page loads them.
import "./styles/b39dbc256e52a1dc.css";
import "./styles/826310b8bcf73c16.css";
import "./styles/aa0e993381ed79dc.css";
import "./styles/5adb47a13a2794be.css";

export const metadata = {
  title: "DeepSeek Harness | Explore the limits of intelligence",
  description:
    "Use DeepSeek Harness to work with documents, analyze spreadsheets, write code, and schedule tasks. Extend its capabilities with composable plugins.",
  icons: {
    icon: [
      { url: "/harness/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  openGraph: {
    title: "DeepSeek Harness | Explore the limits of intelligence",
    description:
      "Use DeepSeek Harness to work with documents, analyze spreadsheets, write code, and schedule tasks. Extend its capabilities with composable plugins.",
    url: "https://www.deepseek.com/en/harness/",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>
        <script
          // Arm the scroll-reveal before first paint; without it the page stays visible.
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal-armed')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
