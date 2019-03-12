import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {NzIconService} from 'ng-zorro-antd';
import {environment} from '../../../environments/environment';
import {MenuService} from '../service/menu/menu.service';
import {TokenService} from '../auth';
import {AppMenu} from '../../layout/default/menu/app-menu';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {
    // iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {

      // 清空本地存储
      // this.tokenService.clear();
      // 可以直接加载静态数据，也可以从服务器中获取菜单树
      this.httpClient.get(environment.STATIC_FILE_URL + '/temp/menu.json').subscribe(
        (menuMap: AppMenu[]) => {
          this.menuService.setMenu(menuMap);
        },
      );
      resolve(null);

    });
  }
}

