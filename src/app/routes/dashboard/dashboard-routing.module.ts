import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Route[] = [{
    path: 'info',
    component: DashboardComponent,
}, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class DashboardRoutingModule {
}
