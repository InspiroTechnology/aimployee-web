import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const fakeTags = [ '项目',
      '产品',
      '运营',
      '目标',
      '绩效',
      '资源分配'];
    return of(fakeTags);
  }

  /**
   * Save user-confirmed tags
   * @param fileId The file ID
   * @param tags The array of tags selected/edited by the user
   */
  saveTags(fileId: string, tags: string[]): Observable<any> {
    console.log(`Saving tags for file ${fileId}:`, tags);
    return of({ success: true });
  }

  /**
   * Get the saved tags for a specific file (optional feature)
   */
  getSavedTags(fileId: string): Observable<string[]> {
    const fakeSavedTags = ['AI', 'Deep Learning'];
    return of(fakeSavedTags);
  }
  // /**
  //  * Get AI-recommended tags
  //  * @param fileId The ID of the uploaded file
  //  */
  // getSuggestedTags(fileId: string): Observable<string[]> {
  //   return this.api.get<string[]>(`tags/suggest/${fileId}`);
  // }

  // /**
  //  * Save user-confirmed tags
  //  * @param fileId The file ID
  //  * @param tags The array of tags selected/edited by the user
  //  */
  // saveTags(fileId: string, tags: string[]): Observable<any> {
  //   return this.api.post(`tags/save`, {
  //     fileId,
  //     tags,
  //   });
  // }

  // /**
  //  * Get the saved tags for a specific file (optional feature)
  //  */
  // getSavedTags(fileId: string): Observable<string[]> {
  //   return this.api.get<string[]>(`tags/file/${fileId}`);
  // }
}
