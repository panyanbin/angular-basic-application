import {Component, Input, OnInit} from '@angular/core';
import {AppMenu} from './app-menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './app-menu-item.component.html',
})
export class AppMenuItemComponent implements OnInit {

  @Input() item: AppMenu;

  constructor() {
  }

  ngOnInit() {
  }

}
