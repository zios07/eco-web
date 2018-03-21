import { Injectable } from '@angular/core';
import { env } from "../../assets/config/app.config";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

@Injectable()
export class BrandService {

	url: string = env.baseURL;

	constructor(private http: HttpClient) { }

  	loadBrands() {
	  	return this.http.get(this.url + "/api/v1/brand")
		  	.map(response => response);
  	}

	saveBrand(brand) {
		return this.http.post(this.url + "/api/v1/brand", brand)
			.map(response => response);
	}

	deleteBrand(id) {
		return this.http.delete(this.url + "/api/v1/brand/" + id )
			.map(response => response);
	}

	getBrand(id) {
		return this.http.get(this.url + "/api/v1/brand/" + id)
			.map(response => response);
	}
}
