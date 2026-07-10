import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { MandalRegistration } from './models';

declare const Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  openCheckout(registration: MandalRegistration): Observable<void> {
    return this.http.post<{ key: string; orderId: string; amount: number; currency: string }>('/api/payments/create-order', registration).pipe(
      switchMap(order => new Observable<void>(subscriber => {
        const checkout = new Razorpay({
          key: order.key, amount: order.amount, currency: order.currency, order_id: order.orderId,
          name: 'Martand Ganpati Mandal', description: `${registration.memberType === 'old' ? 'Existing' : 'New'} member registration`,
          prefill: { name: registration.fullName }, theme: { color: '#de6923' },
          handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
            this.http.post('/api/payments/verify', { ...response, registration }).subscribe({ next: () => { subscriber.next(); subscriber.complete(); }, error: err => subscriber.error(err) });
          },
          modal: { ondismiss: () => subscriber.complete() }
        });
        checkout.open();
      }))
    );
  }
}
