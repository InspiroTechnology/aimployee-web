import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyServiceService {
  private readonly endpoint = 'api/v1/keys/user';

  constructor(private apiService: ApiService) {}

  getUserApiKeys(userId: number): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${userId}`);
  }
}
