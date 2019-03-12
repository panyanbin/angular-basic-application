import {OnDestroy, Pipe, PipeTransform} from '@angular/core';

/**
 * 参数 args:
 *          original:获取原图
 */
@Pipe({
  name: 'imageUrlPip',
})
export class ImageUrlPipe implements PipeTransform, OnDestroy {

  reg: RegExp;

  constructor() {
    this.reg = new RegExp('^VFID://(\\d+)$');
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return 'assets/img/user.png';
    } else if (Number.isInteger(+value)) {
      // 输入为纯数字，为静态图片
      return this.transformUrlForStaticImage(value, args);
    } else {
      return this.checkAndTransformInToThumbnail(value, args);
    }
  }


  checkIsStaticImage(url: string) {
    const value = this.reg.exec(url);
    if (value) {
      // 是否静态图片
      return value[1];
    } else {
      return false;
    }
  }

  // 把本系统图片服务器的图片id转成缩略图展示
  transformUrlForStaticImage(vfId: number, args: any) {
    return 'assets/img/user.png';
  }

  // 检查是否为静态图片并转换缩略图
  checkAndTransformInToThumbnail(url: string, args: any): string {
    const flag = this.checkIsStaticImage(url);
    if (flag) {
      return this.transformUrlForStaticImage(+flag, args);
    } else {
      return url;
    }
  }

  // 从缩略图中获取图片id
  getVFIDFromThumbnail(url: string): number {
    const encodeReg = new RegExp('vfId=(\\d*)$');
    const value = encodeReg.exec(url);
    return +(value[1]);
  }

  ngOnDestroy(): void {

  }
}
