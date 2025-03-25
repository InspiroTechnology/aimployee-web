import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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

  uploadKnowledgeFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.post('/api/knowledge/file', formData);
  }
}
