import { Component } from '@angular/core';
import { AuthServices } from '../../../auth/services/auth.services';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  constructor(
    private authService : AuthServices,
    private router : Router
  ){
  }

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' }
  ]

  get user() : User | undefined {

    return this.authService.currentUser;
   
  }

  onLogout() : void{
    this.authService.logout();

    this.router.navigate(['/auth/login']);
  }




}
