
export class PackageModel {
    public _id: string
    public sender: string
    public address: string
    public date: string
    public weight: number
    public companyId: string
    public price: number

    public companies: {
        _id: string
        name: string
    }
}