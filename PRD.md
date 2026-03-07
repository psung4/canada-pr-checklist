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

## Security Posture

### Attack Surface
This is a static frontend app. There is no server-side user input processing, no database, no authentication, and no user-generated content served to other users. The attack surface is extremely small.

### Mitigations in Place
| Threat | Mitigation |
|--------|-----------|
| Clickjacking | `X-Frame-Options: DENY` header |
| MIME sniffing | `X-Content-Type-Options: nosniff` header |
| XSS via URL params | React renders all text content safely (escapes HTML); URL params are also whitelisted against allowed values before use |
| Unexpected URL param values | `safeParam()` whitelist validator in checklist/page.tsx — invalid values fall back to safe defaults |
| Referrer leakage | `Referrer-Policy: strict-origin-when-cross-origin` header |
| Unwanted browser features | `Permissions-Policy: camera=(), microphone=(), geolocation=()` |
| localStorage manipulation | Only affects the manipulating user's own session — not a concern |
| Analytics abuse | Vercel Analytics `track()` is client-side only; fake events from console do not affect other users or document content |

### What "Rate Limiting Bypass" Means for This App
There are no API endpoints to rate-limit. The concern about "bypassing rate limiting via input" applies to apps with server-side processing. This app has none, so it does not apply. If future features add server-side endpoints (e.g., email delivery, user accounts), rate limiting must be added at that point.

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
