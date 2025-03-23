import { Injectable } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AuthService, private router: Router) {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.data.token); // Store token in localStorage
        this.router.navigate(['/dashboard']); // Navigate to dashboard on success
      },
      error: (error) => {
        console.error('Login failed:', error);
        // TODO: Show error message to the user
      },
    });
  }
}
