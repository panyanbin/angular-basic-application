import {Component, OnInit} from '@angular/core';
import {LoginService} from './service/login.service';
import {Router} from '@angular/router';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {StartupService} from '../../../core/startup/startup.service';
import {SettingsService} from '../../../core/service/setting/settings.service';
import {ReuseTabService} from '../../../core/route';
import {TokenService} from '../../../core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private loginServic: LoginService,
    private router: Router,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private startUpService: StartupService,
    private reuseTabService: ReuseTabService,
    private tokenService: TokenService,
    private settingService: SettingsService,
  ) {
  }

  ngOnInit() {
  }

  submitForm() {
    if (!this.user.userName || !this.user.password) {
      return this.message.error('账号或密码不能为空');
    }
    this.loginServic.login(this.user.userName, this.user.password).subscribe(res => {
      if (res.code === 200) {
        if (res.data) {
          // 清空路由复用信息
          this.reuseTabService.clear();
          // 设置用户Token信息
          this.tokenService.set({token: res.data.token});
          this.settingService.setUser(res.data);
          // 登录成功后，加载页面菜单
          this.startUpService.load().then(next => {
            this.router.navigateByUrl(this.tokenService.redirect);
          });
        } else {
          this.notification.error('提示', '抱歉，当前用户无权限');
        }
      } else {
        this.message.error(res.msg);
      }
    });
  }

}
