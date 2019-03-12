import {Injectable} from '@angular/core';
import {ACLCanType} from './acl.type';

//  可细化权限粒度，控制按钮或者其他内容是否展示，在标签上使用ACLDirective指令直接传值
@Injectable({
  providedIn: 'root',
})
export class ACLService {

  constructor() {
  }

  // 判断HTML元素是否够权限展示，这里只是写死都展示
  elementCan(type: ACLCanType): boolean {
    return true;
  }
}
