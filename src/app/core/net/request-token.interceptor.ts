import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';

import {AuthConfig, TokenService} from '../auth';
import {SimpleTokenModel} from '../auth/simple.model';
import {Observable} from 'rxjs';

/**
 * 拦截器处理，添加token到请求中，根据core.module.ts重写token相关配置或AuthConfig类中修改，
 *
 * 若core.module.ts有重写，则以该项优先
 *
 *
 *
 */
@Injectable()
export class RequestTokenInterceptor implements HttpInterceptor {

  constructor(protected injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.setReq(req));
  }

  // tslint:disable-next-line:no-any
  setReq(req: HttpRequest<any>): HttpRequest<any> {

    // token相关的配置项，可在core.module.ts中重写，也可以直接修改AuthConfig里的设置
    const options = {...new AuthConfig(), ...this.injector.get(AuthConfig, null)};
    const model = this.injector.get(TokenService).get() as SimpleTokenModel;

    if (!model) {
      return req;
    }

    // 获取模板，替换token值
    const token = options.token_send_template.replace(
      /\$\{([\w]+)\}/g,
      (_: string, g) => model[g],
    );

    switch (options.token_send_place) {
      case 'header':
        const obj = {};
        obj[options.token_send_key] = token;
        req = req.clone({
          setHeaders: obj,
        });
        break;
      case 'body':
        const body = req.body || {};
        body[options.token_send_key] = token;
        req = req.clone({
          body,
        });
        break;
      case 'url':
        req = req.clone({
          params: req.params.append(options.token_send_key, token),
        });
        break;
    }
    return req;
  }
}
