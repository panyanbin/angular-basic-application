import {Component, OnInit} from '@angular/core';
import {SearchPanelService, SearchPanelOption, SearchPanelOptionType} from '../../../shared/component/search-panel';

@Component({
  selector: 'app-search-panel-demo',
  templateUrl: './search-panel-demo.component.html',
  styleUrls: ['./search-panel-demo.component.scss'],
})
export class SearchPanelDemoComponent implements OnInit {

  // 因为默认值是对象，所以需要单独定义，这样调用同一个变量
  json = {
    1: '踢足球',

  };

  // 详情配置看SearchPanelOption类
  options: SearchPanelOption[] = [
    {
      labelTitle: '姓名',
      name: 'name',
      defaultValue: 'fdsafds',
      type: SearchPanelOptionType.input,
      placeholder: '请输入姓名',
      advancedSearch: false,
    }, {
      labelTitle: '名称的',
      name: 'name1',
      defaultValue: 'ttttt',
      type: SearchPanelOptionType.readOnlyInput,
      placeholder: '请输入姓名',
      selectedChange: (event) => {
        console.log(event);
      },
      advancedSearch: true,
    }, {
      labelTitle: '年级',
      name: 'level',
      defaultValue: '二年级',
      placeholder: '请选择年级select',
      type: SearchPanelOptionType.select,
      selectedChange: (value) => {
        console.log(value);
      },
      selectOptions: [{
        label: '一年级',
        value: '一年级',
      }, {
        label: '二年级',
        value: {
          test: '二年级',
        },
      }, {
        label: '三年级',
        value: '三年级',
      }],
    }, {
      labelTitle: '爱好',
      name: 'like',
      defaultValue: 2,
      // defaultValue: '1',
      placeholder: '请选择爱好',
      type: SearchPanelOptionType.multipleSelect,
      selectedChange: (value) => {
        console.log(value);
      },
      selectOptions: [{
        label: '打球',
        value: '1',
      }, {
        label: '踢足球',
        value: this.json,
      }],
      // defaultCondition: 234,
    }, {
      labelTitle: '出生日期',
      name: 'birthday',
      defaultValue: '2018-11-01',
      placeholder: '请选择出生日期datePicker',
      type: SearchPanelOptionType.datePicker,
      selectedChange: (value) => {
        console.log(value);
      },
      disableDate: (date: Date) => {
        // 这里实现 日期大于今天的都禁用的功能
        if (date > new Date()) {
          return true;
        } else {
          return false;
        }
      },
    }, {
      labelTitle: '每周吃饭时间',
      name: 'eatTimePerWeek',
      defaultValue: new Date(),
      placeholder: '请选择每周吃饭时间',
      type: SearchPanelOptionType.datePickerWithTime,
      selectedChange: (value) => {
        console.log(value);
      },
    },
  ];

  constructor(private searchPanelService: SearchPanelService) {
    setTimeout(() => {
      // 通过调用服务该方法可以动态添加查询面板项，如往like后加一项
      searchPanelService.insertInputItem({
        labelTitle: '睡觉时间',
        name: 'sleepTime',
        defaultValue: new Date(),
        placeholder: '请选择睡觉时间',
        type: SearchPanelOptionType.timePicker,
        selectedChange: (value) => {
          console.log(value);
        },
      }, 'like');
      // 调用服务的该方法动态删除查询面板的栏，如移除姓名栏
      searchPanelService.removeInputItem('name');
    }, 5000);
  }

  ngOnInit() {
    // 3秒后修改level的值为二年级
    setTimeout(() => {
      this.searchPanelService.changeFormValue({
        level: '三年级',
        levelCondition: '小于',
        birthday: '2020-10-1',
      });
    }, 2000);
  }

  // 点击搜索后触发
  getForm(event) {
    console.log(event);
  }

}
