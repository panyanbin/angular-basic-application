import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private modalSrv: NzModalService,
    ) {
        // Turn off G2 tracking
        // if (typeof G2 !== 'undefined') {
        //     G2.track(false);
        // }
    }

    ngOnInit() {
        this.router.events
            .pipe(filter(evt => evt instanceof NavigationEnd))
            .subscribe(() => {
                this.modalSrv.closeAll();
            });
    }
}
