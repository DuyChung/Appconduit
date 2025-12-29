import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const handlerErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          console.error('Chưa đăng nhập');
          router.navigate(['/']);
          break;

        case 404:
          console.error('Không tìm thấy dữ liệu');
          break;

        case 500:
          console.error('Lỗi server');
          break;
      }

      return throwError(() => error);
    })
  );
};
