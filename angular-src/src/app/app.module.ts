import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guard/auth.guard';
import {NoAuthGuard} from './guard/noAuth.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


const appRoutes:Routes =[

  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate:[NoAuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[NoAuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},


]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
   
  ],
  providers: [ValidateService,AuthService,AuthGuard,NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
