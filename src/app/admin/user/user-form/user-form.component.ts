import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  roles:any;
  user = { account :{ username:"", password: ""}};
  confirmPWD: string = "";

  constructor(private userService: UserService,
              private roleService: RoleService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loadRoles();
  }

  register() {
    this.userService.registerUser(this.user).subscribe((result: any) => {
      this.toastr.success("User added successfully");
      this.router.navigate(['/admin/users']);
    }, error => {
      this.toastr.error("Error occured while creating the user");
    })
  }

  loadRoles() {
    this.roleService.loadRoles().subscribe(result => {
      this.roles = result;
    }, error => {
      this.toastr.error(String(error));
    })
  }

}
