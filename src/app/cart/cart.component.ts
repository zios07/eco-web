import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { env } from '../../assets/config/app.config';
import { AuthHttp } from 'angular2-jwt';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../domain/product';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  url:string = env.baseURL;
  cartProducts: Array<Product> = [];
  totalPrice: number;
  username: string;

  constructor(private http: AuthHttp, 
              private toastr: ToastrService,
              private productService: ProductService,
              private authService: AuthenticationService) { }

  loadCart(){ 
    this.http.get(this.url + "/api/v1/cart/user/" + this.username)
      .map(response => response.json())
      .subscribe(result => {
       this.cartProducts = result.products;
      this.calculateTotalPrice(this.cartProducts);
      }, error => {
        if(error.status !== 404)
          this.toastr.error(error);
      }
    );
  }

  calculateTotalPrice(args){
    this.totalPrice = 0;
    args.forEach(cartProduct => {
      this.totalPrice += cartProduct.product.price * cartProduct.quantity;
    })
  }

  plusProduct(product){
    this.productService.addProductToCart(product, this.username).subscribe(result => {
      this.loadCart();
    }, error => {
      this.toastr.error(String(error));
    });
  }

  // TODO: disable minus and plus when attending 1 and max stock quantity

  minusProduct(product){
    this.productService.minusProductFromCart(product, this.username).subscribe(result => {
      this.loadCart();
    }, error => {  
      this.toastr.error(String(error));
    });
  }
 
  deleteProductFromCart(product) {
    this.productService.deleteProductFromCart(product, this.username).subscribe(result => {
      this.toastr.success('Product removed from cart')
      this.loadCart();
    }, error => {
      this.toastr.error(String(error));
    });
  }


  ngOnInit() {
    this.username = this.authService.getConnectedUsername();
    this.loadCart();
  }
  
}
