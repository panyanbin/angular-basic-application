import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

import {ACLConfig} from './acl.config';
import {ACLService} from './acl.service';


/**
 * 此处并没有添加路由的权限守卫，默认就算在路由配置中添加了，也是通过
 */
@Injectable()
export class AclGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private srv: ACLService,
    private router: Router,
    @Inject(ACLConfig) private options: ACLConfig,
  ) {
  }

  private process(guard: any | Observable<any>): Observable<boolean> {
    return of(true);
  }

  // lazy loading
  canLoad(route: Route): Observable<boolean> {
    return this.process((route.data && route.data.guard) || null);
  }

  // all children route
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  // route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.process((route.data && route.data.guard) || null);
  }
}
