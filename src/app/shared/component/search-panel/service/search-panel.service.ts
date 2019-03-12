import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SearchPanelOption} from '../model/search-panel-option';
import {SearchPanelEditDto} from '../model/search-panel-edit-dto';

@Injectable()
export class SearchPanelService {

    private valueSubject: Subject<SearchPanelEditDto>;

    constructor() {
        this.valueSubject = new Subject<SearchPanelEditDto>();
    }

    getSub(): Subject<SearchPanelEditDto> {
        return this.valueSubject;
    }

    /**
     * 手动修改查询面板中表单的某项的值
     * @param nameJson  如{name:'sam',age:'18'},根据nameJson中的key值去找表单里对应的name
     */
    changeFormValue(nameJson: { [name: string]: any }) {
        this.valueSubject.next({
            type: 'data',
            data: nameJson,
        });
    }

    /**
     *  添加新的项
     * @param item 新增的项的数据配置
     * @param name  添加至name所在的项的后一项，若为空则添加到末尾
     */
    insertInputItem(item: SearchPanelOption, name?: string) {
        this.valueSubject.next({
            type: 'insertItem',
            data: {
                item, name,
            },
        });
    }

    /**
     * 移除已存在的项，根据name
     * @param name
     */
    removeInputItem(name: string) {
        this.valueSubject.next({
            type: 'removeItem',
            data: {
                name: name,
            },
        });
    }

}
