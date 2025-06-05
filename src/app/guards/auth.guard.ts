import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const isLoggedIn = this.authService.isLoggedIn();
  //   const expectedRoles: string[] = route.data['roles'];
  //   const userRole = this.authService.getRole();

  //   if (!isLoggedIn) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   if (expectedRoles && (!userRole || !expectedRoles.includes(userRole))) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const expectedRoles: string[] = route.data['roles']; // array of roles
    const userRole = this.authService.getRole();

    // Belum login
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // Role tidak cocok (case-insensitive)
    if (expectedRoles && !expectedRoles.some(role => role.toLowerCase() === userRole.toLowerCase())) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
