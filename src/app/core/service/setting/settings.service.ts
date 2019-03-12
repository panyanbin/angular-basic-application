import {Injectable, OnDestroy} from '@angular/core';
import {Layout, User} from './interface';
import {Subject} from 'rxjs';

const LAYOUT_KEY = 'layout';
const USER_KEY = 'user';

/**
 * 全局共享的一些数据
 */
@Injectable({
  providedIn: 'root',
})
export class SettingsService implements OnDestroy {

  private notify$: Subject<Layout> = new Subject();

  private _layout: Layout = null;
  private _user: User = null;


  private get(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || 'null') || null;
  }

  // tslint:disable-next-line:no-any
  private set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get layout(): Layout {
    if (!this._layout) {
      this._layout = {
        fixed: true,
        collapsed: false,
        boxed: false,
        lang: null,
        ...this.get(LAYOUT_KEY),
      };
      this.set(LAYOUT_KEY, this._layout);
    }
    return this._layout;
  }

  get user(): User {
    if (!this._user) {
      this._user = {
        ...this.get(USER_KEY),
      };
      this.set(USER_KEY, this._user);
    }
    return this._user;
  }

  constructor() {
  }

  setLayout(name: string | Layout, value?: any): boolean {
    if (typeof name === 'string') {
      this.layout[name] = value;
    } else {
      this._layout = name;
    }
    this.set(LAYOUT_KEY, this._layout);
    // tslint:disable-next-line:no-any
    this.notify$.next(this._layout as any);
    return true;
  }

  setUser(name: string | User, value?: any): boolean {
    if (typeof name === 'string') {
      this._user[name] = value;
    } else {
      this._user = name;
    }
    this.set(USER_KEY, this._user);
    return true;
  }

  ngOnDestroy(): void {
    this.notify$.unsubscribe();
  }
}
