import {Directive, Host, Injectable, Input, OnInit, TemplateRef} from '@angular/core';

@Injectable()
export class TemplatePanelRefSource {
    private resource: { [key: string]: TemplateRef<void> } = {};

    add(path: string, ref: TemplateRef<void>) {
        this.resource[path] = ref;
    }

    getTemplate(path: string) {
        return this.resource[path];
    }
}

@Directive({
    selector: '[appTemplatePanel]',
})
export class TemplatePanelDirective implements OnInit {
    name: string;

    constructor(private templateRef: TemplateRef<any>,
                @Host() private resource: TemplatePanelRefSource) {
    }

    @Input() set appTemplatePanel(name: string) {
        this.name = name;
    }

    ngOnInit(): void {
        this.resource.add(this.name, this.templateRef);
    }


}
