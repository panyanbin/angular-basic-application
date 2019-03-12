import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppMenu} from './app-menu';

@Component({
    selector: 'app-sub-menu',
    templateUrl: './app-sub-menu.component.html',
    styles: [
            `
            .menu-selected {
                color: #1890ff;
            }
        `,
    ],
})
export class AppSubMenuComponent implements OnInit {

    @Input() subMenu: AppMenu;

    @Output() menuClickEvent: EventEmitter<AppMenu> = new EventEmitter<AppMenu>();

    constructor() {
    }

    ngOnInit() {
    }

}
