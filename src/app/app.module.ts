import {NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';

import {NZ_I18N, NZ_ICONS, zh_CN} from 'ng-zorro-antd';
import {IconDefinition} from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {RoutesModule} from './routes/routes.module';
import {SharedModule} from './shared';
//
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

registerLocaleData(zh);
const LANG_PROVIDES = [
  {provide: NZ_I18N, useValue: zh_CN},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule,
    LayoutModule,
    RoutesModule,
  ],
  providers: [
    ...LANG_PROVIDES,
    {provide: NZ_ICONS, useValue: icons}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
