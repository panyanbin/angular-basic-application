import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {TableRowRefDirective} from './directive/table-row-ref.directive';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
    ],
    declarations: [TableComponent, TableRowRefDirective],
    exports: [TableComponent, TableRowRefDirective],
})
export class TableModule {
}
