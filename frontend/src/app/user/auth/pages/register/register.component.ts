import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  roles: string[] = ['student', 'teacher'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['student']
    });
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    const { username, password, password2, role } = this.registerForm.value;
    this.error = null;

    try {
      const response = await this.authService.register({ username, password, password2, role });

      if (response?.message === 'User created successfully') {
        this.router.navigate(['/login']);
      }

    } catch (err: any) {
      const errors = err?.error;

      if (errors?.non_field_errors) {
        this.error = errors.non_field_errors[0];
      } else if (errors?.username) {
        this.error = errors.username[0];
      } else {
        this.error = 'An unexpected error occurred.';
      }
    }
  }

}
