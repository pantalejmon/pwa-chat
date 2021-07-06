import {Injectable} from '@angular/core';
import {EventService} from "../event/event.service";
import {CookieService} from "ngx-cookie-service";
import {CHANGE_THEME_EVENT} from "../event/event.model";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly LIGHT_THEME_URL = 'assets/styles/light.css';
  private readonly DARK_THEME_URL = 'assets/styles/dark.css';
  private readonly COOKIE_THEME_NAME = 'dark'

  darkSwitch = false;

  constructor(private cookieService: CookieService,
              private eventService: EventService) {
    this.changeTheme(this.cookieService.check(this.COOKIE_THEME_NAME));
  }

  changeTheme(dark: boolean) {
    const themeElement = document.getElementById('theme-link');
    if (dark) {
      this.cookieService.set(this.COOKIE_THEME_NAME, 'true', 365 * 5);
      themeElement.setAttribute('href', this.DARK_THEME_URL);
    } else {
      themeElement.setAttribute('href', this.LIGHT_THEME_URL);
      this.cookieService.delete(this.COOKIE_THEME_NAME);
    }
    this.eventService.sendEvent(CHANGE_THEME_EVENT);
  }

  getDarkThemeStatus() {
    return this.cookieService.check(this.COOKIE_THEME_NAME);
  }
}
