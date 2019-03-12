import {Component, OnInit, ViewChild} from '@angular/core';
import {TableColumn, TableComponent} from '../../../shared/component/table';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss'],
})
export class TableDemoComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  page = 1;

  column: TableColumn[] = [
    {
      checkBox: true,
    },
    {
      title: '序号',
      format: (data, index: number) => {
        return index + 1 + '';
      },
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '年龄',
      render: 'age',
    },
    {
      title: '地址',
      // key: 'address',
      format: '这是字符串模板，地址：${row.address}。${index}行',
    }, {
      title: '多层级数据',
      key: 'p.b.c',
    },
    {
      title: '操作',
      // format: '这是第${index}行，姓名为${data.name}，其他参数为${data.p.a}',
      format: (row, index) => {
        if (index % 2) {
          return '';
        }
        return '函数格式化了行数为偶数的数据';
      },
    },
  ];

  dataSet: any[] = [];
  loading: boolean;

  constructor() {
    setTimeout(() => {
      // this.table.reflesh();
      this.loading = true;
    }, 2000);
    setTimeout(() => {
      this.loading = false;
    }, 6000);

  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.dataSet.push({
        name: 'John Brown',
        age: `${i}`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        p: {
          a: '3432' + '_' + i,
          b: {
            c: '45' + '_' + i,
          },
        },
        // checked: false,
        // expand: false,
      });
    }
  }

  onPage(event) {
    console.log(event);
  }

}
