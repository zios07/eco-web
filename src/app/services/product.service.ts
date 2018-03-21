import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { env } from "../../assets/config/app.config";
import { AuthHttp } from 'angular2-jwt';
import "rxjs/add/operator/map";
import { CartDto } from "../../dto/cartDto";
import { AuthenticationService } from "./authentication.service";
import { Product } from '../../domain/product';

@Injectable()
export class ProductService {

    url: string = env.baseURL;

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    loadProducts(page, size) {
        return this.http.get(this.url + "/api/v1/products?page="+page+"&size="+size)
            .map(response => response);
    }

    getProduct( id ) {
        return this.http.get(this.url + "/api/v1/products/"+id)    
            .map(response => response);
    }

    addProduct(product) {
        return this.http.post(this.url + "/api/v1/products", product)
            .map(response => response);
    }

    addProductToCart(product, username) {
        let dto = new CartDto(username, product);
        console.log(dto);
        return this.http.put(this.url + "/api/v1/cart/product/add", dto)
            .map(response => response);
    }

    minusProductFromCart(product, username) {
        let dto = new CartDto(username, product);
        return this.http.put(this.url + "/api/v1/cart/product/minus", dto)
            .map(response => response);
    }

    deleteProductFromCart(product, username) {
        return this.http.delete(this.url + "/api/v1/cart/product/delete?productid="+product.id+"&username="+username)
            .map(response => response);
    }

    search(dto, page, size) {
        return this.http.post(this.url + "/api/v1/products/search?page="+page+"&size="+size , dto)
            .map(response => response);
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
            .map(response => response);
       //  let fd = new FormData();
       //  fd.append('photo', photos[0]);
       // return this.http.post(this.url + "/api/v1/products/add/photo/upload", fd)
       //      .map(response => response);
        // return this.http.post(this.url + "/api/v1/products/add/photo/upload", photos)
        //     .map(response => response);
    }
}