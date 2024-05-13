import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> => {
  const isLogged = inject(AuthService).isLoggedIn;
  if (!isLogged) {
    return inject(Router).navigate(["/login"]);
  }
  return isLogged;
};
