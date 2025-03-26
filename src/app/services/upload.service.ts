import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private api: ApiService) {}

  /**
   * Uploads a file to the server.
   * @param file The file to upload.
   * @param storeOriginal Whether to store the original file.
   * @param tags Tags to associate with the file. should be a string of comma separated values.
   * @returns An observable that resolves to the server response.
   */
  uploadFile(
    file: File,
    storeOriginal: boolean,
    tags: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('storeOriginal', String(storeOriginal));
    formData.append('tags', tags);
    return this.api.post('api/knowledge/file', formData);
  }

  // getUploadStatus(fileId: string): Observable<any> {
  //   return this.api.get(`files/status/${fileId}`);
  // }
}
