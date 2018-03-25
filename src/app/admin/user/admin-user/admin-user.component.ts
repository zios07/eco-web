import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../../domain/user';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

	users: Array<User> = [];
	page: number = 0;
	size: number = 10;

	constructor(private router: Router,
		private userService: UserService,
		private toastr: ToastrService) { }

  	ngOnInit() {
	  	this.loadUsers();
  	}

  	loadUsers() {
		this.userService.loadUsers(this.page, this.size).subscribe((result: any) => {
			this.users = result;
		}, error => {
			this.toastr.error(String(error));
		});
	}
	  
	deleteUser(id) {
		this.userService.deleteUser(id).subscribe((result: any) => {
			this.loadUsers();
			this.toastr.info('User deleted');
		}, error => {
			this.toastr.error(String(error));
		});
	}

}
