import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user :any;
  authToken: any;
  constructor(private http:Http) { }
 

   registerUser(user){
     let headers = new Headers();
     headers.append('Content-type','application/json');
     return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).map(res =>res.json());
   }

  

   authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
    .map(res=>res.json());
    }
    getProfile(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/users/profile',{headers:headers})
      .map(res=>res.json());
      }

   StoreUser(token,user){
     localStorage.setItem('token_id',token);
     localStorage.setItem('user',JSON.stringify(user));
     this.user = user;
     this.authToken  = token;
   }

   loadToken(){
     const token = localStorage.getItem('token_id');
     this.authToken = token;
   }

   logout(){
     this.user = null;
     this.authToken = null;
     localStorage.clear();  
   }
   isLogged(){
     return tokenNotExpired('token_id');
   }
}
