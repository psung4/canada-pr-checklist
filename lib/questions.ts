export interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: "single" | "multi-text";
  options?: { value: string; label: string; description?: string }[];
  showIf?: (answers: Record<string, string>) => boolean;
}

export const questions: Question[] = [
  {
    id: "country",
    text: "What country is the applicant a citizen of?",
    subtext: "Select the country that issued the applicant's passport. If the applicant has dual citizenship, select the country they are applying from.",
    type: "single",
    options: [
      { value: "south-korea", label: "🇰🇷 South Korea" },
      { value: "philippines", label: "🇵🇭 Philippines" },
      { value: "india", label: "🇮🇳 India" },
      { value: "china", label: "🇨🇳 China" },
      { value: "uk", label: "🇬🇧 United Kingdom" },
      { value: "usa", label: "🇺🇸 United States" },
    ],
  },
  {
    id: "applicationType",
    text: "Where is the applicant currently living?",
    subtext: "This determines which immigration class you apply under.",
    type: "single",
    options: [
      {
        value: "inland",
        label: "In Canada with my sponsor",
        description: "Applying under Spouse or Common-Law Partner in Canada Class",
      },
      {
        value: "outland",
        label: "Outside Canada",
        description: "Applying under Family Class from abroad",
      },
    ],
  },
  {
    id: "relationship",
    text: "What is the relationship between the applicant and the sponsor?",
    subtext: "This affects which forms you need to complete.",
    type: "single",
    options: [
      {
        value: "married",
        label: "Legally married",
        description: "Marriage is legally registered with government authorities",
      },
      {
        value: "common-law",
        label: "Common-law partners",
        description: "Have lived together in a conjugal relationship for at least 12 consecutive months",
      },
      {
        value: "conjugal",
        label: "Conjugal partners",
        description: "12+ month relationship but unable to live together due to immigration barriers or other reasons",
      },
    ],
  },
  {
    id: "marriedTwoYears",
    text: "Have you and your sponsor been married for at least 2 years?",
    subtext: "As of your application date. This affects how much relationship proof IRCC requires.",
    type: "single",
    showIf: (answers) => answers.relationship === "married",
    options: [
      {
        value: "false",
        label: "No — less than 2 years",
        description: "You'll need to provide relationship photos and additional evidence",
      },
      {
        value: "true",
        label: "Yes — 2 years or more",
        description: "May reduce the additional proof of relationship required",
      },
    ],
  },
  {
    id: "sponsorStatus",
    text: "What is the sponsor's status in Canada?",
    subtext: "The sponsor is the person already in Canada doing the sponsoring.",
    type: "single",
    options: [
      {
        value: "citizen",
        label: "Canadian citizen",
        description: "Has a Canadian passport, citizenship certificate, or Canadian birth certificate",
      },
      {
        value: "pr",
        label: "Permanent resident (PR)",
        description: "Has a permanent resident card or Confirmation of Permanent Residence",
      },
    ],
  },
  {
    id: "previousMarriage",
    text: "Has either person been previously married or in a long-term relationship?",
    subtext: "Previous relationships require additional documents for both the sponsor and the applicant.",
    type: "single",
    options: [
      {
        value: "false",
        label: "No — first relationship for both",
        description: "",
      },
      {
        value: "true",
        label: "Yes — one or both have a previous relationship",
        description: "You will need divorce certificates or death certificates",
      },
    ],
  },
  {
    id: "hasChildren",
    text: "Are dependent children included in this application?",
    subtext: "Children under 22 who are financially dependent on the applicant and will be sponsored with them.",
    type: "single",
    options: [
      {
        value: "false",
        label: "No dependent children",
        description: "",
      },
      {
        value: "true",
        label: "Yes, children are included",
        description: "Additional forms and documents required for each child",
      },
    ],
  },
  {
    id: "childrenTogether",
    text: "Do you and your sponsor have any children together?",
    subtext: "Biological or adopted children that both of you are parents of — even if not included in this application.",
    type: "single",
    options: [
      {
        value: "false",
        label: "No",
        description: "",
      },
      {
        value: "true",
        label: "Yes — we have children together",
        description: "Include birth certificates showing both parents' names",
      },
    ],
  },
  {
    id: "otherCountries",
    text: "Has the applicant lived in any other country for 6+ consecutive months since age 18?",
    subtext: "This includes countries you studied, worked, or lived in — not including Canada or your home country.",
    type: "single",
    options: [
      {
        value: "no",
        label: "No — only my home country (and possibly Canada)",
        description: "Police certificate from your home country only",
      },
      {
        value: "yes",
        label: "Yes — lived in other countries",
        description: "You will need police certificates from each additional country",
      },
    ],
  },
  {
    id: "livingTogether",
    text: "Are the applicant and sponsor currently living together?",
    subtext: "Required for inland applications. For outland, this affects what relationship proof you need.",
    type: "single",
    options: [
      {
        value: "true",
        label: "Yes, we live together",
        description: "Need proof of cohabitation (joint bills, lease, etc.)",
      },
      {
        value: "false",
        label: "No, we live apart",
        description: "Need proof of ongoing contact and sponsor visits",
      },
    ],
  },
];
