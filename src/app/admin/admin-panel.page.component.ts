import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

type RegistrationRow = {
  id: string | number;
  createdAt: string;
  fullName: string;
  mobile: string;
  age: number;
  gender: string;
  memberType: string;
  amount: number;
  photoName: string;
  status: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
};

@Component({
  selector: 'app-admin-panel-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.page.component.html',
  styleUrls: ['./admin-panel.page.component.css']
})
export class AdminPanelPageComponent {
  readonly registrations = signal<RegistrationRow[]>([]);
  readonly isLoading = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    effect(() => {
      const token = localStorage.getItem('mandal_admin_token');
      if (!token) this.router.navigateByUrl('/admin');
      else this.load(token);
    });
  }

  load(token: string) {
    this.isLoading.set(true);
    this.http
      .get<{ registrations: RegistrationRow[] }>('/api/admin/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe({
        next: (res: any) => {
          this.registrations.set(res?.registrations ?? []);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          localStorage.removeItem('mandal_admin_token');
          this.router.navigateByUrl('/admin');
        }
      });
  }

  logout() {
    localStorage.removeItem('mandal_admin_token');
    this.router.navigateByUrl('/admin');
  }
}

