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
			this.loadBrands();
			this.toastr.info('Brand deleted');
		}, error => {
			if(error.error)
				if(error.error.code === "SERVER.EXCEPTION")
					this.toastr.error("Cannot delete this brand because is linked to some products. Delete those products first and try again ");
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
