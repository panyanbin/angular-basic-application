import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMenuComponent} from './app-menu.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppSubMenuComponent} from './app-sub-menu.component';
import {RouterModule} from '@angular/router';
import { AppMenuItemComponent } from './app-menu-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgZorroAntdModule,
    ],
    declarations: [AppMenuComponent, AppSubMenuComponent, AppMenuItemComponent],
    exports: [AppMenuComponent, AppSubMenuComponent],
})
export class AppMenuModule {
}
