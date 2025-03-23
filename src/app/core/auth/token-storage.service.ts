import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly TOKEN_KEY = 'access_token';

  // 保存 token
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // 获取 token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 删除 token（登出用）
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
