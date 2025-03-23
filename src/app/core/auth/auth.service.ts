import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service'; // Import ApiService
import { TokenStorageService } from './token-storage.service'; // Import TokenStorageService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService, // Inject ApiService
    private tokenStorage: TokenStorageService // Inject TokenStorageService
  ) {}

  login(userAccounts: string, password: string): Observable<any> {
    return this.apiService.post('user/login', { userAccounts, password });
  }

  isAuthenticated(): boolean {
    // Use TokenStorageService to check token existence
    return !!this.tokenStorage.getToken();
  }
}
