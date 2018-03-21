import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.css']
})
export class AdminBrandComponent implements OnInit {

		brands: Array<any> = [];

	  constructor(private brandService: BrandService,
	              private toastr: ToastrService) { }

	  ngOnInit() {
			this.loadBrands();
	  }

	addBrand(brand) {
		this.brandService.saveBrand(brand).subscribe(result => {
			this.toastr.success('Brand created');
		}, error => {
			this.toastr.error(String(error));
		})
	}

	deleteBrand(id) {
		this.brandService.deleteBrand(id).subscribe(result => {
			this.toastr.info('Brand deleted');
		}, error => {
			this.toastr.error(String(error));
		})
	}

	loadBrands() {
		this.brandService.loadBrands().subscribe((result:any) => {
			this.brands = result;
		}, error => {
			this.toastr.error(String(error));
		})
	}

}
