import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpInterceptorService } from '../http-interceptor.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenAuthResponseInterceptor implements HttpInterceptor {

  constructor(private httpInterceptorService: HttpInterceptorService,private router: Router) {}
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {  
        const currentUrl = this.router.routerState.snapshot.url;      
        //alert("Error interceptor"+JSON.stringify(error.status))
        if (error.status === 401) {
          this.httpInterceptorService.handle401Error(currentUrl);
        }
        
        return throwError(error);
      })
    );
  }





  
}
