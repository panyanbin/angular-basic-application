import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppMenu} from './app-menu';
import {Subscription} from 'rxjs';
import {MenuService} from '../../../core/service/menu/menu.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../../core/service/setting/settings.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu.component.html',
    styles: [
            `
            .menu-selected {
                color: #1890ff;
            }
        `,
    ],
})
export class AppMenuComponent implements OnInit, OnDestroy {

    private change$: Subscription;

    menu: AppMenu[];

    constructor(private menuSrv: MenuService,
                public settingsService: SettingsService,
                private cdr: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        this.menuSrv.openedByUrl(this.router.url);
        this.change$ = this.menuSrv.change.subscribe(res => {
            this.menu = res;
            this.cdr.detectChanges();
        });
    }

    onMenuClick(event: AppMenu) {
        if (event.link) {
            this.menuSrv.navigateByUrl(event.link);
            this.router.navigate([event.link]);
        }
    }

    ngOnDestroy(): void {
        this.change$.unsubscribe();
    }

}
