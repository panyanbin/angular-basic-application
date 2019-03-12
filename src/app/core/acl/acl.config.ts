import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ACLConfig {
  /**
   * 路由守卫失败后跳转，默认：`/403`
   */
  guard_url ? = '/403';

  [key: string]: any;
}