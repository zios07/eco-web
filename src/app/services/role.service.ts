import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../assets/config/app.config';

@Injectable()
export class RoleService {

  url:string = env.baseURL;

  constructor(private http: HttpClient) { }

  loadRoles() {
    return this.http.get(this.url + "/api/v1/roles");
  }

}
