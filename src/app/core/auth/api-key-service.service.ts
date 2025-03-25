import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service'; // Import ApiService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyServiceService {
  constructor(private apiService: ApiService) {}

  getUserApiKeys(userId: number): Observable<any> {
    return this.apiService.get(`api/v1/keys/user/${userId}`);
  }
}
