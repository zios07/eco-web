import { Brand } from "./brand";

export class Product{
    id: number;
    code: string;
    label: string;
    description: string;
    price: number;
    brand: Brand;

    constructor(id:number, code:string, label:string, description: string, price:number, brand: Brand) {
        this.id = id;
        this.code = code;
        this.label = label;
        this.description = description;
        this.price = price;
        this.brand = brand;
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
}