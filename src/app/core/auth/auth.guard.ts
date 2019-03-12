import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthConfig} from './auth.config';
import {checkToken, ToLogin} from './helper';
import {TokenService} from './token.service';

/**
 * 简单检查登录是否有token的路由防卫
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private cog: AuthConfig;

  constructor(private srv: TokenService,
              private injector: Injector,
              cog: AuthConfig) {
    this.cog = {...new AuthConfig(), ...cog};
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.process();
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.process();
  }

  canLoad(route: Route): boolean {
    return this.process();
  }

  private process(): boolean {
    const token = this.srv.get();
    const res = checkToken(token);
    if (!res) {
      ToLogin(this.cog, this.injector);
    }
    return res;
  }

}
