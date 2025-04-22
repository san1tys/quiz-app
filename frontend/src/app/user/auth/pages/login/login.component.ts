import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordInputComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.error = null;

    try {
      await this.authService.login(username, password);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      const errors = err?.error;

      if (errors?.non_field_errors) {
        this.error = errors.non_field_errors[0];
      } else if (errors?.username) {
        this.error = errors.username[0];
      } else {
        this.error = 'Invalid credentials. Please try again.';
      }
    }
  }

}
