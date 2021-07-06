import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlRedirectService {

  private urlToRedirect: string = null;

  constructor() {
  }

  public saveUrl(url: string): void {
    this.urlToRedirect = url;
  }

  public getUrl(): string {
    return this.urlToRedirect;
  }

  public cleanUrl(): void {
    this.urlToRedirect = null;
  }
}
