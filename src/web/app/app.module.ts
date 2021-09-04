import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPanelComponent} from './domain/user/login/login-panel/login-panel.component';
import {HeaderComponent} from './ui/header/header.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoginViewComponent} from './domain/user/login/login-view/login-view.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {RegistrationPanelComponent} from './domain/user/registration/registration-panel/registration-panel.component';
import {RegistrationViewComponent} from './domain/user/registration/registration-view/registration-view.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {HomeComponent} from "./domain/home/home.component";
import {MenuComponent} from './ui/menu/menu.component';
import {PanelMenuModule} from "primeng/panelmenu";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    HeaderComponent,
    LoginViewComponent,
    RegistrationPanelComponent,
    RegistrationViewComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    RippleModule,
    ReactiveFormsModule,
    ToastModule,
    PanelMenuModule,
    PanelModule,
    MenuModule,
    MessagesModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
