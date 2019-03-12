import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppMenu} from '../../../layout/default/menu/app-menu';
import {share} from 'rxjs/operators';

/**
 * 菜单服务
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {

  private _change$: BehaviorSubject<AppMenu[]> = new BehaviorSubject<AppMenu[]>([]);

  private data: AppMenu[] = [];

  constructor() {
  }

  /**
   * 菜单变化时通知订阅
   */
  get change(): Observable<AppMenu[]> {
    return this._change$.pipe(share());
  }

  // 获取当前时刻的菜单栏
  get menus() {
    return this.data;
  }

  /**
   * 清空菜单
   */
  clear() {
    this.data = [];
    this._change$.next(this.data);
  }

  /**
   * 重置菜单
   * @param items
   */
  setMenu(items: AppMenu[]) {
    this.data = items;
    this.resume();
  }

  /**
   * 重置菜单的关系
   * 给每一项菜单添加以下信息：
   * 设置_id递增索引
   * 设置_parent字段为当前项的父菜单
   * 设置_depth当前项的深度
   */
  resume(callback?: (item: AppMenu, parentMenum: AppMenu, depth?: number) => void) {
    let i = 1;
    const shortcuts: AppMenu[] = [];
    this.visit((item, parent, depth) => {
      item._id = i++;
      item._parent = parent;
      item._depth = depth;

      // badge
      if (item.badgeCount) {
        if (item.badgeDot !== true) {
          item.badgeDot = false;
        }
        if (!item.badgeStatus) {
          item.badgeStatus = 'error';
        }
      }

      // if (item.icon != null) {
      //     item.icon = {theme: 'outline', spin: false, ...(item.icon as MenuIcon)};
      // }

      // group
      item.group = item.group !== false;

      // hidden
      item._hidden = typeof item.hide === 'undefined' ? false : item.hide;

      if (callback) {
        callback(item, parent, depth);
      }
    });

    this._change$.next(this.data);
  }

  /**
   * 递归访问菜单的每一项，回调函数处理对应值
   * @param callback
   */
  visit(callback: (item: AppMenu, parentMenum: AppMenu, depth?: number) => void) {
    const inFn = (list: AppMenu[], parentMenu: AppMenu, depth: number) => {
      for (const item of list) {
        callback(item, parentMenu, depth);
        if (item.children && item.children.length > 0) {
          inFn(item.children, item, depth + 1);
        } else {
          item.children = [];
        }
      }
    };

    inFn(this.data, null, 0);
  }

  /**
   * 根据url去菜单中碰撞获取对应的项
   * @param url
   * @param recursive
   * @param cb
   */
  private getHit(url: string, recursive = false, cb: (i: AppMenu) => void = null) {
    let item: AppMenu = null;

    while (!item && url) {
      this.visit((i: AppMenu) => {
        if (cb) {
          cb(i);
        }
        if (i.link != null && i.link === url) {
          item = i;
        }
      });

      if (!recursive) {
        break;
      }

      url = url
        .split('/')
        .slice(0, -1)
        .join('/');
    }

    return item;
  }

  /**
   * 根据URL设置菜单 `_open` 属性
   * - 若 `recursive: true` 则会自动向上递归查找，往上展开祖先项
   *  - 菜单数据源包含 `/ware`，则 `/ware/1` 也视为 `/ware` 项
   */
  openedByUrl(url: string, recursive = false) {
    if (!url) {
      return;
    }

    let findItem = this.getHit(url, recursive, (i: AppMenu) => {
      i.open = false;
      i.selected = false;
    });
    // console.log(findItem);
    if (!findItem) {
      return;
    }

    do {
      findItem.open = true;
      findItem.selected = true;
      findItem = findItem._parent;
    } while (findItem);
  }

  /**
   * 根据url获取菜单列表
   * - 若 `recursive: true` 则会自动向上递归查找
   *  - 菜单数据源包含 `/ware`，则 `/ware/1` 也视为 `/ware` 项
   */
  getPathByUrl(url: string, recursive = false): AppMenu[] {
    const ret: AppMenu[] = [];
    let item = this.getHit(url, recursive);

    if (!item) {
      return ret;
    }

    do {
      ret.splice(0, 0, item);
      item = item.__parent;
    } while (item);

    return ret;
  }

  /**
   * 根据URL设置菜单 `_open` 属性
   * - 若 `recursive: true` 则会自动向上递归查找，往上展开祖先项
   *  - 菜单数据源包含 `/ware`，则 `/ware/1` 也视为 `/ware` 项
   */
  navigateByUrl(url: string, recursive = false) {
    if (!url) {
      return;
    }

    let findItem = this.getHit(url, recursive, (i: AppMenu) => {
      // i.open = false;
      i.selected = false;
    });
    // console.log(findItem);
    if (!findItem) {
      return;
    }

    do {
      findItem.open = true;
      findItem.selected = true;
      findItem = findItem._parent;
    } while (findItem);
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
  }
}
