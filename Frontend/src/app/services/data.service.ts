import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PackageModel } from '../models/package-model';
import { appConfig } from '../utils/app-config';
import { firstValueFrom } from 'rxjs';
import { CompanyModel } from '../models/company-model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    public async getAllPackages(): Promise<PackageModel[]> {
        
        const observable = this.http.get<PackageModel[]>(appConfig.packagesURL)
        const packages = await firstValueFrom(observable)

        return packages        
    }

    public async getAllCompanies(): Promise<CompanyModel[]> {

        const observable = this.http.get<CompanyModel[]>(appConfig.companiesURL)
        const companies = await firstValueFrom(observable)

        return companies
    }

    public async getPackagesByCompany(companyId: string): Promise<PackageModel[]>{

        const observable = this.http.get<PackageModel[]>(appConfig.packagesURL + companyId)
        const packages = await firstValueFrom(observable)

        return packages
    }

    public async addPackage(newPackage: PackageModel): Promise<PackageModel> {

        const observable = this.http.post<PackageModel>(appConfig.packagesURL, newPackage)
        const addedPackage = await firstValueFrom(observable)

        return addedPackage
    }

    public async deletePackage(_id: string): Promise<void> {
        const observable = this.http.delete<void>(appConfig.packagesURL + _id)
        await firstValueFrom(observable)
    }
}
