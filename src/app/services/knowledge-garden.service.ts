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

  getPaginatedKnowledge(
    pageNo: number,
    pageSize: number,
    tags: string[] = [],
    publicOnly: boolean = false
  ): Observable<any> {
    const payload = { pageNo, pageSize, tags, publicOnly };
    return this.apiService.post('/api/knowledge/page', payload);
  }
}
