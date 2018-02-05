import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name:String;
username:String;
email:String;
password:String;
  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private router :Router,
  
  
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
   
    const user = {
      name: this.name,
      username : this.username,
      email :this.email,
      password : this.password,
    }
    if(!this.validateService.validateRegister(user)){
      console.log('Enter all fields');
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      console.log('Enter valid email');
    }


     this.authService.registerUser(user).subscribe(data=>{
if(data.success){
  console.log('User regiistered');
  this.router.navigate(['/profile']);
}else{
  console.log('Registeration Error');
}

     });

    
  }

}
