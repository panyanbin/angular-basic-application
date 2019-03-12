import {NgModule} from '@angular/core';

import {ExceptionRoutingModule} from './exception-routing.module';

import {Exception403Component} from './403.component';
import {Exception404Component} from './404.component';
import {Exception500Component} from './500.component';
import {SharedModule} from '../../shared/shared.module';
import {ExceptionComponent} from './exception.component';

const COMPONENTS = [
    Exception403Component,
    Exception404Component,
    Exception500Component,
    ExceptionComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, ExceptionRoutingModule],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class ExceptionModule {
}
