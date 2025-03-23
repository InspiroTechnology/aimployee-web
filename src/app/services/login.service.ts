import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core/auth/token-storage.service'; // Import TokenStorageService

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService // Inject TokenStorageService
  ) {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.tokenStorage.saveToken(response.data.token); // Use TokenStorageService to save token
        this.router.navigate(['/dashboard']); // Navigate to dashboard on success
      },
      error: (error) => {
        console.error('Login failed:', error);
        // TODO: Show error message to the user
      },
    });
  }
}
