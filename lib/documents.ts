import { DocumentItem, Answers } from "./types";

export const documents: DocumentItem[] = [

  // ─── REQUIRED FORMS (everyone) ────────────────────────────────────────────

  {
    id: "imm5533",
    category: "forms",
    title: "Document Checklist — IMM 5533",
    formNumber: "IMM 5533",
    description: "The official IRCC document checklist. You must upload this completed form with your application.",
    where: "Download from canada.ca, fill it out, upload it with your application",
    officialUrl: "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/forms/imm5533e.pdf",
  },
  {
    id: "imm1344",
    category: "forms",
    title: "Application to Sponsor, Sponsorship Agreement and Undertaking — IMM 1344",
    formNumber: "IMM 1344",
    description: "The primary sponsorship form. Must be completed and digitally signed by BOTH the sponsor and the applicant.",
    where: "Download from canada.ca. Complete, sign digitally, upload as PDF.",
    important: "Both parties must sign. Application is returned without processing if unsigned.",
    officialUrl: "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/forms/imm1344e.pdf",
  },
  {
    id: "imm5532",
    category: "forms",
    title: "Relationship Information and Sponsorship Evaluation — IMM 5532",
    formNumber: "IMM 5532",
    description: "Details the relationship between the sponsor and applicant. Both parties complete their own sections and sign. Sponsor signs Part A (#9) and Part C (#12). Applicant signs Part B (#5) and Part C (#13).",
    where: "Download from canada.ca. Both complete and sign their sections.",
    officialUrl: "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/forms/imm5532e.pdf",
  },
  {
    id: "imm0008",
    category: "forms",
    title: "Generic Application Form for Canada — IMM 0008",
    formNumber: "IMM 0008",
    description: "The main application form for the applicant (and any dependents). Completed digitally through the IRCC online portal.",
    where: "Completed online in the IRCC portal — not a downloaded form.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5289-sponsor-your-spouse-common-law-partner-conjugal-partner-dependent-child-complete-guide.html",
  },
  {
    id: "imm5406",
    category: "forms",
    title: "Additional Family Information — IMM 5406",
    formNumber: "IMM 5406",
    description: "Completed by the applicant and any family members 18 or older who are not Canadian citizens or PRs. Completed digitally in the IRCC online portal.",
    where: "Completed online in the IRCC portal.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5289-sponsor-your-spouse-common-law-partner-conjugal-partner-dependent-child-complete-guide.html",
  },
  {
    id: "imm5669",
    category: "forms",
    title: "Schedule A — Background / Declaration — IMM 5669",
    formNumber: "IMM 5669",
    description: "Background and declaration form completed by the applicant (and family members 18+ who are not Canadian citizens or PRs). Completed digitally in the IRCC online portal.",
    where: "Completed online in the IRCC portal.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5289-sponsor-your-spouse-common-law-partner-conjugal-partner-dependent-child-complete-guide.html",
  },

  // ─── SPONSOR DOCUMENTS ────────────────────────────────────────────────────

  {
    id: "sponsor-status",
    category: "sponsor",
    title: "Proof of Sponsor's Canadian Status",
    description: "Photocopy of one of: Canadian passport (bio page), citizenship certificate or card (both sides), or Canadian birth certificate. If sponsor is a PR: copy of both sides of PR card, or Confirmation of Permanent Residence (CoPR).",
    where: "Your own documents at home",
    important: "Expired PR cards are acceptable — still submit a copy.",
  },
  {
    id: "sponsor-income",
    category: "sponsor",
    title: "Proof of Sponsor's Employment and Income",
    description: "An original letter from your employer (stating period of employment, salary, and regular hours) AND your most recent CRA Notice of Assessment (line 15000 — Total Income) or Option C proof of income statement. If self-employed, provide supporting financial documents instead of the employer letter.",
    where: "Employer letter: request from your HR or manager. Notice of Assessment: download from CRA My Account at canada.ca/cra",
    officialUrl: "https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html",
  },
  {
    id: "application-fees",
    category: "sponsor",
    title: "Application Fees Receipt",
    description: "Single receipt covering: Sponsorship fee ($85) + Processing fee ($545) + Right of Permanent Residence Fee ($575) = $1,205 CAD total for the principal applicant. Plus biometrics fee ($85/person or $170 max for families). Pay biometrics upfront to avoid delays.",
    where: "Paid online through the IRCC portal when submitting your application.",
    important: "Paying the Right of Permanent Residence Fee (RPRF) upfront is strongly recommended — it can increase processing time if paid late.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5525-basic-guide-sponsor-your-spouse-partner-child.html",
  },

  // ─── APPLICANT DOCUMENTS (always required) ────────────────────────────────

  {
    id: "passport",
    category: "applicant",
    title: "Passport — Copy of All Relevant Pages",
    description: "Photocopy of your most recently issued passport: bio page (photo, name, DOB, passport number, dates), any pages with Canadian entry stamps, and any pages with visas for countries you currently reside in. Do not submit diplomatic or official affairs passports.",
    where: "Your own passport",
    important: "You don't need a valid passport to submit the application, but you will need one to travel to Canada when approved.",
  },
  {
    id: "birth-certificate",
    category: "applicant",
    title: "Birth Certificate",
    description: "A copy of your birth certificate. If it is not in English or French, you must include a certified translation plus the original document.",
    where: "Obtain from the civil registry or vital statistics office in your country of birth.",
    // Each supported country has its own country-specific version with accurate details.
    // This generic fallback only shows if a country outside the 6 supported ones is somehow selected.
    condition: (a: Answers) => !["south-korea", "philippines", "india", "china", "uk", "usa"].includes(a.country),
  },
  {
    id: "photos",
    category: "applicant",
    title: "Immigration Photos — Front and Back",
    description: "One photo meeting IRCC's Permanent Resident Card photo specifications. Upload both the front and back of the photo. Size: 50mm x 70mm. White background. Taken within the last 6 months. Name and date of birth written on the back.",
    where: "Any photo studio. Ask for 'Canadian immigration photos' or 'PR card photos'.",
    important: "Photos that don't meet specifications will cause processing delays.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/pr-card/apply-renew-replace/photo.html",
  },
  {
    id: "medical-exam",
    category: "applicant",
    title: "Medical Examination — IRCC-Approved Panel Physician",
    description: "Do NOT complete this now. IRCC will send you medical instructions at the appropriate stage of processing. When instructed, you must see an IRCC-approved panel physician (not your regular doctor). If you completed an immigration medical in the last 12 months, attach the Information Sheet from that physician.",
    where: "IRCC-approved panel physicians only. Find the list at the IRCC website when you receive medical instructions.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-permanent-residents.html",
  },

  // ─── SOUTH KOREA — COUNTRY-SPECIFIC ───────────────────────────────────────

  {
    id: "kr-family-cert",
    category: "country-specific",
    title: "가족관계증명서 — Family Relation Certificate",
    titleLocal: "가족관계증명서",
    description: "Required by IRCC for all South Korean passport holders. Shows your family registry including parents and registered relationships. Submit a copy and a certified English translation. Must be issued within 6 months of your application date.",
    where: "Your local municipal office (읍/면/동 주민센터) or online at minwon.go.kr. Request the 상세증명서 (detailed) version.",
    howLong: "Same-day at a municipal office or online. Certified translation: 1–2 weeks. Get this close to your submission date.",
    important: "Must be issued within 6 months of your application date. Do not get this too early.",
    officialUrl: "https://ircc.canada.ca/english/information/applications/spouse.asp",
    condition: (a: Answers) => a.country === "south-korea",
  },
  {
    id: "kr-marriage-cert",
    category: "country-specific",
    title: "혼인관계증명서 — Marriage Relation Certificate",
    titleLocal: "혼인관계증명서",
    description: "The official Korean government document confirming your marriage is legally registered. Submit a copy and a certified English translation. No apostille is listed as a requirement by IRCC.",
    where: "Your local municipal office (읍/면/동 주민센터) or online at minwon.go.kr. Request the 상세증명서 (detailed) version.",
    howLong: "Same-day at a municipal office or online. Certified translation: 1–2 weeks.",
    important: "Certified translation required. A marriage license or record of solemnization is NOT acceptable — must be the officially registered certificate.",
    officialUrl: "https://ircc.canada.ca/english/information/applications/spouse.asp",
    condition: (a: Answers) => a.country === "south-korea" && a.relationship === "married",
  },
  {
    id: "kr-national-id",
    category: "country-specific",
    title: "주민등록증 — National ID Card (Copy)",
    titleLocal: "주민등록증",
    description: "A photocopy of your Korean National ID card (front and back). No translation required for the copy itself, but your other translated documents will cover the information.",
    where: "Your own ID card",
    howLong: "Immediate — you already have this.",
    condition: (a: Answers) => a.country === "south-korea",
  },
  {
    id: "kr-police-cert",
    category: "country-specific",
    title: "Police Certificate — South Korea (범죄·수사경력 회보서)",
    titleLocal: "범죄·수사경력 회보서",
    description: "\"Criminal (Investigation) Records Check Report\" issued by the Korean National Police Agency. This covers both criminal records and investigation records — request the combined 범죄·수사경력 회보서, not just the 범죄경력 version. Must include a certified English translation. Valid for 6 months from issue date.",
    where: "In person at any police station (free, issued immediately) or online. Korean nationals can apply at any station; specify the purpose as \"For permission of foreign country immigration and stay.\"",
    howLong: "Immediate in-person. Add 1–2 weeks for certified translation.",
    important: "Valid for 6 months. Do not get this too early. Request the scope to include investigation records (수사경력), not just criminal records.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/korea-south.html",
    condition: (a: Answers) => a.country === "south-korea",
  },

  // ─── PHILIPPINES — COUNTRY-SPECIFIC ──────────────────────────────────────

  {
    id: "ph-birth-cert",
    category: "country-specific",
    title: "PSA Birth Certificate",
    description: "Philippine Statistics Authority (PSA) birth certificate on security paper. This is the only accepted version — municipal-level copies are not accepted by IRCC. PSA documents are issued in English — no translation required.",
    where: "PSA Serbilis centers, or order online at serbilis.ph or via authorized courier services.",
    howLong: "Online delivery: 1–3 weeks. Walk-in at PSA: same day.",
    important: "Must be on PSA security paper (blue background). Older NSO copies are acceptable if on security paper.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/philippines.html",
    condition: (a: Answers) => a.country === "philippines",
  },
  {
    id: "ph-marriage-cert",
    category: "country-specific",
    title: "PSA Marriage Certificate",
    description: "Philippine Statistics Authority (PSA) marriage certificate on security paper. Required if you are married. PSA documents are issued in English — no translation required.",
    where: "PSA Serbilis centers, or order online at serbilis.ph.",
    howLong: "Online delivery: 1–3 weeks. Walk-in: same day.",
    important: "Must be on PSA security paper.",
    condition: (a: Answers) => a.country === "philippines" && a.relationship === "married",
  },
  {
    id: "ph-cenomar",
    category: "country-specific",
    title: "CENOMAR — Certificate of No Marriage Record",
    description: "PSA Certificate of No Marriage Record. Required if you are not legally married (common-law or conjugal applications) to prove you are legally free to marry.",
    where: "PSA Serbilis centers, or order online at serbilis.ph.",
    howLong: "Online delivery: 1–3 weeks. Walk-in: same day.",
    condition: (a: Answers) => a.country === "philippines" && a.relationship !== "married",
  },
  {
    id: "ph-nbi-clearance",
    category: "country-specific",
    title: "NBI Multi-Purpose Clearance Certificate — Police Certificate",
    description: "National Bureau of Investigation (NBI) Multi-Purpose Clearance Certificate. This serves as your Philippine police certificate. Issued in English — no translation required. Must have a thumbprint and include a dry seal on the certificate.",
    where: "Apply online or in person at any NBI office, at Philippine embassies/consulates, or by mail to NBI Head Office (3rd Floor, NBI Clearance Building, UN Ave., Ermita, Manila). Visit nbi.gov.ph.",
    howLong: "Walk-in with no hits: same day. Mail/online: 1–3 weeks.",
    important: "Must have thumbprint and dry seal. No translation needed — the NBI Clearance is issued in English.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/philippines.html",
    condition: (a: Answers) => a.country === "philippines",
  },

  // ─── INDIA — COUNTRY-SPECIFIC ────────────────────────────────────────────

  {
    id: "in-birth-cert",
    category: "country-specific",
    title: "Birth Certificate — India",
    description: "A certified copy of your birth certificate issued by the municipal authority or local registrar. If not in English, include a certified translation.",
    where: "Municipal Corporation or local birth registration office where you were born.",
    howLong: "1–3 weeks depending on the municipality.",
    condition: (a: Answers) => a.country === "india",
  },
  {
    id: "in-marriage-cert",
    category: "country-specific",
    title: "Marriage Registration Certificate — India",
    description: "Marriage certificate issued by the local Sub-Registrar of Marriages. Must be a government-registered certificate. Include a certified English translation if not in English.",
    where: "Sub-Registrar's office in the district where the marriage was registered.",
    important: "A religious ceremony certificate is NOT sufficient — must be government-registered.",
    condition: (a: Answers) => a.country === "india" && a.relationship === "married",
  },
  {
    id: "in-police-cert",
    category: "country-specific",
    title: "Police Certificate — India (Police Clearance Certificate)",
    description: "Indian Police Clearance Certificate (PCC) obtained through the Passport Seva portal. Required for all districts you have lived in for 6+ months since age 18. Include a certified English translation.",
    where: "Apply online at passportindia.gov.in (Police Clearance Certificate / PCC).",
    howLong: "2–4 weeks.",
    important: "Apply for each district you have lived in. Valid for 6 months. Character Certificates are NOT accepted by IRCC — must be a Police Clearance Certificate (PCC).",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/india.html",
    condition: (a: Answers) => a.country === "india",
  },

  // ─── CHINA — COUNTRY-SPECIFIC ────────────────────────────────────────────

  {
    id: "cn-birth-cert",
    category: "country-specific",
    title: "Birth Certificate — China (出生医学证明)",
    titleLocal: "出生医学证明",
    description: "Birth certificate issued by the hospital or civil affairs bureau. Include a certified English translation.",
    where: "Hospital where you were born or local Civil Affairs Bureau (民政局).",
    condition: (a: Answers) => a.country === "china",
  },
  {
    id: "cn-marriage-cert",
    category: "country-specific",
    title: "Marriage Certificate — China (结婚证)",
    titleLocal: "结婚证",
    description: "Official Chinese marriage certificate (结婚证) issued by the Civil Affairs Bureau at the time of marriage registration. Include a certified English translation.",
    where: "The Civil Affairs Bureau (民政局) where the marriage was registered — or request a replacement if lost.",
    important: "Both the applicant's and sponsor's names must appear. Certified translation required.",
    condition: (a: Answers) => a.country === "china" && a.relationship === "married",
  },
  {
    id: "cn-hukou",
    category: "country-specific",
    title: "Hukou — Household Registration (户口本)",
    titleLocal: "户口本",
    description: "A copy of your household registration booklet (户口本), including the cover page and your individual page. Include a certified English translation.",
    where: "Your family's copy at home, or your local police station (派出所) for a replacement.",
    condition: (a: Answers) => a.country === "china",
  },
  {
    id: "cn-police-cert",
    category: "country-specific",
    title: "Notary Certificate of No Criminal Convictions — China",
    titleLocal: "无犯罪记录公证书",
    description: "IRCC requires a \"Notary Certificate of No Criminal Convictions\" issued by a notary public office — not a plain PSB certificate. Process: (1) Get a No Criminal Record Certificate from your local Public Security Bureau (PSB/公安局) near your hukou address. (2) Take it to a foreign-related notary public office (公证处) who will issue the official notarized certificate. Include a notarized translation.",
    where: "Step 1: Local PSB (公安局) near your hukou address. Step 2: A foreign-related notary public office (公证处). If abroad, appoint an immediate family member with notarized authorization.",
    howLong: "1–4 weeks total for both steps.",
    important: "Must be from a notary public office — a plain PSB certificate is NOT sufficient. Notarized translation also required. Valid for 6 months.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/china.html",
    condition: (a: Answers) => a.country === "china",
  },

  // ─── UNITED KINGDOM — COUNTRY-SPECIFIC ───────────────────────────────────

  {
    id: "uk-birth-cert",
    category: "country-specific",
    title: "Birth Certificate — United Kingdom (Full/Long Form)",
    description: "Full birth certificate (long form) showing parents' details. Short certificates are not accepted by IRCC.",
    where: "General Register Office (GRO) at gro.gov.uk, or local register office where birth was registered.",
    howLong: "Online order: delivered in 3–5 business days.",
    important: "Must be the full (long form) birth certificate, not a short certificate.",
    condition: (a: Answers) => a.country === "uk",
  },
  {
    id: "uk-marriage-cert",
    category: "country-specific",
    title: "Marriage Certificate — United Kingdom",
    description: "Official marriage certificate from the register office where the marriage was registered.",
    where: "General Register Office (GRO) at gro.gov.uk, or the local register office where the marriage took place.",
    howLong: "Online order: delivered in 3–5 business days.",
    condition: (a: Answers) => a.country === "uk" && a.relationship === "married",
  },
  {
    id: "uk-police-cert",
    category: "country-specific",
    title: "ACRO Police Certificate — United Kingdom",
    description: "Criminal record certificate issued by ACRO Criminal Records Office. Required for all UK residents who have lived there for 6+ months since age 18. No translation needed (issued in English).",
    where: "Apply online at acro.police.uk/police-certificates.",
    howLong: "Standard: 10 business days. Express: 5 business days.",
    important: "Valid for 6 months from issue date.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/united-kingdom.html",
    condition: (a: Answers) => a.country === "uk",
  },

  // ─── USA — COUNTRY-SPECIFIC ───────────────────────────────────────────────

  {
    id: "us-birth-cert",
    category: "country-specific",
    title: "Birth Certificate — United States (Certified Copy)",
    description: "Certified copy of your birth certificate issued by the vital records office of the state where you were born.",
    where: "State vital records office or county clerk's office where you were born.",
    howLong: "Mail order: 2–6 weeks depending on state. Expedited options available in most states.",
    condition: (a: Answers) => a.country === "usa",
  },
  {
    id: "us-marriage-cert",
    category: "country-specific",
    title: "Marriage Certificate — United States (Certified Copy)",
    description: "Certified copy of your marriage certificate issued by the county clerk's office where the marriage was registered.",
    where: "County clerk's office or vital records office of the county where you married.",
    condition: (a: Answers) => a.country === "usa" && a.relationship === "married",
  },
  {
    id: "us-police-cert",
    category: "country-specific",
    title: "FBI Identity History Summary — Police Certificate",
    description: "FBI Identity History Summary (FBI background check). Required for all US residents who have lived there for 6+ months since age 18. No translation needed (issued in English).",
    where: "Apply online at the FBI Electronic Departmental Order (edo.cjis.gov), or by mail via a fingerprint service provider.",
    howLong: "Online with identity proofing: 2–3 days. By mail with fingerprints: 8–10 weeks.",
    important: "Valid for 6 months. The online method is significantly faster.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how/united-states.html",
    condition: (a: Answers) => a.country === "usa",
  },
  {
    id: "us-state-id",
    category: "country-specific",
    title: "State ID or Driver's License (Copy)",
    description: "A photocopy of your US state ID or driver's license (front and back).",
    where: "Your own ID",
    howLong: "Immediate — you already have this.",
    condition: (a: Answers) => a.country === "usa",
  },

  // ─── RELATIONSHIP PROOF ───────────────────────────────────────────────────
  // IMM 5533 Section 7: If ALL 4 are true — living together, children together,
  // first marriage for both, AND married 2+ years — additional proof can be skipped.
  // In all other cases, photos + at least 2 of 4 additional evidence are required.

  {
    id: "relationship-proof-together",
    category: "relationship",
    title: "Proof of Cohabitation — at least 2 of the following",
    description: "Since you are living together, provide at least 2 of: (1) rental agreement showing both names, (2) joint utility/bank/credit card accounts (minimum 1 joint bill), (3) government-issued documents for both showing same address (e.g. driver's licenses), (4) other documents showing same address — cell bills, pay stubs, bank statements.",
    where: "Your own records",
    condition: (a: Answers) => a.livingTogether === true,
  },
  {
    id: "relationship-proof-apart",
    category: "relationship",
    title: "Proof of Ongoing Contact + Proof of Sponsor Visits",
    description: "Since you are living apart, provide: (1) Proof of contact — printed messages, emails, social media conversations (max 10 pages, translated if not English/French). (2) Proof of sponsor's visits — airline ticket stubs, boarding passes, passport pages showing entry/exit stamps. If sponsor didn't visit, explain in IMM 5532 Part C Question 4.",
    where: "Your own messages and travel records",
    condition: (a: Answers) => a.livingTogether === false,
  },
  {
    id: "relationship-photos",
    category: "relationship",
    title: "Relationship Photos — up to 20",
    description: "Photographs showing your relationship taken at different times and places. Include wedding/engagement photos, trips, family gatherings, and everyday moments. Upload with a separate document providing a brief description of each photo (date, location, occasion). Maximum 20 photos.",
    where: "Your own photos. Upload as JPG, JPEG, or PDF.",
    important: "Maximum 20 photos. Include a labeled description document. Required unless you answered YES to all four: living together, children together, first marriage for both, and married 2+ years.",
    condition: (a: Answers) => !(
      a.livingTogether === true &&
      a.childrenTogether === true &&
      a.previousMarriage === false &&
      a.marriedTwoYears === true &&
      a.relationship === "married"
    ),
  },
  {
    id: "relationship-additional",
    category: "relationship",
    title: "Additional Relationship Evidence — at least 2 of the following",
    description: "Provide at least 2 of: (1) Important documents showing you are recognized as each other's spouse (employment benefits, insurance). (2) Evidence of financial support or shared expenses. (3) Letters from friends/family, or social media showing your public relationship. (4) Proof of past cohabitation (if you are not currently living together but did previously).",
    where: "Your own records and correspondence",
    condition: (a: Answers) => !(
      a.livingTogether === true &&
      a.childrenTogether === true &&
      a.previousMarriage === false &&
      a.marriedTwoYears === true &&
      a.relationship === "married"
    ),
  },

  // ─── CONDITIONAL DOCUMENTS ────────────────────────────────────────────────

  {
    id: "prev-marriage-docs",
    category: "conditional",
    title: "Previous Relationship Documents (Divorce or Death Certificate)",
    description: "For each previous marriage or long-term relationship — provide a final divorce certificate (if divorced), annulment certificate (if annulled), or death certificate of former spouse (if deceased). Required for both the applicant AND the sponsor if either has a prior relationship.",
    where: "Court records, vital statistics office, or equivalent government body where the divorce/death was registered.",
    important: "Must be certified copies. If not in English or French, must include certified translation.",
    condition: (a: Answers) => a.previousMarriage === true,
  },
  {
    id: "children-docs",
    category: "conditional",
    title: "Children's Documents",
    description: "For each dependent child: (1) Birth certificate showing names of both parents. (2) If child's other legal parent is not the sponsor: complete IMM 5604 (Declaration from Non-Accompanying Parent/Guardian) for each child, plus custody documents if applicable. If the other parent is deceased, provide their death certificate.",
    where: "Vital statistics office for birth certificates. Legal counsel for custody documents.",
    important: "All non-English/French documents must be certified and translated.",
    condition: (a: Answers) => a.hasChildren === true,
  },
  {
    id: "imm5604",
    category: "conditional",
    title: "Declaration from Non-Accompanying Parent/Guardian — IMM 5604",
    formNumber: "IMM 5604",
    description: "Required for each dependent child under 18 if the sponsor is NOT the child's other legal parent. The other parent must sign this form and include a copy of their identity document.",
    where: "Download from canada.ca",
    officialUrl: "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/forms/imm5604e.pdf",
    condition: (a: Answers) => a.hasChildren === true,
  },
  {
    id: "other-country-police",
    category: "conditional",
    title: "Police Certificates — Other Countries Lived In",
    description: "You must provide a police certificate from every country (other than Canada) where you lived for 6 or more consecutive months since age 18. This is in addition to your country-of-origin police certificate. Each must be accompanied by a certified English translation.",
    where: "Each country's relevant law enforcement or government authority. Check canada.ca for country-specific instructions.",
    important: "Valid for 6 months from issue date. Requirements vary by country — check the IRCC police certificate page for each country.",
    officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/police-certificates/how.html",
    condition: (a: Answers) => a.otherCountries && a.otherCountries.length > 0 && a.otherCountries[0] !== "no",
  },
  {
    id: "inland-status",
    category: "conditional",
    title: "Proof of Immigration Status in Canada (Applicant)",
    description: "If the applicant is living in Canada: provide a copy of your current status document (temporary resident visa, study permit, work permit, temporary resident permit). If you do not have status in Canada, provide a written explanation and any relevant documents.",
    where: "Your own documents",
    condition: (a: Answers) => a.applicationType === "inland",
  },
  {
    id: "common-law-proof",
    category: "conditional",
    title: "Proof of 12 Months of Cohabitation (Common-Law)",
    description: "For common-law applications, you must demonstrate 12+ consecutive months of living together. Provide documents showing shared address over the required period: joint lease/mortgage, joint bank accounts, joint utility bills, government documents showing same address.",
    where: "Your own records across the 12-month cohabitation period.",
    important: "You must show the full 12+ month period — not just current cohabitation.",
    condition: (a: Answers) => a.relationship === "common-law",
  },
];

export function getDocumentsForAnswers(answers: Answers): DocumentItem[] {
  return documents.filter((doc) => {
    if (!doc.condition) return true;
    return doc.condition(answers);
  });
}

export const categoryLabels: Record<DocumentItem["category"], string> = {
  forms: "Required Forms",
  sponsor: "Sponsor Documents",
  applicant: "Applicant Documents",
  "country-specific": "Country-Specific Documents",
  relationship: "Proof of Relationship",
  conditional: "Additional Documents (Based on Your Situation)",
};

export const categoryOrder: DocumentItem["category"][] = [
  "forms",
  "sponsor",
  "applicant",
  "country-specific",
  "relationship",
  "conditional",
];
