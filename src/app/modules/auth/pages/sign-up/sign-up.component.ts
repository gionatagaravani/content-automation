import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { showToast } from 'src/app/shared/utils/alert';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, ButtonComponent, NgClass, NgIf],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly _formBuilder: FormBuilder, private readonly auth: AuthService, private readonly router: Router) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      conf_pass: ['', Validators.required],
    });
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { name, surname, email, password, conf_pass } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (password !== conf_pass) {
      showToast('error', 'The two passwords must match!');
    }

    this.auth.signUp(name, surname, email, password).subscribe((resp) => {
      showToast('success', `Welcome ${resp?.name ?? 'back'}!`).then(() => this.router.navigate(['/']));
    })
  }
}
