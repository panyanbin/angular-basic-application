import {Directive, Host, Injectable, Input, OnInit, TemplateRef} from '@angular/core';

@Injectable()
export class TableRowRefSource {
    private titles: { [key: string]: TemplateRef<void> } = {};
    private rows: { [key: string]: TemplateRef<void> } = {};

    add(type: string, path: string, ref: TemplateRef<void>) {
        this[type === 'title' ? 'titles' : 'rows'][path] = ref;
    }

    getTitle(path: string) {
        return this.titles[path];
    }

    getRow(path: string) {
        return this.rows[path];
    }
}

@Directive({
    selector: '[appTableRowRef]',
})
export class TableRowRefDirective implements OnInit {

    @Input() appTableRowRef: string;

    @Input() type: 'title';

    constructor(private templateRef: TemplateRef<any>,
                @Host() private source: TableRowRefSource) {
    }

    ngOnInit(): void {
        this.source.add(this.type, this.appTableRowRef, this.templateRef);
    }
}
