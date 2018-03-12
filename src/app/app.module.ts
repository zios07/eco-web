import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { BrandService } from './services/brand.service';
import { HttpModule, RequestOptions, Http  } from '@angular/http';
import { NavComponent } from './nav/nav.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent},
	{ path: '', component: HomeComponent},
	{ path: 'cart', component: CartComponent },
	{ path: 'products/add', component: AddProductComponent, canActivate: [AuthGuard] },
	{ path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
	{ path: '**', component: NotFoundComponent}
]

export function authHttpServiceFactory(http:Http, options: RequestOptions){
	return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		NotFoundComponent,
		RegisterComponent,
		ProductComponent,
		NavComponent,
		CartComponent,
		AddProductComponent
	],
	imports: [
		BrowserModule, 
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes),
		BsDropdownModule.forRoot(),
		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		FormsModule,
		HttpModule,
		ToastrModule.forRoot(),
		SliderModule,
		FileUploadModule
	],
	providers: [
		ProductService,
		BrandService,
		AuthGuard,
		AuthenticationService,
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		}
	],	
	bootstrap: [AppComponent]
})
export class AppModule { }
