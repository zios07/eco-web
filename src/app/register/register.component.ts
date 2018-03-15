import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public register(account){
    console.log("creating account");
  }

  // public cancelRegistration(){
  //   console.log('canceling registration');
  // }
}
