import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {CheckTokenInterceptor, OtherInterceptor, RequestTokenInterceptor, ResponseInterceptor} from './net';
import {AuthConfig, AuthGuard, TokenService} from './auth';
import {ReuseTabService, ReuseTabStrategy} from './route';
import {StartupService} from './startup/startup.service';
import {MenuService} from './service/menu/menu.service';
import {SettingsService} from './service/setting/settings.service';
import {ACLConfig} from './acl';

// 路由登录防卫哨兵
const GUARD_PROVIDERS = [
  AuthGuard,
];

//  全局共享的一些数据
const GLOBAL_SERVICE_PROVIDER = [TokenService, MenuService, SettingsService];

// ********** APP启动服务注册**********start*********
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}

// ********** APP启动服务注册**********end*********


// ********** 全局配置注册*********start*********
const GLOBAL_CONFIG_PROVIDES = [
  {provide: AuthConfig, useFactory: fnAuthConfig},
  {provide: ACLConfig, useFactory: fnACLConfig},
];

// 注册权限信息（可重写）
export function fnAuthConfig(): AuthConfig {
  return Object.assign(new AuthConfig(), <AuthConfig>{
    // 重写当前系统的登录页路由
    login_url: '/passport/login',

    // 重写发送请求时，token的放置位置，header,body。。
    token_send_place: 'header',

    // 配置符合该路径的都可以忽略不带token
    ignores: [/\/login/, /assets\//, /passport\//],
  });
}

export function fnACLConfig(): ACLConfig {
  return Object.assign(new ACLConfig(), <ACLConfig>{
    // 重写当前系统的权限配置项
  });
}

// ********** 全局配置注册*********end*********


// ********** 拦截器注册**********start*********
const INTERCEPTORS_PROVIDERS = [
  // 注册验证本地是否存有token
  {provide: HTTP_INTERCEPTORS, useClass: CheckTokenInterceptor, multi: true},
  // 拦截给请求加入token值
  {provide: HTTP_INTERCEPTORS, useClass: RequestTokenInterceptor, multi: true},
  // 拦截其他请求样本
  {provide: HTTP_INTERCEPTORS, useClass: OtherInterceptor, multi: true},
  // 拦截处理响应的逻辑
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
];
// ********** 拦截器注册**********start*********


// 路由复用配置
const REUSE_ROUTE_PROVIDERS = [
  {
    provide: RouteReuseStrategy,
    useClass: ReuseTabStrategy,
    deps: [ReuseTabService],
  },
];

@NgModule({
  imports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...GUARD_PROVIDERS,
        ...GLOBAL_SERVICE_PROVIDER,
        ...APPINIT_PROVIDES,
        ...INTERCEPTORS_PROVIDERS,
        ...GLOBAL_CONFIG_PROVIDES,
        {provide: APP_BASE_HREF, useValue: '/'},
        ...REUSE_ROUTE_PROVIDERS,
      ],
    };
  }
}
