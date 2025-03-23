import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Import AuthService

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  // Use AuthService to check if the user is authenticated
  return authService.isAuthenticated();
};
