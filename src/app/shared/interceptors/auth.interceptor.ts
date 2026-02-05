import { HttpInterceptorFn } from '@angular/common/http';
import { LOCAL_STORAGE_KEY } from '../constants/local-storage.constant';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
  }

  return next(req);
};
