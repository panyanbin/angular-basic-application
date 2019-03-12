import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/service/setting/settings.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    constructor(public settings: SettingsService) {
    }

    ngOnInit() {
    }

    toggleCollapsed() {
        // this.isCollapsed = !this.isCollapsed;
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

}
