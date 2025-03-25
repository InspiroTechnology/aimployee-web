import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://1.14.73.74:8081/app/'; // Configurable base URL

  constructor(private http: HttpClient) {}

  private buildHttpParams(params?: any): HttpParams {
    return new HttpParams({ fromObject: params || {} });
  }

  private buildHttpHeaders(headers?: any): HttpHeaders {
    return new HttpHeaders(headers || {});
  }

  get<T>(endpoint: string, params?: any, headers?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      params: this.buildHttpParams(params),
      headers: this.buildHttpHeaders(headers),
    });
  }

  post<T>(endpoint: string, data: any, headers?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.buildHttpHeaders(headers),
    });
  }

  put<T>(endpoint: string, data: any, headers?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.buildHttpHeaders(headers),
    });
  }

  delete<T>(endpoint: string, headers?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.buildHttpHeaders(headers),
    });
  }
}
