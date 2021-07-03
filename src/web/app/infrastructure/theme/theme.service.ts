import {Injectable} from '@angular/core';
import {EventService} from "../event/event.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly lightThemeUrl = 'assets/styles/light.css';
  readonly darkThemeUrl = 'assets/styles/dark.css';

  darkSwitch = false;

  constructor(private cookieService: CookieService,
              private eventService: EventService) {
    this.changeTheme(this.cookieService.check('dark'));
  }

  changeTheme(dark: boolean) {
    const themeElement = document.getElementById('theme-link');
    if (dark) {
      this.cookieService.set('dark', 'true', 365 * 5);
      themeElement.setAttribute('href', this.darkThemeUrl);
    } else {
      themeElement.setAttribute('href', this.lightThemeUrl);
      this.cookieService.delete('dark');
    }
    this.eventService.sendEvent('theme');
  }

  getDarkThemeStatus() {
    return this.cookieService.check('dark');
  }
}
