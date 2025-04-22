import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { validateEmail } from '../../../../shared/utils/helper';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, PasswordInputComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: []
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    if (!validateEmail(email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    try {
      const response = await this.userService.login(email, password);
      this.userService.setUser(response.user);
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err?.error?.message || 'An unexpected error occurred.';
    }
  }
}
