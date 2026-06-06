export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  country: string;
  address: string;
  dateBirth: string;
  phone: string;
  role: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  authTokens: AuthTokens | null;
}

export interface IApplicationForm {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  continent: string;
  residenceCountry: string;
  isStudent: boolean;
  studyField: string;
  university: string;
  universityWebsite?: string;
  how: string; 
  studentCertificate?: Buffer;
  studentCertificateUrl?: string;
  isEnglishSpeaker: boolean;
  applyingAs: string;
  themeCWThoughts: string;
  countryCW: string;
  contribution: string;
  financialSupportReason: string;
  fullOrPartialFunding: string;
  dependents: number;
  familyIncome: string;
  canParticipate: string;
  countryTravelingFrom: string;
  otherFundingInfo: string;
  consentVisa: string;
  consentFlight: boolean;
  consentNorwegianLaw: boolean;
  consentReturn: boolean;
  consentPersonalDetails: boolean;
  consentAttendance: boolean;
  consentMedia: string;
  createdAt?: string;
  summary: string;
  summaryCheck: boolean;
}
