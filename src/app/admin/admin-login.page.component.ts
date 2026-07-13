import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.page.component.html',
  styleUrls: ['./admin-login.page.component.css']
})
export class AdminLoginPageComponent {
  readonly isLoggingIn = signal(false);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  invalid(name: string) {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoggingIn.set(true);
    const { username, password } = this.form.getRawValue();

    this.http.post<{ token: string }>('/api/admin/login', { username, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('mandal_admin_token', res?.token);
        this.isLoggingIn.set(false);
        this.router.navigateByUrl('/admin/panel');
      },
      error: () => {
        this.isLoggingIn.set(false);
        alert('Admin login failed. Check username/password.');
      }
    });
  }
}

