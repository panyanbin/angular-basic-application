import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {TokenService} from '../auth';

/**
 * 这里是http响应回调的处理拦截
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private inject: Injector,
              private message: NzMessageService,
              private tokenService: TokenService,
              private notification: NzNotificationService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map(event => {
      if (event instanceof HttpResponse) {
        const res = event.body;
        if (res && res.code) {
          switch (res.code) {
            case 666:
              if (this.router && this.router.url) {
                this.tokenService.redirect = this.router.url;
              }
              this.router.navigate([this.tokenService.login_url]);
              this.message.error('登录失效，请重登录！');
              throwError(res);
              break;
            case 400:
              res.msg = res.msg || '';
              this.notification.error('请求失败', res.msg);
              throwError(res);
              break;
            default:
          }
        }
      }
      return event;
    }), catchError((error) => {
      switch (error.status) {
        case 0:
          this.message.error('网络不可用，请设置你的网络');
          break;
        case 400:
          this.message.error('请求失败，请稍后重试！');
          break;
        case 401:
          // 移除缓存
          this.message.error('没有权限,请重新登录');
          break;
        case 403:
          this.router.navigate(['/exception/403']);
          break;
        case 404:
          this.router.navigate(['/exception/404']);
          break;
        case 500:
          this.notification.error('请求失败', '服务器错误，请稍后重试！');
          break;
        default:
          this.message.error('未知错误，请联系管理员！');
      }
      return throwError(error);
    })) as any;
  }

}


