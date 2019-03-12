import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Observer} from 'rxjs';

import {AuthConfig, TokenService, checkToken, ToLogin} from '../auth';
import {SimpleTokenModel} from '../auth/simple.model';


/**
 * 此拦截器是最初的拦截器，检测是否需要token请求，根据core.module.ts重写token相关配置或AuthConfig类中修改
 */
@Injectable()
export class CheckTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const options = {...new AuthConfig(), ...this.injector.get(AuthConfig, {})};
    // 路径是否符合正则
    if (options.ignores) {
      for (const item of options.ignores as RegExp[]) {
        if (item.test(req.url)) {
          return next.handle(req);
        }
      }
    }

    // 带参数允许匿名，不带token身份验证
    if (options.allow_anonymous_key &&
      (req.params.has(options.allow_anonymous_key) ||
        this.injector.get(Router).parseUrl(req.urlWithParams).queryParamMap.has(options.allow_anonymous_key))
    ) {
      return next.handle(req);
    }

    // 是否有登录权限发送请求
    if (!this.isAuth(options)) {
      // 无token，跳转到登录页
      ToLogin(options, this.injector);
      // Unable to guarantee interceptor execution order
      // So cancel the loading state as much as possible
      // const hc = this.injector.get(HttpClient, null);
      // if (hc) {
      //     hc.end();
      // }
      // Interrupt Http request, so need to generate a new Observable
      return new Observable((observer: Observer<HttpEvent<any>>) => {
        const res = new HttpErrorResponse({
          url: req.url,
          headers: req.headers,
          status: 403,
          statusText: `未登录，权限不足`,
        });
        observer.error(res);
      });
    }
    return next.handle(req);
  }

  // 检测是否有登录权限
  isAuth(options: AuthConfig): boolean {
    const model = this.injector.get(TokenService).get() as SimpleTokenModel;
    return checkToken(model as SimpleTokenModel);
  }
}
