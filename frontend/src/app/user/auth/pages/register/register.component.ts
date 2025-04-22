import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateEmail } from "../../../../shared/utils/helper"
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, PasswordInputComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    const { name, email, password } = this.registerForm.value;

    if (!validateEmail(email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    this.error = '';

    try {
      const response = await this.userService.register({
        fullname: name,
        email,
        password
      });

      if (response?.error) {
        this.error = response.message || 'An error occurred.';
        return;
      }

      if (response?.user) {
        this.userService.setUser(response.user);
        this.router.navigate(['/dashboard']);
      }

    } catch (err: any) {
      this.error = err?.error?.errors?.[0]?.msg || 'An unexpected error occurred.';
    }
  }
}
