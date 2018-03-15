import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../../services/brand.service'
import { Product } from '../../../../domain/product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

	products: Array<Product> = [];
	products$;
	page: number = 0;
	size: number = 10;

	constructor(private router: Router,
		private productService: ProductService,
		private brandService: BrandService,
		private toastr: ToastrService) { }

  	ngOnInit() {
	  	this.loadProducts();
  	}

  	loadProducts() {
		this.productService.loadProducts(this.page, this.size).subscribe((result: any) => {
			this.products = result.content;
		}, error => {
			this.toastr.error(String(error));
		});
  	}

}
