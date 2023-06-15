import mongoose from "mongoose";

// 1- Interface:
export interface ICompanyModel extends mongoose.Document {
    name: string
}

// 2 - Schema:
export const CompanySchema = new mongoose.Schema<ICompanyModel>({
    name: {
        type: String,
        required: [true, "Name is missing"],
        minlength: [2, "Name is too short"],
        maxlength: [15, "Name is too long"],
        trim: true,
        unique: true
    }
})

// 3- Model:
export const CompanyModel = mongoose.model<ICompanyModel>("CompanyModel", CompanySchema, "companies")
