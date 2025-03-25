import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private api: ApiService) {}

  /**
   * Get AI-recommended tags
   * @param fileId The ID of the uploaded file
   */
  getSuggestedTags(fileId: string): Observable<string[]> {
    return this.api.get<string[]>(`tags/suggest/${fileId}`);
  }

  /**
   * Save user-confirmed tags
   * @param fileId The file ID
   * @param tags The array of tags selected/edited by the user
   */
  saveTags(fileId: string, tags: string[]): Observable<any> {
    return this.api.post(`tags/save`, {
      fileId,
      tags,
    });
  }

  /**
   * Get the saved tags for a specific file (optional feature)
   */
  getSavedTags(fileId: string): Observable<string[]> {
    return this.api.get<string[]>(`tags/file/${fileId}`);
  }
}
