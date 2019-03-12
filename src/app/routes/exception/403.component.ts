import {Component} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';

@Component({
    selector: 'app-exception-403',
    template: `
        <app-exception type="403" style="min-height: 500px; height: 80%;"></app-exception>`,
})
export class Exception403Component {
    constructor(modalSrv: NzModalService) {
        modalSrv.closeAll();
    }
}
