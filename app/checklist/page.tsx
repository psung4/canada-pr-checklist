"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { track } from "@vercel/analytics";
import { getDocumentsForAnswers, categoryLabels, categoryOrder } from "@/lib/documents";
import { Answers, DocumentItem } from "@/lib/types";

const STORAGE_KEY = "pr_checklist_state";

// Allowed values for each param — anything else falls back to the default
const VALID_COUNTRIES = ["south-korea", "philippines", "india", "china", "uk", "usa"] as const;
const VALID_APP_TYPES = ["inland", "outland"] as const;
const VALID_RELATIONSHIPS = ["married", "common-law", "conjugal"] as const;
const VALID_SPONSOR = ["citizen", "pr"] as const;

function safeParam<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function ChecklistContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const answers: Answers = {
    country: safeParam(searchParams.get("country"), VALID_COUNTRIES, "south-korea"),
    applicationType: safeParam(searchParams.get("applicationType"), VALID_APP_TYPES, "outland"),
    relationship: safeParam(searchParams.get("relationship"), VALID_RELATIONSHIPS, "married"),
    sponsorStatus: safeParam(searchParams.get("sponsorStatus"), VALID_SPONSOR, "citizen"),
    previousMarriage: searchParams.get("previousMarriage") === "true",
    hasChildren: searchParams.get("hasChildren") === "true",
    childrenTogether: searchParams.get("childrenTogether") === "true",
    marriedTwoYears: searchParams.get("marriedTwoYears") === "true",
    otherCountries: searchParams.get("otherCountries") === "yes" ? ["yes"] : [],
    livingTogether: searchParams.get("livingTogether") === "true",
  };

  const countryNames: Record<string, string> = {
    "south-korea": "South Korea",
    "philippines": "Philippines",
    "india": "India",
    "china": "China",
    "uk": "United Kingdom",
    "usa": "United States",
  };

  const allDocs = getDocumentsForAnswers(answers);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [tracked, setTracked] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    if (!tracked) {
      track("checklist_viewed");
      setTracked(true);
    }
  }, [tracked]);

  function toggleCheck(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    track("checklist_item_checked", { docId: id, checked: !checked[id] });

    // Check if all complete
    const allChecked = allDocs.every((d) => next[d.id]);
    if (allChecked) track("checklist_completed");
  }

  function handlePrint() {
    track("print_clicked");
    window.print();
  }

  const completedCount = allDocs.filter((d) => checked[d.id]).length;
  const totalCount = allDocs.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  // Group docs by category
  const grouped: Partial<Record<DocumentItem["category"], DocumentItem[]>> = {};
  for (const doc of allDocs) {
    if (!grouped[doc.category]) grouped[doc.category] = [];
    grouped[doc.category]!.push(doc);
  }

  // Summarise answers for display
  const summaryParts = [
    answers.applicationType === "inland" ? "Inland" : "Outland",
    answers.relationship === "married" ? "Married" : answers.relationship === "common-law" ? "Common-law" : "Conjugal",
    answers.sponsorStatus === "citizen" ? "Sponsor: Citizen" : "Sponsor: PR",
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <div className="checklist-container" style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 96px" }}>

        {/* Print header (only shows when printing) */}
        <div style={{ display: "none" }} className="print-header">
          <h1 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>
            Canadian Spousal PR — Document Checklist
          </h1>
          <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
            Generated from canada.ca IRCC requirements. Verify all requirements at canada.ca before submitting.
          </p>
          <hr style={{ marginBottom: "24px" }} />
        </div>

        {/* Top bar */}
        <div className="no-print" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <button
            onClick={() => router.push("/questionnaire")}
            style={{
              fontSize: "13px",
              color: "#888",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ← Start over
          </button>
          <button
            onClick={handlePrint}
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "7px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ↓ Save as PDF
          </button>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 700,
          color: "#111",
          letterSpacing: "-0.02em",
          marginBottom: "8px",
        }}>
          Your Document Checklist
        </h1>

        {/* Summary tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          <span style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#666",
            background: "#f5f5f5",
            padding: "4px 10px",
            borderRadius: "99px",
          }}>
            {countryNames[answers.country] || answers.country}
          </span>
          {summaryParts.map((p) => (
            <span key={p} style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#666",
              background: "#f5f5f5",
              padding: "4px 10px",
              borderRadius: "99px",
            }}>
              {p}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="no-print" style={{ marginBottom: "48px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "#888",
            marginBottom: "8px",
          }}>
            <span>{completedCount} of {totalCount} complete</span>
            <span style={{ fontWeight: 600, color: "#111" }}>{pct}%</span>
          </div>
          <div style={{ height: "4px", background: "#f0f0f0", borderRadius: "2px" }}>
            <div style={{
              height: "100%",
              background: "#2563eb",
              borderRadius: "2px",
              width: `${pct}%`,
              transition: "width 0.3s ease",
            }} />
          </div>
        </div>

        {/* Checklist by category */}
        {categoryOrder.map((cat) => {
          const docs = grouped[cat];
          if (!docs || docs.length === 0) return null;

          return (
            <div key={cat} style={{ marginBottom: "48px" }}>
              {/* Category header */}
              <div className="category-header" style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#aaa",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
                paddingBottom: "12px",
                borderBottom: "1px solid #f0f0f0",
              }}>
                {categoryLabels[cat]}
              </div>

              {/* Documents */}
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="checkbox-item"
                  onClick={() => toggleCheck(doc.id)}
                >
                  {/* Checkbox */}
                  <div className={`checkbox-box${checked[doc.id] ? " checked" : ""}`}>
                    {checked[doc.id] && (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginBottom: "6px",
                    }}>
                      <span style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: checked[doc.id] ? "#aaa" : "#111",
                        textDecoration: checked[doc.id] ? "line-through" : "none",
                        transition: "color 0.15s",
                      }}>
                        {doc.title}
                      </span>
                      {doc.titleLocal && (
                        <span style={{ fontSize: "13px", color: "#aaa" }}>
                          {doc.titleLocal}
                        </span>
                      )}
                      {doc.formNumber && (
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#999",
                          background: "#f5f5f5",
                          padding: "2px 7px",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}>
                          {doc.formNumber}
                        </span>
                      )}
                    </div>

                    <p style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: 1.6,
                      margin: "0 0 8px 0",
                    }}>
                      {doc.description}
                    </p>

                    {/* Meta info */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {doc.where && (
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          <span style={{ fontWeight: 600, color: "#555" }}>Where: </span>
                          {doc.where}
                        </div>
                      )}
                      {doc.howLong && (
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          <span style={{ fontWeight: 600, color: "#555" }}>How long: </span>
                          {doc.howLong}
                        </div>
                      )}
                      {doc.important && (
                        <div style={{
                          fontSize: "12px",
                          color: "#b45309",
                          background: "#fffbeb",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          marginTop: "6px",
                          lineHeight: 1.5,
                        }}>
                          ⚠ {doc.important}
                        </div>
                      )}
                      {doc.officialUrl && (
                        <div style={{ marginTop: "4px" }}>
                          <a
                            href={doc.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontSize: "12px",
                              color: "#555",
                              textDecoration: "underline",
                            }}
                          >
                            Official source →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Bottom note */}
        <div style={{
          marginTop: "48px",
          padding: "20px",
          background: "#fafafa",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#888",
          lineHeight: 1.6,
        }}>
          <strong style={{ color: "#555" }}>Always verify at canada.ca.</strong>{" "}
          IRCC requirements change frequently. Verify all requirements at canada.ca before submitting. Check{" "}
          <a
            href="https://ircc.canada.ca/english/information/applications/spouse.asp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555", textDecoration: "underline" }}
          >
            the official IRCC country-specific requirements
          </a>{" "}
          before submitting.
        </div>

        {/* Print footer */}
        <div style={{
          marginTop: "32px",
          fontSize: "11px",
          color: "#bbb",
          borderTop: "1px solid #f0f0f0",
          paddingTop: "16px",
        }}>
          Generated for informational purposes only. Not legal advice. Verify all requirements at canada.ca.
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-header { display: block !important; }
        }
      `}</style>
    </main>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ color: "#aaa", fontSize: "15px" }}>Building your checklist...</div>
      </div>
    }>
      <ChecklistContent />
    </Suspense>
  );
}
