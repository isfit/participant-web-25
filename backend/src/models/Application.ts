import mongoose, { Schema, Document } from "mongoose";

interface IApplication extends Document {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
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
    countryTravelingFrom: string;
    otherFundingInfo: string;
    canParticipate: string;
    consentVisa: string;
    consentFlight: boolean;
    consentNorwegianLaw: boolean;
    consentReturn: boolean;
    consentPersonalDetails: boolean;
    consentAttendance: boolean;
    consentMedia: string;
}

const ApplicationSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    continent: { type: String, required: true },
    residenceCountry: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    studyField: { type: String, required: true },
    university: { type: String, required: true },
    universityWebsite: { type: String },
    how: {type: String, required: true},
    studentCertificate: { type: Buffer, required: true },
    studentCertificateUrl: { type: String },
    isEnglishSpeaker: { type: Boolean, required: true },
    applyingAs: { type: String, required: true },
    themeCWThoughts: { type: String, required: true },
    countryCW: { type: String, required: true },
    contribution: { type: String, required: true },
    financialSupportReason: { type: String },
    fullOrPartialFunding: { type: String },
    dependents: { type: Number },
    familyIncome: { type: String },
    canParticipate: { type: String },
    countryTravelingFrom: { type: String },
    otherFundingInfo: { type: String },
    consentVisa: { type: String, required: true },
    consentFlight: { type: Boolean, required: true },
    consentNorwegianLaw: { type: Boolean, required: true },
    consentReturn: { type: Boolean, required: true },
    consentPersonalDetails: { type: Boolean, required: true },
    consentAttendance: { type: Boolean, required: true },
    consentMedia: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model<IApplication>(
    "Application",
    ApplicationSchema
);

export default Application;
