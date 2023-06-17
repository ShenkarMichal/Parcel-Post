import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company-model';
import { PackageModel } from 'src/app/models/package-model';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public packages: PackageModel[]

    public companies: CompanyModel[]

    public companyId: string

    public constructor(private packageService: DataService){}

    async ngOnInit(): Promise<void> {
        try {
            this.packages = await this.packageService.getAllPackages()
            this.companies = await this.packageService.getAllCompanies()
        }
        catch (err: any) {
            console.log(err)            
        }        
    }

    public async getPackagesByCompany(): Promise<void> {
        try {
            if(this.companyId === ""){
                this.packages = await this.packageService.getAllPackages()
            }
            this.packages = await this.packageService.getPackagesByCompany(this.companyId)    
        }
        catch (err: any) {
            console.log(err)
            
        }
    }

    public async deletePackage(_id: string): Promise<void> {
        try {
            if(!window.confirm("Are you sure?")) return
            await this.packageService.deletePackage(_id)    
            alert("The package has been deleted")
            this.packages = this.packages.filter(p => p._id !== _id)
        }
        catch (err: any) {
            console.log(err)            
        }
    }

}
