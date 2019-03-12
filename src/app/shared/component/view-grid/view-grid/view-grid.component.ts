import {AfterViewInit, Component, ElementRef, Host, HostBinding, Input, OnChanges, Optional, Renderer2, TemplateRef} from '@angular/core';
import {ViewGridContainerComponent} from '../view-grid-container/view-grid-container.component';
import {ViewGridCol} from './view-grid-col';

export const REP_MAX = 6;

@Component({
    selector: 'app-view-grid',
    templateUrl: './view-grid.component.html',
    styleUrls: ['./view-grid.component.scss'],
})
export class ViewGridComponent implements AfterViewInit, OnChanges {

    @Input() col: number;
    // @Input() default: string;

    private el: HTMLElement;
    private clsMap: string[] = [];

    private rules: { [key: number]: ViewGridCol } = {
        1: {xs: 24},
        2: {xs: 24, sm: 12},
        3: {xs: 24, sm: 12, md: 8},
        4: {xs: 24, sm: 12, md: 8, lg: 6},
        5: {xs: 24, sm: 12, md: 8, lg: 6, xl: 4},
        6: {xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 2},
    };

    @Input() set vgLabel(value: string | TemplateRef<any>) {
        if (typeof value !== 'string') {
            this.labelTemplate = value;
        }
        this._label = value;
    }

    get vgLabel() {
        return this._label;
    }

    private _label;
    labelTemplate: TemplateRef<any>;

    @HostBinding('style.padding-left.px')
    get paddingLeft(): number {
        return this.parent && this.parent.gutter / 2;
    }

    @HostBinding('style.padding-right.px')
    get paddingRight(): number {
        return this.parent && this.parent.gutter / 2;
    }

    constructor(el: ElementRef,
                private ren: Renderer2,
                @Host() @Optional() public parent: ViewGridContainerComponent) {
        if (parent === null) {
            throw new Error(`[app-vg] must include 'app-vg-container' component`);
        }
        this.el = el.nativeElement;
    }

    setClass() {
        const {clsMap, col, ren, el} = this;
        const calcCol = +col || this.parent.col || 3;

        clsMap.forEach(cls => ren.removeClass(el, cls));
        clsMap.length = 0;

        clsMap.push(...this.genCls(calcCol));
        clsMap.push('vg__item');

        if (this.parent.labelWidth) {
            clsMap.push(`vg__item-fixed`);
        }

        clsMap.forEach(cls => ren.addClass(el, cls));
    }

    ngAfterViewInit() {
        this.setClass();
    }

    ngOnChanges() {
        this.setClass();
    }

    genCls(calcCol: number | ViewGridCol): string[] {
        // 若col是从父组件获取的，则有可能是自定已的类型ViewGridCol;
        let rule;
        if (typeof calcCol === 'object') {
            rule = calcCol;
        } else {
            calcCol = Number.parseInt(calcCol.toString());
            // 数字则为1-6之间
            rule = this.rules[calcCol > REP_MAX ? REP_MAX : Math.max(calcCol, 1)] || this.rules[3];
        }
        const antColClass = 'ant-col';
        const clsMap = [];
        if (rule.xs) {
            clsMap.push(`${antColClass}-xs-${rule.xs}`);
        }
        if (rule.sm) {
            clsMap.push(`${antColClass}-sm-${rule.sm}`);
        }
        if (rule.md) {
            clsMap.push(`${antColClass}-md-${rule.md}`);
        }
        if (rule.lg) {
            clsMap.push(`${antColClass}-lg-${rule.lg}`);
        }
        if (rule.xl) {
            clsMap.push(`${antColClass}-xl-${rule.xl}`);
        }
        if (rule.xxl) {
            clsMap.push(`${antColClass}-xxl-${rule.xxl}`);
        }
        return clsMap;
    }

}
