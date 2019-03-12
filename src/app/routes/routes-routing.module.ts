import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {LayoutComponent} from '../layout/default/layout.component';
import {environment} from '../../environments/environment';
import {AuthGuard} from '../core/auth';
import {LayoutPassportComponent} from '../layout/passport/passport.component';
import {LoginComponent} from './password/login/login.component';

const routes: Route[] = [{
  path: 'main',
  component: LayoutComponent,
  canActivateChild: [AuthGuard],
  children: [{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule',
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  }],
}, {
  path: 'passport',
  component: LayoutPassportComponent,
  children: [{
    path: 'login',
    component: LoginComponent,
  }],
}, {
  path: 'exception',
  loadChildren: './exception/exception.module#ExceptionModule',
}, {
  path: 'demo',
  component: LayoutComponent,
  loadChildren: './demo/demo.module#DemoModule',
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: '/main/dashboard',
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: environment.useHash}),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {
}
