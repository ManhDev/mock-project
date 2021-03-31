import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let user = localStorage.getItem('user') || null;
    if (user) {
      user = JSON.parse(user)
      let token = user['user']['token']

      let authRequest = request.clone({
        headers: new HttpHeaders({
          Authorization: `Token ${token}`
        })
      })
      return next.handle(authRequest)
    }
    return next.handle(request)
  }
}
