import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {RestService} from "../../../infrastructure/http/rest.service";
import {HttpParams} from "@angular/common/http";
import {UserDto, UserForm} from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly userApi = 'api/user';

  constructor(public restService: RestService) {
  }

  signup(user: UserForm): Observable<UserDto> {
    return this.restService.post(this.userApi, user);
  }

  emailIsFree(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.restService.get(`${this.userApi}/email`, params);
  }

  usernameIsFree(email: string): Observable<any> {
    const params = new HttpParams().set('username', email);
    return this.restService.get(`${this.userApi}/username`, params);
  }
}
