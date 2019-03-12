import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {ACLDirective} from '../core/acl';
import {TableModule} from './component/table';
import {SearchPanelModule} from './component/search-panel';
import {ViewGridModule} from './component/view-grid';

import {NameValidatorDirective, DownFileDirective} from './directive';
import {MyDatePipe, ImageUrlPipe} from './pipe';

const SHARED_MODULE = [
  TableModule,
  SearchPanelModule,
  ViewGridModule,
];

const PIPE = [
  MyDatePipe,
  ImageUrlPipe,
];

const DIREVTIVE = [NameValidatorDirective, DownFileDirective, ACLDirective];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    ...SHARED_MODULE,
  ],
  declarations: [...PIPE, ...DIREVTIVE],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    ...PIPE,
    ...SHARED_MODULE,
    ...DIREVTIVE,
  ],
})
export class SharedModule {
}
