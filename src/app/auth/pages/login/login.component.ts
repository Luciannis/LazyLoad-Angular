import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router,
              private authService:AuthService) {}

  login(){
    this.authService.login()
    .subscribe(resp => {
      console.log(resp);
      
      this.router.navigate(['./heroes']);
      
    })

  }
  ingresarSinLogin(){
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
}
