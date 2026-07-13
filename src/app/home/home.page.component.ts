import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.page.component.html'
})

export class HomePageComponent {
  readonly menuOpen = signal(false);
  readonly activeSeva = signal<string | null>(null);

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  chooseSeva(seva: string) {
    this.activeSeva.set(seva);
  }

  openRegister() {
    this.router.navigate(['/register']);
  }

  // Register modal was moved to /register route.
  // Keep only methods used by the homepage template.
  registerOpen() {
    return false;
  }
  closeRegister() {}
  registered() {
    return false;
  }
  onPhotoChange() {}
  pay() {}
  fetchMyRegistration() {}
  fee() {
    return 0;
  }
  invalid() {
    return false;
  }
}

