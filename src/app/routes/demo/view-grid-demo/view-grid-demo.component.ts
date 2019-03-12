import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-grid-demo',
  templateUrl: './view-grid-demo.component.html',
  styleUrls: ['./view-grid-demo.component.scss'],
})
export class ViewGridDemoComponent implements OnInit {

  list = [{
    title: '数据项1',
  }];

  constructor() {
  }

  ngOnInit() {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({
        title: '日期数据项' + i,
        value: Math.floor(Math.random() * 10000000000) + Date.now(),
      });
    }
    this.list = items;

  }

}
