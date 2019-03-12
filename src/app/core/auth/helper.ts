import {DOCUMENT} from '@angular/common';
import {Injector} from '@angular/core';
import {Router} from '@angular/router';
import {AuthConfig} from './auth.config';
import {SimpleTokenModel} from './simple.model';


/**
 * 检测本地是否登录
 * 可自行修改逻辑，
 * 因本地存储的token结构是{token:'xxxx'}
 * @param model
 */
export function checkToken(model: SimpleTokenModel) {
  return (
    model != null && typeof model.token === 'string' && model.token.length > 0
  );
}

/**
 * 跳转到登录页面
 * @param options
 * @param injector
 * @constructor
 */
export function ToLogin(options: AuthConfig, injector: Injector) {
  if (options.token_invalid_redirect === true) {
    setTimeout(() => {
      if (/^https?:\/\//g.test(options.login_url)) {
        injector.get(DOCUMENT).location.href = options.login_url;
      } else {
        injector.get(Router).navigate([options.login_url]);
      }
    });
  }
}
