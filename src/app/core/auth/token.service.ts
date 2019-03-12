import {Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {AuthConfig} from './auth.config';
import {ITokenModel} from './interface';
import {SessionStorageService} from '../service/storage/session-storage.service';

export class TokenService {
    private change$: BehaviorSubject<ITokenModel> = new BehaviorSubject<ITokenModel>(null);
    private _redirect: string;

    constructor(
        @Inject(AuthConfig) private options: AuthConfig,
        private store: SessionStorageService,
    ) {
    }

    /**
     * 获取登录地址
     */
    get login_url(): string {
        return this.options.login_url;
    }

    /**
     * 设置登录成功后重定向
     * @param url
     */
    set redirect(url: string) {
        this._redirect = url;
    }

    /**
     * 获取登录成功后重定向
     */
    get redirect() {
        return this._redirect || '/';
    }

    set(data: ITokenModel): boolean {
        this.change$.next(data);
        return this.store.set(this.options.store_key, data);
    }

    // tslint:disable-next-line:no-any
    get(type?: any);
    get<T extends ITokenModel>(type?: { new(): T }): T {
        const data = this.store.getObject(this.options.store_key);
        return type ? (Object.assign(new type(), data) as T) : (data as T);
    }

    clear() {
        this.change$.next(null);
        this.store.remove(this.options.store_key);
    }

    change(): Observable<ITokenModel> {
        return this.change$.pipe(share());
    }
}
