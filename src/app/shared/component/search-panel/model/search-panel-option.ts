import {SearchPanelOptionType} from './search-panel-option-type.enum';
import {SearchPanelCondition} from './search-panel-condition';

/**
 * 查询面板每一项的配置
 */
export class SearchPanelOption {
  // 标签名称
  labelTitle: string;
  // 输入框类型
  type: SearchPanelOptionType;

  // 项名，保持唯一性
  name: string;

  // 值为空时的提示
  placeholder: string;

  /**
   * 默认值
   *  ps:若defaultValue为普通类型，即number/string/boolean，则可以直接输入
   *  若defaultValue为对象或函数，需要传入同一个对象，比如下拉列表中value为对象，则需要传入原对象
   */
  defaultValue?: any;

  /**
   * 表示该项是否是高级查询
   * 默认不填表示该项在简单查询面板，也在高级查询中
   * true表示在高级查询面板，不在简单查询面板
   * false表示不在高级查询面板，而在简单查询面板
   *
   */
  advancedSearch?: boolean;

  /**
   *
   * 该回调可以实现日期选择框有部分日期不可选的功能，返回true表示日期可用,true表示date不可用
   */
  disableDate?: (date: Date) => boolean;

  // 列表，日期，只读框的点击或值改变事件
  selectedChange?: (value: any) => void;

  // 对于列表项（包括单选和多选）的预选数据列表
  selectOptions?: SearchPanelCondition[];

  // 若type项选择customTemplate类型，则需要在此项中配置自定义的模板中使用appTemplatePanel指令的值
  customTemplateName?: string;

  // 自定义的字段，通过customTemplate可以在对应的模板中自行访问
  origin?: { [key: string]: any };
}
