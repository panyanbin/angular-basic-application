import {Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';

import {ACLService} from './acl.service';
import {ACLCanType} from './acl.type';

/**
 * 可细化权限粒度，控制按钮或者其他内容根据当前登录人权限信息来决定是否展示
 *
 *
 * 控制逻辑尽量放到ACLService服务中编写，然后在当前中调用即可
 */
@Directive({selector: '[appAcl]'})
export class ACLDirective implements OnDestroy {
  private _value: ACLCanType;

  @Input('appAcl')
  set appAcl(value: ACLCanType) {
    this.set(value);
  }

  private set(value: ACLCanType) {
    // 给相应元素添加该类
    const CLS = 'acl__hide';
    const el = this.el.nativeElement;
    // this.renderer.destroyNode(el)
    if (this.srv.elementCan(value)) {
      this.renderer.removeClass(el, CLS);
    } else {
      this.renderer.addClass(el, CLS);
    }
    this._value = value;
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private srv: ACLService) {
  }

  ngOnDestroy(): void {
  }
}
