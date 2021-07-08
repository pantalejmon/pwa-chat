import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private subject = new Subject<any>();

  sendEvent(event: string) {
    this.subject.next(event);
  }

  clearEvent() {
    this.subject.next(null);
  }

  getEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
