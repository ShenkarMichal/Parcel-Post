import { CompanyModel, ICompanyModel } from "../4-models/company-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { IPackageModel, PackageModel } from "../4-models/package-model";

function getAllPackages(): Promise<IPackageModel[]> {
    return PackageModel.find().populate("companies").exec()
}

function getAllCompanies(): Promise<ICompanyModel[]> {
    return CompanyModel.find().exec()
}

function getPackagesByCompany(companyId: string): Promise<IPackageModel[]>{
    return PackageModel.find({companyId}).populate("companies").exec()
}

function addNewPackage(newPackage: IPackageModel): Promise<IPackageModel> {
    //Validation:
    const err = newPackage.validateSync()
    if(err) throw new ValidationErrorModel(err.message)

    return newPackage.save()
}

async function deletePackage(_id: string): Promise<void> {
    const deletePackage = await PackageModel.findByIdAndDelete(_id)
    if(!deletePackage) throw new ResourceNotFoundErrorModel(_id)
}

export default {
    getAllPackages,
    getAllCompanies,
    getPackagesByCompany,
    addNewPackage,
    deletePackage
};