import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service'; // Import ApiService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {} // Inject ApiService

  login(userAccounts: string, password: string): Observable<any> {
    console.log('login');
    console.log(userAccounts);
    console.log(password);
    
    
    
    return this.apiService.post('/app/user/login', { userAccounts, password });
  }
}
