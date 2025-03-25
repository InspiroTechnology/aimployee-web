import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Import AuthService

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isAuthenticated()) {
    return true; // Allow navigation if authenticated
  } else {
    router.navigate(['/login']); // Redirect to login page if not authenticated
    return false; // Cancel navigation
  }
};