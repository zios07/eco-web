import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  jwtHelper: JwtHelper = new JwtHelper();
  
  invalidLogin: boolean;
  constructor(private authService: AuthenticationService, 
              private router: Router){}

  onLogin(credentials){
    this.authService.authenticate(credentials).subscribe(result => {  
      let token = result["_body"];
      if(token) {
        console.log(token);
        console.log(this.jwtHelper.decodeToken(token));
        localStorage.setItem('token', token);
        localStorage.setItem('username', credentials.username);
        this.router.navigate(['/']);
      }
        
    }, error => {
      if(error.status == 400 || error.status == 401)
        this.invalidLogin = true;
    })  
    
  }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(!token)
      return false;
    let isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

}
