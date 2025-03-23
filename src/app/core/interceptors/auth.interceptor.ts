import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();

    // ✅ 可选：排除 login/register 等接口
    const excludedUrls = ['/api/login', '/api/register', '/api/forgot-password'];
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    // ✅ 如果存在 token 且不是排除的接口，就加上 Authorization 头
    if (token && !isExcluded) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    // 没 token 或是白名单请求，原样发送
    return next.handle(req);
  }
}
