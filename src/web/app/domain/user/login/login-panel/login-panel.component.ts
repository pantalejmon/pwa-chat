import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../infrastructure/notification/toast.service";
import {UrlRedirectService} from "../../../../infrastructure/http/url-redirect.service";

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  loginForm: FormGroup = null;

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private urlRedirectService: UrlRedirectService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  tryLogin(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.authenticate(username, password).subscribe(
      () => this.doAfterLogin(),
      () => this.toastService.showError('Login error'));
  }

  private getRedirectUrl() {
    const url = this.urlRedirectService.getUrl();
    if (url) {
      this.urlRedirectService.cleanUrl();
      return url;
    }
    return null;
  }

  private async doAfterLogin() {
    await this.loginService.info().toPromise();
    const redirectUrl = this.getRedirectUrl() ?? '/home';
    this.loginService.loadUserInfo();
    await this.router.navigate([redirectUrl]);
    setTimeout(() => this.router.navigate([redirectUrl]));
  }
}
