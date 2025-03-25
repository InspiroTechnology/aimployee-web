import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyServiceService {
  constructor(private apiService: ApiService) {}

  getUserApiKeys(userId: number): Observable<any> {
    return this.apiService.get(`api/v1/keys/user/${userId}`);
  }
}
