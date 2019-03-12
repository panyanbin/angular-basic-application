import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewGridContainerComponent} from './view-grid-container/view-grid-container.component';
import {ViewGridComponent} from './view-grid/view-grid.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [ViewGridContainerComponent, ViewGridComponent],
    exports: [ViewGridContainerComponent, ViewGridComponent],
})
export class ViewGridModule {
}
