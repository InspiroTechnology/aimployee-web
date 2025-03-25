import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core/auth/token-storage.service'; // Import TokenStorageService
import { ApiKeyServiceService } from '../core/auth/api-key-service.service'; // Import ApiKeyServiceService

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userId: number = 0;
  apiKeys: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService, // Inject TokenStorageService
    private apiKeyService: ApiKeyServiceService // Inject ApiKeyServiceService
  ) {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.tokenStorage.saveToken(response.data.token); // Use TokenStorageService to save token
        this.userId = response.data.userId;

        // Fetch user's API keys
        this.apiKeyService.getUserApiKeys(this.userId).subscribe({
          next: (apiKeys) => {
            console.log('Fetched API keys:', apiKeys);
            this.apiKeys = apiKeys;
            // TODO: Handle API keys (e.g., store them or pass them to another service)
          },
          error: (error) => {
            console.error('Failed to fetch API keys:', error);
          },
        });

        this.router.navigate(['/dashboard']); // Navigate to dashboard on success
      },
      error: (error) => {
        console.error('Login failed:', error);
        // TODO: Show error message to the user
      },
    });
  }
}
