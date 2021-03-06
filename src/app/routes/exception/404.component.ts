import {Component} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';

@Component({
    selector: 'app-exception-404',
    template: `
        <app-exception type="404" style="min-height: 500px; height: 80%;"></app-exception>`,
})
export class Exception404Component {
    constructor(modalSrv: NzModalService) {
        modalSrv.closeAll();
    }
}
