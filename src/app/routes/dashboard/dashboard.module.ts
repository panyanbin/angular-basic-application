import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../../shared';

@NgModule({
    imports: [
        DashboardRoutingModule,
        SharedModule,
    ],
    declarations: [DashboardComponent],
})
export class DashboardModule {
}
