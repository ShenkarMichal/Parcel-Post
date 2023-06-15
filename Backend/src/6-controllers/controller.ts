import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import { PackageModel } from "../4-models/package-model";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/packages
router.get("/packages", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const packages = await logic.getAllPackages()
        response.json(packages)
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/companies
router.get("/companies", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const companies = await logic.getAllCompanies()
        response.json(companies)
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/packages/:companyId
router.get("/packages/:companyId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const companyId = request.params.companyId
        const packages = await logic.getPackagesByCompany(companyId)
        response.json(packages)
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/packages
router.post("/packages", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newPackage = new PackageModel(request.body)
        const addedpackage = await logic.addNewPackage(newPackage)
        response.status(201).json(addedpackage)
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/packages
router.delete("/packages/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await logic.deletePackage(_id)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

