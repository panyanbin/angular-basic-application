import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


/**
 * 该类不作任何处理
 *
 * 仅可以不断以这样形式扩展，拦截器，进入先后以在core.module中注册先后为准
 */
@Injectable()
export class OtherInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
