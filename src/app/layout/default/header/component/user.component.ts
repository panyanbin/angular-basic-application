import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from '../../../../core/service/setting/settings.service';
import {TokenService} from '../../../../core/auth';

@Component({
  selector: 'app-header-user',
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div class="default__nav-item d-flex align-items-center px-sm" nz-dropdown>
        <nz-avatar [nzSrc]="settings.user.headImgUrl | imageUrlPip" nzSize="small" class="mr-sm"></nz-avatar>
        {{settings.user.userName || ''}}
      </div>
      <div nz-menu class="width-sm">
        <!--<div nz-menu-item routerLink="/account/center"><i nz-icon type="user" class="mr-sm"></i>-->
        <!--用户中心-->
        <!--</div>-->
        <!--<div nz-menu-item routerLink="/account/settings"><i nz-icon type="setting" class="mr-sm"></i>-->
        <!--用户设置-->
        <!--</div>-->
        <!--<li nz-menu-divider></li>-->
        <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
          退出
        </div>
      </div>
    </nz-dropdown>
  `,
  styles: [`
    .default__nav-item {
      display: block;
      border-radius: 2px;
      text-align: center;
      line-height: 100%;
      padding: 8px 2px;
      min-width: 50px;
      transition: background-color 300ms;
      cursor: pointer;
      outline: none;
    }

    .default__nav-item:hover {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.2) !important;
    }

    .d-flex {
      display: flex !important;
    }

    .align-items-center {
      align-items: center !important;
    }

    .px-sm {
      padding-right: 8px !important;
      padding-left: 8px !important;
    }

    .width-sm {
      width: 160px !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    private router: Router,
    public settings: SettingsService,
    private tokenService: TokenService,
  ) {
  }

  logout() {
    this.tokenService.clear();
    this.tokenService.redirect = '/';
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
