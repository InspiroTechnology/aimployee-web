import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);

  // console.log('AuthInterceptor triggered:', req);
  const token = tokenStorage.getToken();
  // console.log('token', token);

  // ✅ 可选：排除 login/register 等接口
  const excludedUrls = ['/api/login', '/api/register', '/api/forgot-password'];
  const isExcluded = excludedUrls.some((url) => req.url.includes(url));

  // ✅ 如果存在 token 且不是排除的接口，就加上 Authorization 头
  if (token && !isExcluded) {
    const cloned = req.clone({
      setHeaders: {
        token: `${token}`,
      },
    });
    return next(cloned);
  }

  // 没 token 或是白名单请求，原样发送
  return next(req);
};
