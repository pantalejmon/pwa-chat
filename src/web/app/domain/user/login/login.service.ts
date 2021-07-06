import {Injectable} from '@angular/core';
import {UserDto} from "../user.model";
import {RestService} from "../../../infrastructure/http/rest.service";
import {EventService} from "../../../infrastructure/event/event.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'api/auth';
  private readonly STORAGE_USER_PATH = 'user';

  private user: UserDto;

  constructor(private restService: RestService,
              private eventService: EventService,
              private httpClient: HttpClient,
              private router: Router) {
    this.loadUserInfo();

    this.eventService
      .getEvent()
      .pipe(filter(value => value && value.text === 'check-login'))
      .subscribe(() => this.doCheckLogin());
  }

  loadUserInfo() {
    this.info().subscribe(
      (user: UserDto) => this.doAfterLoadUserInfo(user),
      () => this.cleanUserInfo());
  }

  authenticate(username: string, password: string): Observable<any> {
    const loginFormData = {username, password};
    return this.restService.post(this.API, loginFormData);
  }

  logout() {
    return this.restService
      .get(`${this.API}/logout`)
      .subscribe(() => this.doAfterLogout());
  }

  info(): Observable<any> {
    return this.httpClient.get(this.API);
  }

  getLogged(): UserDto {
    return this.user ?? JSON.parse(localStorage.getItem(this.STORAGE_USER_PATH)) ?? null;
  }

  private cleanUserInfo() {
    this.user = null;
    localStorage.removeItem(this.STORAGE_USER_PATH);
  }

  private doCheckLogin() {
    if (!!this.user) {
      this.loadUserInfo();
      window.location.reload();
    }
  }

  private doAfterLogout() {
    this.cleanUserInfo();
    this.router.navigate(['/']);
  }

  private doAfterLoadUserInfo(user: UserDto) {
    this.user = new UserDto(user);
    localStorage.setItem(this.STORAGE_USER_PATH, JSON.stringify(this.user));
  }
}
