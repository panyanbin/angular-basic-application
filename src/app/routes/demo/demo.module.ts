import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared';
import {TableDemoComponent} from './table-demo/table-demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {SearchPanelDemoComponent} from './search-panel-demo/search-panel-demo.component';
import { ViewGridDemoComponent } from './view-grid-demo/view-grid-demo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DemoRoutingModule,
  ],
  declarations: [TableDemoComponent, SearchPanelDemoComponent, ViewGridDemoComponent],
})
export class DemoModule {
}
