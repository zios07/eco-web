import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

	brands: Array<any> = [];
	constructor(private router: Router,
				private productService: ProductService,
				private brandService: BrandService,
				private toastr: ToastrService) { }

	ngOnInit() {
		this.loadBrands();
	}

	uploadPhotos(event) {
		if(event.files)
			if (event.files.length < 3 || event.files.length > 7)
				console.log("errrorrrr");
			else{
				this.productService.uploadPhotos(event.files).subscribe(result => {
					console.log(result);
				}, error => {
					this.toastr.error(String(error));
				});
			}
	}

	addProduct(product){
		this.productService.addProduct(product).subscribe(result => {
			this.toastr.success('Product added successfully !');
			this.router.navigate(['/products']);
		});
	}

	loadBrands(){
		this.brandService.loadBrands().subscribe(result => {
			this.brands = result;
		}, error => {
			this.toastr.error(String(error));
		})
	}

}
