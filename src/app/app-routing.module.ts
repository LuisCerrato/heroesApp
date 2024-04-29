import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivateGuard2, canMatchGuard2 } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then( m => m.AuthModule),
    canActivate: [canActivateGuard2, ], //Anclamos la función del canActive
    canMatch: [canMatchGuard2], 
  },
  {
    path: 'heroes',
    loadChildren: () => import('../app/heroes/heroes.module').then( m => m.HeroesModule),
    canActivate: [canActivateGuard, ], //Anclamos la función del canActive
    canMatch: [canMatchGuard], 
  },
  {
    path: '404',
    component: Error404PageComponent

  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: '404',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
