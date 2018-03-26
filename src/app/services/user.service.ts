import { Injectable } from '@angular/core';
import { env } from '../../assets/config/app.config';
import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  
  url: string = env.baseURL;

  constructor(private http: Http, private httpClient: HttpClient) { }

  registerUser(user) {
    return this.http.post(this.url + "/api/v1/users/register" , user);
  }

  loadUsers(page, size) {
    return this.httpClient.get(this.url + "/api/v1/users?page=" + page + "&size=" + size);
  }

  deleteUser(id) {
    return this.httpClient.delete(this.url + "/api/v1/users/" + id);
  }

}
