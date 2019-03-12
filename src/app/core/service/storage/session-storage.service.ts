import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {

    storage = sessionStorage;

    constructor() {
    }

    get(key: string): string {
        return this.storage.getItem(key);
    }

    set(key: string, value: string | object): boolean {
        if (typeof value === 'string') {
            this.storage.setItem(key, value);
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
        return true;
    }

    /**
     * 获取对象
     * @param key
     */
    getObject(key: string): object {
        const value = this.storage.getItem(key);
        if (value) {
            try {
              return JSON.parse(value);
            } catch (e) {
                console.warn('this value is not object type');
                return null;
            }
        }
        return null;
    }

    remove(key: string): boolean {
        try {
            this.storage.removeItem(key);
        } catch (e) {
            return false;
        }
        return true;
    }

}
