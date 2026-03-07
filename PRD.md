# PRD — Canadian Spousal PR Checklist Tool

## What It Is

A free, no-login web tool that generates a personalized document checklist for Canadian spousal/partner permanent residence applications. The user answers ~8–10 questions and receives a tailored, trackable checklist based on their specific situation.

## Problem

The IRCC document requirements for spousal PR are fragmented, country-specific, and conditional on relationship type, living situation, prior marriages, children, etc. Applicants spend hours cross-referencing PDFs and forum threads and frequently miss documents or get wrong ones.

## Target Users

People applying for Canadian spousal/partner PR (outland or inland), or their sponsors, who want a clear and personalized list of what to gather.

## MVP Goal

Validate whether there is real user demand for this tool. Success = meaningful organic traffic and checklist completions within 4–6 weeks of launch.

---

## Current Feature Set (MVP)

### Questionnaire (9–10 questions, conditional)
1. **Country of citizenship** — drives all country-specific documents (passport country, not birth country)
2. **Where applicant lives** — inland (in Canada) vs. outland
3. **Relationship type** — married / common-law / conjugal
4. **Married 2+ years?** — only shown if married; part of IMM 5533 4-condition shortcut
5. **Sponsor status** — Canadian citizen vs. PR
6. **Previous marriage?** — triggers divorce/death cert requirement
7. **Dependent children?** — triggers child-specific documents
8. **Children together?** — part of 4-condition shortcut
9. **Lived in other countries?** — triggers additional police certificates
10. **Living together?** — drives cohabitation vs. contact evidence

### Checklist Output
- Grouped by category: Required Forms, Sponsor Docs, Applicant Docs, Country-Specific, Proof of Relationship, Additional (Conditional)
- Each item: title, local-language name (where applicable), description, where to get it, how long it takes, important notes, official source link
- Progress bar (persisted in localStorage)
- Print-to-PDF via `window.print()`

### Countries Supported
South Korea, Philippines, India, China, United Kingdom, United States

### 4-Condition Shortcut (IMM 5533 logic)
Relationship photos + additional evidence are NOT required if ALL of:
- Living together ✓
- Have children together ✓
- No previous marriages (either person) ✓
- Married 2+ years ✓
- Relationship type = married ✓

---

## Analytics

Vercel Analytics events tracked:
- `questionnaire_started`
- `questionnaire_completed`
- `checklist_viewed`
- `checklist_item_checked` (with docId and checked state)
- `checklist_completed` (all items checked)
- `print_clicked`

---

## Architecture

- **Next.js 14** (App Router), TypeScript
- **Frontend-only** — no backend, no database, no API routes
- State: URL query params (questionnaire → checklist), localStorage (checklist progress)
- Deployment: Vercel
- Analytics: Vercel Analytics

---

## Security

### Current Architecture: Static Frontend
This app has no backend, no database, no API routes, no user accounts, and no API keys. This means the entire class of server-side vulnerabilities (exposed secrets, SQL injection, auth bypass, RLS misconfig) simply does not exist here. The attack surface is extremely small.

### What's In Place (MVP)
| Threat | Mitigation | Status |
|--------|-----------|--------|
| Clickjacking | `X-Frame-Options: DENY` header | ✅ Done |
| MIME sniffing | `X-Content-Type-Options: nosniff` | ✅ Done |
| XSS via URL params | React escapes all text; params whitelisted via `safeParam()` | ✅ Done |
| Invalid URL param values | `safeParam()` validator — invalid values fall back to safe defaults | ✅ Done |
| Referrer leakage | `Referrer-Policy: strict-origin-when-cross-origin` | ✅ Done |
| Unwanted browser features | `Permissions-Policy: camera=(), microphone=(), geolocation=()` | ✅ Done |
| localStorage manipulation | Only affects the user's own session — no impact on others | ✅ N/A |
| Exposed API keys | No API keys exist in this app | ✅ N/A |
| Hallucinated/malicious packages | Only 4 deps: next, react, react-dom, @vercel/analytics — all major, real packages | ✅ N/A |
| Search engine indexing of dynamic URLs | robots.txt blocks /checklist (param-heavy, useless for SEO) | ✅ Done |
| Inaccurate privacy disclosure | Terms page accurately describes what analytics data is collected | ✅ Done |

