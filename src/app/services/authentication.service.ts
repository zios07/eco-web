import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import { env } from "../../assets/config/app.config";
import { JwtHelper } from "angular2-jwt";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {

    private url:string = env.baseURL ;

    constructor(private http:Http, private router: Router){}

    authenticate(credentials){
        return this.http.post(this.url+'/api/v1/authentication/authenticate', credentials)
            .map(response => response);
    }

    isLoggedIn(){
        let jwtHelper = new JwtHelper();
        let token = localStorage.getItem('token');
        if(!token)
          return false;
        let isExpired = jwtHelper.isTokenExpired(token);
        return !isExpired;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    getConnectedUsername(){
        return localStorage.getItem('username');
    }

    isAdmin() {

        // TODO: implement getConnectedUser() with password set to null ..
        return true;
    }

    getToken() {
        return localStorage.getItem('token');
    }
}