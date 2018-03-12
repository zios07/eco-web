import { Injectable } from "@angular/core";
import { Http } from "@angular/http"
import { env } from "../../assets/config/app.config";
import { AuthHttp } from 'angular2-jwt';
import "rxjs/add/operator/map";
import { CartDto } from "../../domain/cartDto";
import { Product } from '../../domain/product';

@Injectable()
export class ProductService {

    url: string = env.baseURL + env.productRoute;

    constructor(private http: AuthHttp) { }

    loadProducts(page, size) {
        return this.http.get(this.url + "/api/v1/products?page="+page+"&size="+size)
            .map(response => response.json());
    }

    addProduct(product) {
        return this.http.post(this.url + "/api/v1/products", product)
            .map(response => response.json());
    }

    addProductToCart(product, username) {
        let dto = new CartDto(username, product);
        return this.http.put(this.url + "/api/v1/cart/product/add", dto)
            .map(response => response.json());
    }

    minusProductFromCart(product, username) {
        let dto = new CartDto(username, product);
        return this.http.put(this.url + "/api/v1/cart/product/minus", dto)
            .map(response => response.json());
    }

    deleteProductFromCart(product, username) {
        let dto = new CartDto(username, product);
        return this.http.delete(this.url + "/api/v1/cart/product/delete?productid="+product.id+"&username="+username)
            .map(response => response.json());
    }

    search(dto, page, size) {
        return this.http.post(this.url + "/api/v1/products/search?page="+page+"&size="+size , dto)
            .map(response => response.json());
    }

    uploadPhotos(photos) {
        // console.log(photos);
        // let fds: Array<FormData> = [];
        // for(let index in photos) {
        //     let fd = new FormData();
        //     fd.append('photo', photos[index]);
        //     fds[index] = fd;
        // }
        // console.log(fds);
        let fd = new FormData();
        fd.append('photos', photos);
        return this.http.post(this.url + "/api/v1/products/add/photo/upload", fd)
            .map(response => response.json());
       //  let fd = new FormData();
       //  fd.append('photo', photos[0]);
       // return this.http.post(this.url + "/api/v1/products/add/photo/upload", fd)
       //      .map(response => response.json());
        // return this.http.post(this.url + "/api/v1/products/add/photo/upload", photos)
        //     .map(response => response.json());
    }
}