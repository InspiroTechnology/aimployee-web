import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: number = 0;
  private apiKeys: any[] = [];

  constructor() {}

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }

  setApiKeys(apiKeys: any[]): void {
    this.apiKeys = apiKeys;
  }

  getApiKeys(): any[] {
    return this.apiKeys;
  }
}