---

### Security Checklist for Future Features
As the app grows, each new feature introduces a new security surface. Use this as a running checklist.

#### If you add a database (e.g. Supabase, Postgres)
- [ ] Enable Row Level Security (RLS) on every table — default deny, explicit allow
- [ ] Never use the service role key client-side — only use it server-side
- [ ] Create scoped roles: read-only where you only read, no delete permissions on tables that shouldn't be deletable
- [ ] Test RLS policies with a non-admin user before shipping

#### If you add API keys / external services (e.g. OpenAI, Stripe, email)
- [ ] Store all keys in `.env.local` (never hardcode in source files)
- [ ] Add `.env*` to `.gitignore` before first commit — rotate any key that was ever committed
- [ ] Make all API calls server-side (Next.js Route Handlers or Server Actions) — never call paid APIs from the browser
- [ ] Use minimum permission scope: read-only keys if you only read, restricted IP allowlists where supported

#### If you add user accounts / authentication
- [ ] Use an established provider (Clerk, NextAuth, Supabase Auth) — do not build auth from scratch
- [ ] Never store plain-text passwords
- [ ] Add rate limiting to login/signup endpoints (e.g. Upstash + middleware)
- [ ] Protect all server routes with auth middleware — default deny, explicit allow

#### If you add server-side endpoints (API routes)
- [ ] Validate and sanitize all input server-side — never trust the frontend
- [ ] Add rate limiting (Upstash ratelimit + Vercel middleware is the standard pattern)
- [ ] Return generic error messages to users — never expose stack traces or internal details
- [ ] Use CSRF protection for any state-changing endpoints

#### If you add file uploads
- [ ] Validate file type server-side (not just by extension — check MIME type)
- [ ] Set file size limits
- [ ] Store files in isolated storage (e.g. S3/Vercel Blob), never serve them from your server directly
- [ ] Scan for malware if files are shared with other users

#### General principle to always follow
> **Principle of least privilege**: only grant the minimum access needed. A feature that reads data should not have write access. A service account for sending emails should not have access to read emails. A database connection for one table should not have access to all tables.

---

## Correctness Sources

Country-specific document requirements verified against official IRCC pages:
- Korea: `canada.ca/.../korea-south.html` — corrected cert name (범죄·수사경력 회보서) and URL
- Philippines: `canada.ca/.../philippines.html` — NBI issued in English (no translation), thumbprint + dry seal required
- India: `canada.ca/.../india.html` — Character Certificates NOT accepted, PCC only
- China: `canada.ca/.../china.html` — two-step PSB → notary public office process required
- UK: `canada.ca/.../united-kingdom.html` — ACRO certificate
- USA: `canada.ca/.../united-states.html` — FBI Identity History Summary

Known limitation: Civil document requirements (birth certs, marriage certs) for non-Korea countries are based on standard IRCC guidance and general country knowledge. IRCC's spouse.asp page uses JavaScript dropdowns that do not scrape statically. Users are directed to verify at canada.ca before submitting.

---

## Known Limitations / Out of Scope for MVP

- No support for applicants from countries outside the 6 supported ones
- No support for "other" citizenship (e.g., dual citizens applying on a non-listed passport)
- No support for Quebec-specific sponsorship requirements (Quebec has its own process)
- No email/save functionality beyond print-to-PDF
- No multi-language support
- No legal advice disclaimer beyond the footer note

---

## Deployment Plan

See "Next Steps" below.

---

## Future Considerations (Post-MVP)

- Add more countries
- Quebec-specific checklist variation
- Email checklist to self
- "What does this mean?" expandable explanations per document
- Track processing times / community updates
