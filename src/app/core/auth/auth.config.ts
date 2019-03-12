import {Injectable} from '@angular/core';

@Injectable()
export class AuthConfig {
  /**
   * 在本地存储中存储KEY值
   */
  store_key ? = '_token';
  /**
   * 无效时跳转至登录页，包括：
   * - 无效token值
   */
  token_invalid_redirect ? = true;

  /**
   * 发送token参数名，默认：token
   */
  token_send_key ? = 'token';

  /**
   * 发送token模板（默认为：`${token}`），使用 `${token}` 表示token点位符，例如：带固定前缀
   *
   * - token=`abc ${token}`
   */
    // tslint:disable-next-line:no-invalid-template-strings
  token_send_template ? = '${token}';

  /**
   * 发送token参数位置，默认：header
   */
  token_send_place?: 'header' | 'body' | 'url' = 'header';
  /**
   * 登录页路由地址
   */
  login_url ? = `/login`;
  /**
   * 忽略TOKEN的URL地址列表，默认值为：[ /\/login/, /assets\//, /passport\// ]
   */
  ignores?: RegExp[] = [/\/login/, /assets\//, /passport\//];
  /**
   * 允许匿名登录KEY，若请求参数中带有该KEY表示忽略TOKEN
   */
  allow_anonymous_key ? = `_allow_anonymous`;
}
