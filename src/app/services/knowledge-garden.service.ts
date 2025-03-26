import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeGardenService {
  private trigger$ = new Subject<void>();

  constructor(private apiService: ApiService) {}

  get triggerObservable() {
    return this.trigger$.asObservable();
  }

  triggerKnowledgeUpdate() {
    this.trigger$.next();
  }

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

  fetchKnowledge(
    pageNo: number,
    pageSize: number,
    tags: string[] = []
  ): Observable<any> {
    const filteredTags = tags.filter((tag): tag is string => tag !== null);
    return this.getPaginatedKnowledge(pageNo, pageSize, filteredTags);
  }

  uploadKnowledgeFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.post('/api/knowledge/file', formData);
  }
}
