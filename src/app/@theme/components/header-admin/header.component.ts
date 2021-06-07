import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbDialogService,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService, NbToastrService
} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserUpdateComponent} from '../../../admin/sys_config/users/user-update/user-update.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  openMenu = false;

  themes = [
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];


  languages = [
    {
      value: 'en',
      name: 'English',
    },
    {
      value: 'vi',
      name: 'Vietnamese',
    },
  ];

  getLanguage() {
    let language = localStorage.getItem('languageName');
    if (language === undefined || language === null) {
      language = 'vi';
    }

    return language;

  }

  viewUsers(data) {
    const obj = JSON.parse(localStorage.getItem('userDetails'));
    console.log(obj);
    this.dialogService.open(UserUpdateComponent, {
      context: {
        title: this.translate.instant('users.title_edit'),
        data: obj,
        isCheck: 0
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        if (value) {
            this.toastrService.success(this.translate.instant('users.content_edit_success'),
              this.translate.instant('common.title_notification'));
          // this.search(0);
        }
      }
    );
  }

  currentTheme = 'cosmic';
  language = 'vi';
  currentLanguage = this.getLanguage();

  logout() {
    localStorage.clear();
    this.router.navigate(['auths/login']);
  }


  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private dialogService: NbDialogService,
              public router: Router) {
  }


  ngOnInit() {
    this.user = localStorage.getItem('users');
    this.currentTheme = this.themeService.currentTheme;
    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLanguage(languageName: string) {
    console.log(languageName);
    localStorage.setItem('languageName', languageName);
    this.translate.use(languageName);

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

}
