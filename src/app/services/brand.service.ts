import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { env } from "../../assets/config/app.config";
import { AuthHttp } from 'angular2-jwt';
import "rxjs/add/operator/map";

@Injectable()
export class BrandService {

	url: string = env.baseURL;

  	constructor(private http: AuthHttp) { }

  	loadBrands() {
	  	return this.http.get(this.url + "/api/v1/brand")
		  	.map(response => response.json());
  	}

}
