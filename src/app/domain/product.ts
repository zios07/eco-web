import { Brand } from "./brand";

export class Product{
    id: number;
    code: string;
    label: string;
    description: string;
    qteStock: string;
    price: number;
    brand: Brand;
    imgUrl: string;

    constructor(id?:number, code?:string, label?:string, description?: string, price?:number,
         brand?: Brand, qteStock?: string, imgUrl?: string) {
        this.id = id;
        this.code = code;
        this.label = label;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.qteStock = qteStock;
        this.imgUrl = imgUrl;
    }

    public getCode(){
        return this.code;
    }

    public getLabel(){
        return this.label;
    }

    public getDescription() {
        return this.description;
    }

    public getPrice(){
        return this.price;
    }

    public getBrand() {
        return this.brand;
    }

    public getImgUrl() {
        return this.imgUrl;
    }
}