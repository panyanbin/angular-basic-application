import {Component} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';

@Component({
    selector: 'app-exception-500',
    template: `
        <app-exception type="500" style="min-height: 500px; height: 80%;"></app-exception>`,
})
export class Exception500Component {
    constructor(modalSrv: NzModalService) {
        modalSrv.closeAll();
    }
}
