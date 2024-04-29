import { Component } from '@angular/core';
import { AuthServices } from './auth/services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'heroesApp';

constructor(
  private authService : AuthServices
){}



}

