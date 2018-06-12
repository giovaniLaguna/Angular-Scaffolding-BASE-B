import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { LocalStorage } from "./local-storage.decorator";
import { Token } from "./token.interface";
import { AuthService } from "./auth.service";
import { LOGIN_API, ERROR_ROUTE } from "../app.config";

// Angular HttpClient: Interceptors
// https://alligator.io/angular/httpclient-interceptors/

@Injectable()
export class InterceptorService implements HttpInterceptor {
  /**
   * referencia LocalStorage('TOKEN')
   */
  @LocalStorage("TOKEN") token: Token;

  constructor(
    private Router: Router,
    private AuthService: AuthService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    // não intercepta caso não seja uma url da api
    // não intercepta caso seja a url de autenticacao da api
    if (
      req.url.startsWith(environment.SERVER_API_URL) &&
      req.url != `${environment.SERVER_API_URL}/${LOGIN_API}`
    ) {
      request = req.clone({
        headers: req.headers.append(
          "Authorization",
          `Bearer ${this.token.accessToken}`
        )
      });
    }

    return next
      .handle(request).pipe(
        catchError(err => {
          // verifica se o status do erro é 401,
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.AuthService.logout();
          }

          // verifica se o status do erro é 403,
          if (err instanceof HttpErrorResponse && err.status === 403) {
            // redireciona para pagina de acesso negado
            this.Router.navigate([`/${ERROR_ROUTE}/403`], {
              queryParams: { redirectTo: this.Router.url }
            });
          }
          return throwError(err);
        })
      );
  }
}
