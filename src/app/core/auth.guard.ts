import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorage } from './local-storage.decorator';
import { AuthService } from './auth.service';
import { LOGIN_ROUTE } from '../app.config';

/**
 * Serviço de controle de acesso das rotas do app
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private AuthService: AuthService,
  ) { }

  /**
   * Determina se rota pode ser ativada
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = this.AuthService.isAuthenticated();
    const url = state.url;

    // LÓGICA:
    // se a rota que se esta tentando acessar começar com /signin
    // e estiver autenticado =>
    // se houver redirectTo na url redireciona para a url deste parametro
    // se não houver redireciona para /tickets
    // e não estiver autenticado => permite que url seja acessada (retornando true)

    // se for um rota qualquer
    // e estiver autenticado => permite que url seja acessada (retornando true)
    // e não estiver autenticado => redireciona para o signin

    if (state.url.startsWith(LOGIN_ROUTE)) {

      if (authenticated) {
        if (route.queryParams.redirectTo) {
          this.router.navigate([route.queryParams.redirectTo]);
        } else {
          this.router.navigate(['/']);
        }
        return false;
      } else {
        return true;
      }

    } else {

      if (authenticated) {
        return true;
      } else {
        // User is not authenticated. Redirecting to /signin
        this.router.navigate([LOGIN_ROUTE], { queryParams: { redirectTo: state.url } });
        return false;
      }

    }

  }

}
