import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'home', component: HomeComponent},
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
]

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule, 
		RouterModule.forRoot(appRoutes),
		BsDropdownModule.forRoot(),
		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
