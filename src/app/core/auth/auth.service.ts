import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {} // Inject ApiService

  login(userAccounts: string, password: string): Observable<any> {
    return this.apiService.post('user/login', { userAccounts, password });
  }

  isAuthenticated(): boolean {
    // Replace this with actual authentication logic
    return !!localStorage.getItem('authToken');
  }
}
