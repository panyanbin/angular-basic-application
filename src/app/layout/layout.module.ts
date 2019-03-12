import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './default/layout.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {LayoutPassportComponent} from './passport/passport.component';
import {AppMenuModule} from './default/menu/app-menu.module';
import {HeaderComponent} from './default/header/header.component';
import {HeaderUserComponent} from './default/header/component/user.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    SharedModule,
    AppMenuModule,
  ],
  declarations: [
    LayoutComponent,
    LayoutPassportComponent,
    HeaderUserComponent,
    HeaderComponent],
})
export class LayoutModule {
}
