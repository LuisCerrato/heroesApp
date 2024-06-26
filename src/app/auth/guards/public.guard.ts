import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthServices } from '../services/auth.services';

const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthServices = inject(AuthServices);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map( isAutheticated => !isAutheticated)
    );
  };
   
  //No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
  export const canActivateGuard2: CanActivateFn = (
    //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log('CanActivate');
    console.log({ route, state });
   
    return checkAuthStatus();
  };
   
  export const canMatchGuard2: CanMatchFn = (
    //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
  ) => {
    console.log('CanMatch');
    console.log({ route, segments });
   
    return checkAuthStatus();
  };