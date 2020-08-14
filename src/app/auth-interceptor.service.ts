import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Request');
    return next.handle(request);
  }
}

