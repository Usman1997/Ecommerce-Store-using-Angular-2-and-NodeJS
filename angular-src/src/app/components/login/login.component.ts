import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guard/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 username:String;
 password:String;
 previousUrl;
  constructor(

    private authService :AuthService,
    private router:Router,
    private authGuard:AuthGuard,
  ) { }

  ngOnInit() {
       if(this.authGuard.redirectUrl){
         this.previousUrl = this.authGuard.redirectUrl;
         this.authGuard.redirectUrl = undefined;
       }
  }

   onLoginSubmit(){
       
    const user = {
      username : this.username,
      password : this.password,
    }
    this.authService.authenticateUser(user).subscribe(data=>{
        if(data.success){
          console.log('You are now logged in');
          this.authService.StoreUser(data.token,data.user);
          if(this.previousUrl){
          
            this.router.navigate([this.previousUrl]);
            this.previousUrl = undefined;
          }
          else{
            this.router.navigate(['/profile']);
          }
         

        }
        else{
          console.log(data.msg);
          
        }
       
    });

   }
}
