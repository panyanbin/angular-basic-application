import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {TableDemoComponent} from './table-demo/table-demo.component';
import {SearchPanelDemoComponent} from './search-panel-demo/search-panel-demo.component';
import {ViewGridDemoComponent} from './view-grid-demo/view-grid-demo.component';

const routes: Route[] = [{
  path: 'table',
  component: TableDemoComponent,
}, {
  path: 'search',
  component: SearchPanelDemoComponent,
}, {
  path: 'viewGrid',
  component: ViewGridDemoComponent,
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'table',
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DemoRoutingModule {
}
