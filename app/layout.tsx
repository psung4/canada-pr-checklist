import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canadian Spousal PR Checklist",
  description: "A free tool to generate your personalized Canadian spousal PR document checklist.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="no-print" style={{
          background: "#fafafa",
          borderBottom: "1px solid #ebebeb",
          padding: "9px 24px",
          fontSize: "12px",
          color: "#888",
          textAlign: "center",
          lineHeight: "1.5",
        }}>
          For informational purposes only. Not affiliated with IRCC or any government agency. Not legal advice. Always verify at{" "}
          <a href="https://www.canada.ca" target="_blank" rel="noopener noreferrer"
            style={{ color: "#555", textDecoration: "underline" }}>canada.ca</a>.{" "}
          <a href="/terms" style={{ color: "#555", textDecoration: "underline" }}>Terms of Use</a>
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
