import {Component} from '@angular/core';
import {RegistrationService} from "../registration.service";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs/operators";
import {ToastService} from "../../../../infrastructure/notification/toast.service";
import {UserForm} from "../../user.model";

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrls: ['./registration-panel.component.css']
})
export class RegistrationPanelComponent {

  readonly EMAIL_REGEX: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
  readonly PASSWORD_REGEX: RegExp = /^(?=.{6,}$)/;
  readonly PASSWORD_MAX_LENGTH: number = 128;

  registrationForm: FormGroup;
  emailUnique: boolean = null;
  email: string = '';
  usernameUnique: boolean = null;
  username: string = '';

  isSubmitEnabled: boolean = false;

  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastService: ToastService) {

    this.registrationForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX), Validators.maxLength(this.PASSWORD_MAX_LENGTH)]],
        password2: ['', Validators.required]
      },
      {validators: this.passwordsMatchValidator});

    this.registrationForm
      .valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.validateValues(value));
  }

  validateValues(value) {

    if (value.email !== this.email) {
      this.registrationService.emailIsFree(value.email)
        .subscribe(
          (emailUnique) => this.emailUnique = emailUnique,
          () => this.toastService.showError('Connection error'),
          () => this.email = value.email
        );
    }

    if (value.username !== this.username) {
      this.registrationService.usernameIsFree(value.username)
        .subscribe(
          (usernameUnique) => this.usernameUnique = usernameUnique,
          () => this.toastService.showError('Connection error'),
          () => this.username = value.username
        );
    }

    this.tryEnableSubmit();
  }


  register(): void {
    const user = new UserForm(this.registrationForm.value);
    this.registrationService
      .signup(user)
      .subscribe(
        () => this.doAfterSignup(),
        (info) => this.toastService.showError(`signup failed: ${info}`));
  }

  isControlTouchedInvalid(controlName: string) {
    return this.registrationForm.get(controlName).invalid && (this.registrationForm.get(controlName).dirty || this.registrationForm.get(controlName).touched);
  }

  back() {
    window.history.back();
  }

  private passwordsMatchValidator(control: FormGroup):
    ValidationErrors | null {
    const pass1 = control.get('password').value;
    const pass2 = control.get('password2').value;

    return pass1 === pass2 ? null : {password: true};
  }

  private tryEnableSubmit() {
    this.isSubmitEnabled = !this.registrationForm.invalid;
  }

  private doAfterSignup() {
    this.toastService.showSuccess('Signup success');
    this.router.navigate(['']);
  }
}
