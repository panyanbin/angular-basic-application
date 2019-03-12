import {Component, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {updateHostClass} from '../../../../common/other/style';
import {ViewGridCol} from '../view-grid/view-grid-col';

@Component({
    selector: 'app-view-grid-container',
    templateUrl: './view-grid-container.component.html',
    styleUrls: ['./view-grid-container.component.scss'],
})
export class ViewGridContainerComponent implements OnInit, OnChanges {

    @Input() col: number | ViewGridCol;

    @Input() labelWidth: number;

    @Input() gutter = 32;

    // @Input() default: '-';

    private el: HTMLElement;

    constructor(el: ElementRef, private ren: Renderer2) {
        this.el = el.nativeElement;
        if (isNaN(this.gutter)) {
            this.gutter = 32;
        }
    }

    private setClass() {
        const {el, ren} = this;
        updateHostClass(el, ren, {
            [`vg__container`]: true,
            // [`${prefixCls}__${size}`]: true,
            // [`${prefixCls}__${layout}`]: true,
            [`clearfix`]: true,
        });
    }

    ngOnInit() {
        this.setClass();
    }

    ngOnChanges() {
        this.setClass();
    }

}
