import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {EventService} from "../event/event.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CHECK_LOGIN_EVENT} from "../event/event.model";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient, private eventService: EventService) {
  }

  get(apiUrl: string, params?: HttpParams, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.get(apiUrl, {responseType: 'json', params, headers}).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.eventService.sendEvent(CHECK_LOGIN_EVENT);
        }
        return of([]);
      })
    );
  }

  getWithPathVariable(apiUrl: string, pathVariable: string, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.get(`${apiUrl}/${pathVariable}`, {responseType: 'json', headers});
  }

  post(apiUrl: string, body = {}, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.post(apiUrl, body, {responseType: 'json', headers});
  }

  postWithPathVariable(apiUrl: string, pathVariable: string, body = {}, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.post(`${apiUrl}/${pathVariable}`, body, {responseType: 'json', headers});
  }

  put(apiUrl: string, body: any, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.put(apiUrl, body, {responseType: 'json', headers});
  }

  putWithPathVariable(apiUrl: string, pathVariable: string, body = {}, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.put(`${apiUrl}/${pathVariable}`, body, {responseType: 'json', headers});
  }

  delete(apiUrl: string, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.delete(apiUrl, {responseType: 'json', headers});
  }

  deleteWithPathVariable(apiUrl: string, pathVariable: string, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.delete(`${apiUrl}/${pathVariable}`, {responseType: 'json', headers});
  }

  patchWithPathVariable(apiUrl: string, pathVariable: string, headers: HttpHeaders = this.headers): Observable<any> {
    return this.httpClient.patch(`${apiUrl}/${pathVariable}`, {responseType: 'json', headers});
  }
}
