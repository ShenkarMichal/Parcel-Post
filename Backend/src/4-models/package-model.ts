import mongoose from "mongoose";
import { CompanyModel } from "./company-model";

// 1 - Interface:
export interface IPackageModel extends mongoose.Document {
    sender: string
    address: string
    date: string
    weight: number
    companyId: mongoose.Schema.Types.ObjectId
    price: number
}

// 2 - Schema:
export const PackageSchema = new mongoose.Schema<IPackageModel>({
    sender: {
        type: String,
        required: [true, "Sender is missing"],
        minlength: [2, "Sender is too short"],
        maxlength: [20, "Sender is too long"]        
    },
    address: {
        type: String,
        required: [true, "Address is missing"],
        minlength: [2, "Address is too short"],
        maxlength: [20, "Address is too long"]        
    },
    date: {
        type: String,
        required: [true, "Date is missing"]        
    },
    weight: {
        type: Number,
        required: [true, "Weight is missing"],
        min: [0, "Weight can't be negative"],
        max: [200, "Weight is too high"]        
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId
    },
    price: {
        type: Number,
        required: [true, "Price is missing"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price is too high"]         
    }
},{
    versionKey: false,
    toJSON: {virtuals: true},
    id: false
})

PackageSchema.virtual("companies", {
    ref: CompanyModel,
    localField: "companyId",
    foreignField: "_id",
    justOne: true
})

// 3 - Model:
export const PackageModel = mongoose.model<IPackageModel>("PackageModel", PackageSchema, "packages")