import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SearchPanelComponent} from './component/search-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TemplatePanelDirective} from './directive/template-panel.directive';
import {SearchPanelService} from './service/search-panel.service';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [SearchPanelService],
    declarations: [SearchPanelComponent, TemplatePanelDirective],
    exports: [
        SearchPanelComponent,
        TemplatePanelDirective,
    ],
})
export class SearchPanelModule {
}
