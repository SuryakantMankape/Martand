import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from './payment.service';
import { MandalRegistration } from './models';

@Component({ selector: 'app-root', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './app.component.html', styleUrl: './app.component.css' })
export class AppComponent {
  readonly menuOpen = signal(false); readonly activeSeva = signal<string | null>(null); readonly registerOpen = signal(false); readonly photoData = signal(''); readonly photoName = signal(''); readonly isPaying = signal(false); readonly registered = signal(false);
  readonly registration = this.fb.nonNullable.group({ fullName: ['', [Validators.required, Validators.minLength(2)]], age: [null as unknown as number, [Validators.required, Validators.min(17), Validators.max(120)]], gender: ['' as 'Female' | 'Male' | 'Other', Validators.required], memberType: ['new' as 'old' | 'new', Validators.required] });
  constructor(private fb: FormBuilder, private payments: PaymentService) {}
  toggleMenu() { this.menuOpen.update(value => !value); } chooseSeva(seva: string) { this.activeSeva.set(seva); } closeMenu() { this.menuOpen.set(false); }
  openRegister() { this.registerOpen.set(true); this.registered.set(false); this.closeMenu(); } closeRegister() { if (!this.isPaying()) this.registerOpen.set(false); }
  fee() { return this.registration.controls.memberType.value === 'old' ? 1800 : 2000; }
  onPhotoChange(event: Event) { const input = event.target as HTMLInputElement; const photo = input.files?.[0]; this.photoData.set(''); this.photoName.set(''); if (!photo) return; if (!photo.type.startsWith('image/') || photo.size > 3 * 1024 * 1024) { input.value = ''; return; } const reader = new FileReader(); reader.onload = () => { this.photoData.set(String(reader.result)); this.photoName.set(photo.name); }; reader.readAsDataURL(photo); }
  pay() { if (this.registration.invalid || !this.photoData()) { this.registration.markAllAsTouched(); return; } this.isPaying.set(true); const values = this.registration.getRawValue(); const payload: MandalRegistration = { ...values, age: Number(values.age), amount: this.fee(), photoData: this.photoData(), photoName: this.photoName() }; this.payments.openCheckout(payload).subscribe({ next: () => { this.isPaying.set(false); this.registered.set(true); }, error: () => { this.isPaying.set(false); alert('Unable to start payment. Please try again.'); }, complete: () => this.isPaying.set(false) }); }
  invalid(name: string) { const control = this.registration.get(name); return !!control && control.invalid && (control.dirty || control.touched); }
}
