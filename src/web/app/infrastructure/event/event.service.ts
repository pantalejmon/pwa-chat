import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private subject = new Subject<any>();

  sendEvent(event: string) {
    this.subject.next({name: event});
  }

  clearEvent() {
    this.subject.next();
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
