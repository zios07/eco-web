export class Product{
    id:number;
    code:string;
    label:string;
    price:number;

    constructor(id:number,code:string,label:string,price:number) {
        this.id = id;
        this.code = code;
        this.label = label;
        this.price = price;
    }

    public getCode(){
        return this.code;
    }

    public getLabel(){
        return this.label;
    }

    public getPrice(){
        return this.price;
    }
}