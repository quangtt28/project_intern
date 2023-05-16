// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor, HTTP_INTERCEPTORS
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import {AuthService} from "./service/auth.service";
//
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//
//   constructor(private auth: AuthService) {}
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = this.auth.getAuthorizationToken();
//     const authReq = request.clone({
//       headers: request.headers.set('Authorization', 'Bearer ' + authToken)
//     });
//     console.log(authToken);
//     return next.handle(authReq);
//   }
// }
//
// export const authInterceptorProviders =[
//   { provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
// ];
//
