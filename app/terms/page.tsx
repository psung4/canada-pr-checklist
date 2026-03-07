import Link from "next/link";

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "64px 24px 96px" }}>

        <Link href="/" style={{
          fontSize: "13px",
          color: "#888",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "48px",
        }}>
          ← Back
        </Link>

        <h1 style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#111",
          letterSpacing: "-0.02em",
          marginBottom: "8px",
        }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "48px" }}>
          Last updated: March 2026
        </p>

        {[
          {
            title: "1. Informational tool only",
            body: "This tool organizes publicly available information from Immigration, Refugees and Citizenship Canada (IRCC) into a checklist format. It is not legal advice, immigration advice, or professional advice of any kind.",
          },
          {
            title: "2. No guarantees",
            body: "We make no guarantees about the accuracy, completeness, or currency of the information provided. IRCC requirements change frequently. You are responsible for verifying all document requirements directly with IRCC at canada.ca before submitting your application.",
          },
          {
            title: "3. No professional relationship",
            body: "Using this tool does not create any professional, advisory, legal, or fiduciary relationship between you and the creators of this tool.",
          },
          {
            title: "4. Limitation of liability",
            body: "The creators of this tool accept no liability of any kind for application outcomes, processing delays, application rejections, government fees paid, legal costs, or any other losses arising from your use of this tool or reliance on the information it provides.",
          },
          {
            title: "5. Your responsibility",
            body: "You are solely responsible for verifying your documents, completing your forms correctly, and submitting your application. If you have complex circumstances, consult a Regulated Canadian Immigration Consultant (RCIC) or immigration lawyer.",
          },
          {
            title: "6. No affiliation with IRCC",
            body: "This tool is not affiliated with, endorsed by, or connected to Immigration, Refugees and Citizenship Canada (IRCC), the Government of Canada, or any other government agency.",
          },
          {
            title: "7. Privacy",
            body: "This tool does not collect, store, or transmit your personal information to any server. All data you enter stays in your browser only. We use Vercel Analytics to collect anonymous, aggregate visitor counts (no cookies, no personal data).",
          },
        ].map((item) => (
          <div key={item.title} style={{ marginBottom: "36px" }}>
            <h2 style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#111",
              marginBottom: "8px",
            }}>
              {item.title}
            </h2>
            <p style={{
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.7,
              margin: 0,
            }}>
              {item.body}
            </p>
          </div>
        ))}

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
          By using this tool, you acknowledge that you have read and agree to these terms.
        </div>

        <div style={{ marginTop: "48px" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#111",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "7px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
