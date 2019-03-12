import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableRowRefSource} from './directive/table-row-ref.directive';
import {TableColumn} from './table-column';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [TableRowRefSource],
})
export class TableComponent implements OnInit {

    @Input() column: TableColumn[];

    @Input() dataSet: any[] = [];

    @Output() dataSetChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * 复选改变的事件
     */
    @Output() checkChange: EventEmitter<any> = new EventEmitter<any>();

    @Input() total = 1;
    /**
     * 当前页数
     */
    @Input() page = 1;
    /**
     * 每页数量
     */
    @Input() size = 15;

    @Input() loading: boolean;

    @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() sizeChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * 隐藏禁用分页
     */
    @Input() disablePagination: boolean;

    title = null;

    bordered = false;

    expandable = false;

    allChecked = false;

    indeterminate = false;

    constructor(private dataSource: TableRowRefSource) {
    }

    // 页码修改时触发的事件
    _pageChange() {
        this.pageChange.emit(this.page);
    }

    _sizeChange() {
        this.sizeChange.emit(this.size);
    }

    /**
     * 全选或全不选
     * @param value
     */
    checkAll(value: boolean): void {
        this.dataSet.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.dataSetChange.emit(this.dataSet);
        this.refreshStatus();
    }

    /** 清除所有 `checkbox` */
    clearCheck() {
        this.checkAll(false);
    }

    /**
     * 复选改变时，通知父组件
     */
    private checkNotify() {
        const res = this.dataSet.filter(w => !w.disabled && w.checked === true);
        this.checkChange.emit(res);
    }

    /**
     * 当每项前置复选更新时，触发
     */
    refreshStatus(): void {
        const validData = this.dataSet.filter(value => !value.disabled);
        const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
        const allUnChecked = validData.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.checkNotify();
    }

    getTemplate(render: string, title?: boolean) {
        if (title) {
            return this.dataSource.getTitle(render);
        }
        return this.dataSource.getRow(render);
    }

    ngOnInit() {
    }

    reflesh() {
        this.page = 1;
    }

    /**
     * 解析数据内容
     * @param data
     * @param config
     */
    parseValue(config: TableColumn, data: any, index: number): string {
        if (config.key) {
            return this.getValueByDot(data, config.key);
        } else if (config.format) {
            if (typeof config.format === 'string') {
                return config.format.replace(/\$\{([\w._]+)\}/g,
                    (_: string, g: string) => {
                        if (g === 'index') {
                            return index + '';
                        } else if (g.startsWith('row.')) {
                            return this.getValueByDot(data, g.substring(4));
                        } else {
                            return '';
                        }
                    },
                );
            } else if (typeof config.format === 'function') {
                return (config.format)(data, index, this.dataSet, config.key) + '';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    // 根据key（可以逗号分隔）去获取data中的值
    private getValueByDot(data: any, key: string): string {
        const keys = key.split('.');
        let value = '';
        try {
            if (!data) {
                return '';
            }
            value = data[keys[0]];
            let i = 1;
            while (value && i !== keys.length) {
                value = value[keys[i]];
                i++;
            }
        } catch (e) {
            console.error('key值有误，无法解析或列表的数据为空');
            return '';
        }
        return value && value.toString && value.toString();
    }

}
