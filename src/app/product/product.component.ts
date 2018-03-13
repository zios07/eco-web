import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../../domain/product';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../services/brand.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<Product> = [];
  brands: Array<any> = [];
  productSearchDto: any = { brands: Array(), minPrice: 0, maxPrice: 10000 };
  currentPage: number = 0;
  size: number = 100;
  rangeValues: number[] = [0, 10000];

  constructor(private productService: ProductService, 
              private authService: AuthenticationService,
              private toastr:ToastrService,
              private brandService: BrandService) { }

  ngOnInit() {
    this.loadProducts(this.currentPage, this.size);
    this.loadBrands();
  }

  loadProducts(page, size) {
    this.productService.loadProducts(page, size).subscribe((result: any) => {
      this.products = result.content;
    })
  }

  addToCart(product) {
    let username:string = this.authService.getConnectedUsername();
    this.productService.addProductToCart(product, username).subscribe(result => {
      this.toastr.success("Product added to cart");
    }, error => {
      this.toastr.error(String(error));
    });
  }


  loadBrands() {
    this.brandService.loadBrands().subscribe(result => {
      this.brands = result;
    }, error => {
      this.toastr.error(String(error));
    });
  }

  priceRangeChanged(event) {
    this.productSearchDto.minPrice = event.values[0];
    this.productSearchDto.maxPrice = event.values[1];
  }

  onSearch(value) {
    this.productService.search(this.productSearchDto, this.currentPage, this.size).subscribe((result: any) => {
      this.products = result.content;
    }, error => {
      this.toastr.error(String(error));
    });
  }

  brandChanged(event, brand) {
    if (event.srcElement.checked)
      this.productSearchDto.brands.push(brand);
    else
      this.productSearchDto.brands.splice(this.productSearchDto.brands.indexOf(brand), 1);
  }

}
