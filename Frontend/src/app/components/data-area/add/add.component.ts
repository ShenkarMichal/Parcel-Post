import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/company-model';
import { PackageModel } from 'src/app/models/package-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

    public companies: CompanyModel[]

    public newPackage = new PackageModel()

    public constructor(private packageService: DataService, private router: Router) {}
    async ngOnInit(): Promise<void> {
        try {
            this.companies = await this.packageService.getAllCompanies()
        }
        catch (err: any) {
            console.log(err)            
        }       
    }

    public async addNewPackage(): Promise<void> {
        try {
            await this.packageService.addPackage(this.newPackage)    
            alert("The package has been added")
            this.router.navigateByUrl("/list")
        }
        catch (err: any) {
            console.log(err)            
        }
    }

  

}
