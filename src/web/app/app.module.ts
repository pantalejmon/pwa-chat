import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './domain/login/login.component';
import {HeaderComponent} from './ui/header/header.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoginViewComponent} from './domain/login-view/login-view.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputSwitchModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    RippleModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
