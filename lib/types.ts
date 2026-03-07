export type RelationshipType = "married" | "common-law" | "conjugal";
export type SponsorStatus = "citizen" | "pr";
export type ApplicationType = "inland" | "outland";
export type Country = "south-korea" | "philippines" | "india" | "china" | "uk" | "usa";

export interface Answers {
  country: Country;
  applicationType: ApplicationType;
  relationship: RelationshipType;
  sponsorStatus: SponsorStatus;
  previousMarriage: boolean;
  hasChildren: boolean;
  childrenTogether: boolean;
  marriedTwoYears: boolean;
  otherCountries: string[];
  livingTogether: boolean;
}

export interface DocumentItem {
  id: string;
  category: "forms" | "sponsor" | "applicant" | "country-specific" | "relationship" | "conditional";
  title: string;
  titleLocal?: string;
  formNumber?: string;
  description: string;
  where?: string;
  howLong?: string;
  officialUrl?: string;
  important?: string;
  condition?: (answers: Answers) => boolean;
}
