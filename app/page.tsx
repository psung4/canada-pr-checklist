"use client";

import Link from "next/link";
import { useState } from "react";

const countries = [
  { flag: "🇰🇷", name: "South Korea", value: "south-korea", ready: true },
  { flag: "🇵🇭", name: "Philippines", value: "philippines", ready: true },
  { flag: "🇮🇳", name: "India", value: "india", ready: true },
  { flag: "🇨🇳", name: "China", value: "china", ready: true },
  { flag: "🇬🇧", name: "United Kingdom", value: "uk", ready: true },
  { flag: "🇺🇸", name: "United States", value: "usa", ready: true },
];

export default function Home() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{
        borderBottom: "1px solid #ebebeb",
        background: "#fff",
      }}>
        <div className="hero-inner">

          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#f5f5f5",
            borderRadius: "99px",
            padding: "5px 14px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#555",
            letterSpacing: "0.02em",
            marginBottom: "36px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Free · No login · No data stored
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 7vw, 68px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
            marginBottom: "28px",
            maxWidth: "720px",
          }}>
            Get your free
            <br />
            <span style={{ color: "#555" }}>Canadian Spousal PR
            <br />checklist today.</span>
          </h1>

          <p style={{
            fontSize: "18px",
            color: "#666",
            lineHeight: 1.65,
            marginBottom: "44px",
            maxWidth: "520px",
          }}>
            Answer 8 questions. Get a personalized checklist tailored to your country, relationship type, and situation.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/questionnaire" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#2563eb",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}>
              Build my checklist
              <span style={{ fontSize: "18px" }}>→</span>
            </Link>

            <span style={{ fontSize: "13px", color: "#bbb", fontWeight: 500 }}>
              Takes about 2 minutes
            </span>
          </div>
        </div>
      </div>

      {/* ── COUNTRIES ────────────────────────────────────────────────── */}
      <div className="section-inner">
        <div style={{ marginBottom: "36px" }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#0a0a0a",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}>
            Is your spouse from one of these countries?
          </h2>
          <p style={{ fontSize: "14px", color: "#999", fontWeight: 500 }}>
            We support 6 of the most common countries of origin — each with its own tailored document list.
          </p>
        </div>

        <div className="country-grid">
          {countries.map((c) => (
            <div
              key={c.name}
              onMouseEnter={() => setHoveredCountry(c.name)}
              onMouseLeave={() => setHoveredCountry(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "18px 20px",
                border: `2px solid ${hoveredCountry === c.name ? "#0a0a0a" : "#ebebeb"}`,
                borderRadius: "10px",
                background: hoveredCountry === c.name ? "#0a0a0a" : "#fff",
                transition: "all 0.15s",
                cursor: "default",
              }}
            >
              <span style={{ fontSize: "26px" }}>{c.flag}</span>
              <div>
                <div style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: hoveredCountry === c.name ? "#fff" : "#111",
                  transition: "color 0.15s",
                }}>
                  {c.name}
                </div>
                <div style={{
                  fontSize: "11px",
                  color: hoveredCountry === c.name ? "#aaa" : "#22c55e",
                  fontWeight: 600,
                  marginTop: "2px",
                }}>
                  ● Available
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #ebebeb", background: "#fafafa" }}>
        <div className="section-inner">
          <h2 style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#0a0a0a",
            letterSpacing: "-0.03em",
            marginBottom: "48px",
          }}>
            How it works
          </h2>

          <div className="steps-grid">
            {[
              {
                n: "1",
                title: "Answer 8 questions",
                body: "Inland or outland? Married, common-law, or conjugal? Which country? We ask only what's needed to determine your document list.",
              },
              {
                n: "2",
                title: "Get your checklist",
                body: "Every required form, civil document, and country-specific item — filtered to exactly your situation. Each one explained in plain English with where to get it.",
              },
              {
                n: "3",
                title: "Track and download",
                body: "Check off documents as you gather them. Progress saves in your browser. Hit Save as PDF to get a clean, printable copy.",
              },
            ].map((s) => (
              <div key={s.n} style={{
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "28px",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  background: "#2563eb",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "18px",
                  letterSpacing: "-0.02em",
                }}>
                  {s.n}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "13px", color: "#777", lineHeight: 1.65 }}>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #ebebeb" }}>
        <div className="cta-inner">
          <div>
            <h2 style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
              marginBottom: "8px",
            }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: "14px", color: "#999", fontWeight: 500 }}>
              Free. No login. No data stored.
            </p>
          </div>
          <Link href="/questionnaire" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#2563eb",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 700,
            textDecoration: "none",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}>
            Build my checklist →
          </Link>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid #ebebeb",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "12px",
        color: "#bbb",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <span>Not affiliated with IRCC or the Government of Canada.</span>
        <Link href="/terms" style={{ color: "#aaa", textDecoration: "underline" }}>
          Terms of Use
        </Link>
      </div>
    </main>
  );
}
