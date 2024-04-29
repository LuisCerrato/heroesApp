import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

constructor(
  private authService : AuthServices,
  private router : Router
){}

  onLogin() : void{

    this.authService.login('luiscerrato@gmail.com', '123456')
    .subscribe( user =>{

      this.router.navigate(['/']);

    })

  }

}
