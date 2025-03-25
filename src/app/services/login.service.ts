import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core/auth/token-storage.service';
import { ApiKeyServiceService } from '../core/auth/api-key-service.service';
import { UserService } from '../core/auth/user.service'; // Import UserService

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private apiKeyService: ApiKeyServiceService,
    private userService: UserService // Inject UserService
  ) {}

  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.tokenStorage.saveToken(response.data.token);
        this.userService.setUserId(response.data.userId); // Set user ID in UserService

        // Fetch user's API keys
        this.apiKeyService.getUserApiKeys(response.data.userId).subscribe({
          next: (apiKeys) => {
            console.log('Fetched API keys:', apiKeys);
            this.userService.setApiKeys(apiKeys); // Set API keys in UserService
          },
          error: (error) => {
            console.error('Failed to fetch API keys:', error);
          },
        });

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // TODO: Show error message to the user
      },
    });
  }
}
