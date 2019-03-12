import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SearchPanelOptionType} from '../model/search-panel-option-type.enum';
import {SearchPanelOption} from '../model/search-panel-option';
import {SearchPanelService} from '../service/search-panel.service';
import {TemplatePanelRefSource} from '../directive/template-panel.directive';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss'],
    providers: [TemplatePanelRefSource],
})
export class SearchPanelComponent implements OnInit {

    /**
     * 搜索面板配置项，必选
     */
    @Input() options: SearchPanelOption[];

    /**
     * 是否需要隐藏清空表单按钮
     */
    @Input() disableReset: boolean;

    // 是否设置分栏-----可选，修改各个屏幕的分栏设置
    @Input() set column(value: {
        xs?: number,
        sm?: number,
        md?: number,
        lg?: number,
        xl?: number,
        xxl?: number
    }) {
        this.defaultColumn = Object.assign(this.defaultColumn, value);
    }

    // 是否显示搜索按钮为加载中状态
    @Input() loading: boolean;

    // 是否禁用高级搜索面板-可选
    @Input() isDisableAdvancedSearch: boolean;

    @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output() resetEvent: EventEmitter<any> = new EventEmitter();

    // @ContentChildren(TemplatePanelDirective) templateRefs: QueryList<TemplatePanelDirective>;

    SearchPanelOptionType = SearchPanelOptionType;

    validateForm: FormGroup;
    // 是否是高级搜索
    isAdvancedSearch = false;

    // 默认分栏
    defaultColumn = {
        xs: 24,
        sm: 24,
        md: 18,
        lg: 10,
        xl: 8,
        xxl: 8,
    };

    toggleCollapse(): void {
        // this.resetForm();
        this.isAdvancedSearch = !this.isAdvancedSearch;
    }

    resetForm(): void {
        this.validateForm.reset();
        this.resetEvent.emit(this.isAdvancedSearch);
    }

    constructor(private fb: FormBuilder,
                private searchPanelService: SearchPanelService,
                public templateResource: TemplatePanelRefSource) {
    }

    ngOnInit() {
        this.initForm();
        this.initSub();
    }

    // 初始化表单
    initForm() {
        this.validateForm = this.fb.group({});
        for (const opt of this.options) {
            this.addControl(opt);
        }
    }

    // 添加每一项
    addControl(opt: SearchPanelOption) {
        const fm = new FormControl();
        if (opt.defaultValue != null || opt.defaultValue !== undefined) {
            fm.setValue(opt.defaultValue);
        }
        this.validateForm.addControl(opt.name, fm);

    }

    // 移除某一项
    removeControl(name: string) {
        if (this.validateForm.contains(name)) {
            this.validateForm.removeControl(name);
        }
    }

    // 更新数据
    initSub() {
        this.searchPanelService.getSub().subscribe(res => {
            if (!res) {
                return;
            }
            // 更新数据
            if (res.type === 'data') {
                this.validateForm.patchValue(res.data);
                //     插入项
            } else if (res.type === 'insertItem') {
                this.addControl(res.data.item);
                if (res.data.name) {
                    const index = this.getItemIndex(res.data.name);
                    // 若有索引在插入对应位置
                    if (index >= 0) {
                        this.options.splice(index, 0, res.data.item);
                    } else {
                        this.options.push(res.data.item);
                    }
                } else {
                    this.options.push(res.data.item);
                }
            } else if (res.type === 'removeItem') { //     移除项
                this.removeControl(res.data.name);
                // 从options中移除项
                const index = this.getItemIndex(res.data.name);
                if (index >= 0) {
                    this.options.splice(index, 1);
                }
            }
        });
    }

    // 根据名称获取所在的项
    getItemIndex(name: string) {
        const options = this.options;
        let insertIndex;
        for (let i = 0; i < options.length; i++) {
            if (options[i].name === name) {
                insertIndex = i;
                break;
            }
        }
        return insertIndex;
    }

    // 点击搜索按钮
    searchForm() {
        // 更新
        const controls = this.validateForm.controls;
        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                this.validateForm.controls[key].markAsDirty();
                this.validateForm.controls[key].updateValueAndValidity();
            }
        }
        const advancedSearch = this.isAdvancedSearch;
        const totalData = this.validateForm.value;
        const currentData = {};
        const options = this.options;
        // 遍历返回当前搜索面板的内容，简单搜索或高级搜索
        for (const o of options) {
            if (o.advancedSearch === undefined || o.advancedSearch === advancedSearch) {
                currentData[o.name] = totalData[o.name];
            }
        }
        this.searchEvent.emit({
            advancedSearch,
            data: currentData,
        });
    }

    // 默认不禁用日期
    disableAllDate(date: Date): boolean {
        return false;
    }

}
