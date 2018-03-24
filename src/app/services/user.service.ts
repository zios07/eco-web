import { Injectable } from '@angular/core';
import { env } from '../../assets/config/app.config';
import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
  
  url: string = env.baseURL;

  constructor(private http: Http) { }

  registerUser(user) {
    return this.http.post(this.url + "/api/v1/users/register" , user);
  }

}
