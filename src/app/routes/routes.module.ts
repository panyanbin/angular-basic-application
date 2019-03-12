import {NgModule} from '@angular/core';
import {RoutesRoutingModule} from './routes-routing.module';
import {LoginComponent} from './password/login/login.component';
import {SharedModule} from '../shared';

@NgModule({
    imports: [
        RoutesRoutingModule,
        SharedModule,
    ],
    declarations: [LoginComponent],
})
export class RoutesModule {
}
