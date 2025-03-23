import { Injectable } from '@angular/core';
import { ApiService } from '../core/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeGardenService {
  constructor(private apiService: ApiService) {}

  getKnowledgeByUserId(userId: number): Observable<any> {
    return this.apiService.get('api/knowledge/config/get', { userId });
  }
}
