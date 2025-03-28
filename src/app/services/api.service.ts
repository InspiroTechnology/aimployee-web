import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public readonly baseUrl = environment.apiUrl; // Use environment.apiUrl

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      params: httpParams,
    });
  }

  post<T>(
    endpoint: string,
    data: any,
    options?: { headers?: any }
  ): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${endpoint}`,
      data,
      options || {}
    );
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
