import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {LoginService} from "../../domain/user/login/login.service";
import {EventService} from "../../infrastructure/event/event.service";
import {ThemeService} from "../../infrastructure/theme/theme.service";
import {CHANGE_THEME_EVENT, RELOAD_MENU_EVENT} from "../../infrastructure/event/event.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() active: boolean = false;
  @Output() menuClick: EventEmitter<any> = new EventEmitter();

  items: MenuItem[] = [];
  darkSwitch: boolean = false;

  constructor(public loginService: LoginService,
              private eventService: EventService,
              private themeService: ThemeService) {

    this.eventService
      .getEvent()
      .subscribe((value) => this.eventRecognizer(value));

    this.reloadThemeSwitch();
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  changeTheme() {
    this.themeService.changeTheme(this.darkSwitch);
  }

  loadMenu() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Sign out',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: '/',
        command: () => this.loginService.logout()
      },
    ]
  }

  reloadThemeSwitch() {
    this.darkSwitch = this.themeService.getDarkThemeStatus();
  }

  private eventRecognizer(event: string) {

    if (!event) {
      return;
    }

    switch (event) {
      case RELOAD_MENU_EVENT:
        this.loadMenu();
        break;
      case CHANGE_THEME_EVENT:
        this.reloadThemeSwitch();
        break;
      default:
        break;
    }
  }
}
