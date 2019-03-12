import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ReuseTabService} from '../../core/route';
import {TokenService} from '../../core/auth';
import {StartupService} from '../../core/startup/startup.service';


@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss'],
  host: {'[class.exception]': 'true'},
})
export class ExceptionComponent implements OnInit, OnDestroy {
  @ViewChild('conTpl')
  private conTpl: ElementRef;

  _type: number;
  // tslint:disable-next-line:no-any
  hasCon = false;

  _img = '';
  _title = '';
  _desc = '';

  @Input()
  set type(value: 403 | 404 | 500) {
    const item = {
      403: {
        img:
          environment.STATIC_FILE_URL + '/img/wZcnGqRDyhPOEYFcZDnb.svg',
        title: '403',
        desc: '抱歉，你无权访问该页面',
      },
      404: {
        img:
          environment.STATIC_FILE_URL + '/img/KpnpchXsobRgLElEozzI.svg',
        title: '404',
        desc: '抱歉，你访问的页面不存在',
      },
      500: {
        img:
          environment.STATIC_FILE_URL + '/img/RVRUAYdCGeYNBWoKiIwB.svg',
        title: '500',
        desc: '抱歉，服务器出错了',
      },
    }[value];

    if (!item) {
      return;
    }

    this._type = value;
    this._img = item.img;
    this._title = item.title;
    this._desc = item.desc;
  }

  @Input()
  set img(value) {
    this._img = value;
  }

  @Input()
  set title(value) {
    this._title = value;
  }

  @Input()
  set desc(value) {
    this._desc = value;
  }

  constructor(private reuseTabService: ReuseTabService,
              private startUpService: StartupService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  turnBack() {
    // 清空路由缓存，跳转到主页
    this.tokenService.redirect = '/';
    this.reuseTabService.clear();
    this.router.navigate(['/']).then(() => {
      this.startUpService.load();
    }).catch(() => {
      this.startUpService.load();
    });
  }
}
