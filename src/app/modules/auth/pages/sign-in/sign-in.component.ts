import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { showToast } from 'src/app/shared/utils/alert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
    ButtonComponent,
  ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '896279344467-mrafisrb8ata8noglhtcvj6nfcu5tbmh.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large', width: '400px', display: 'flex' }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => console.log);
  }

  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    if (response.credential) {
      console.log('🚀 ~ googleUser.credential:', response.credential)
      fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${response.credential}`).then((res) => console.log(res))
    }  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.auth.signIn(email, password).subscribe((resp) => {
      showToast('success', `Welcome ${resp?.name ?? 'back'}!`).then(() =>
        this._router.navigate(['/'])
      );
    });
  }
}
