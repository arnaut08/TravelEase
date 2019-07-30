import {
    CanActivate,
    ActivatedRouteSnapshot,
    Router
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { map, tap, take } from 'rxjs/operators';
  
  import { AuthService } from './auth.service';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot){
      return this.authService.user.pipe(
        take(1),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            if(route.data.role && route.data.role!=this.authService.user.value.role){
              console.log(this.authService.user.value)
              this.router.navigate([''])
            }
            return true;
          }
          this.router.navigate(['login'])
        })
      );
    }
  }

  
  