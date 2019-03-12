import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  /**
   * 登录系统
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   */
  login(username: string, password: string): Observable<any> {
    const params = new URLSearchParams();
    const passHash = Md5.hashStr(password).toString();
    params.append('userName', username);
    params.append('password', passHash);
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');

    return of({
      code: 200,
      data: {
        user: username,
        password: passHash,
        token: Date.now() + `${username}_${passHash}`,
      },
    });
  }
}
