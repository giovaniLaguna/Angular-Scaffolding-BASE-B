import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { LocalStorage } from './local-storage.decorator';
import { Token } from './token.interface';
import { response } from './response.interface';
import { ResponseHandlerService } from './response-handler.service';
import { map, catchError, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { LOGIN_ROUTE, LOGIN_API } from '../app.config';

enum userRole {
  None = 0,
  Administrator = 1,
  HumanResources = 2,
  SalesForce = 3,
  SalesForceManager = 4,
}

@Injectable()
export class AuthService {

  /**
   * referencia LocalStorage('TOKEN')
   */
  @LocalStorage('TOKEN')
  token: Token;

  constructor(
    private http: HttpClient,
    private router: Router,
    private responseHandlerService: ResponseHandlerService
  ) { }

  /**
   * - verifica se usuario esta autenticado
   * - usa o local storage para isto
   */
  isAuthenticated() {
    return !(this.token === undefined || this.token === null);
  }

  login(userData) {
    const requestUrl = `${environment.SERVER_API_URL}/${LOGIN_API}`;
    const body = {
      AccessKey : userData.email,
      AccessSecret : userData.password
    }
    return this.http.post<response<Token>>(requestUrl, body).pipe(
      pipe(
        map(this.responseHandlerService.handler()),
        catchError(this.responseHandlerService.errorHandler())
      ),
      tap( token => this.token = token ),
    );
  }

  /**
   * - reseta o token na local storage
   * - redireciona app para /${LOGIN_ROUTE}
   */
  logout(redirectTo: string = '/') {
    this.token = null;

    this.router.navigate([LOGIN_ROUTE], {
      queryParams: { redirectTo }
    });
  }


}
