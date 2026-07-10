# Connect People

Angular 20 registration and community-directory application. It includes a responsive registration form, 360 generated people records, search and pagination, form validation, and Razorpay Checkout integration.

## Run it

Install Node.js 20.19+ (or 22.12+) and then run:

```bash
npm install
npm start
```

## Razorpay integration

The browser calls two backend endpoints so no Razorpay secret is exposed:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/payments/create-order` | Validate the registration, create a Razorpay order for ₹49900 paise, and return `{ key, orderId, amount, currency }`. |
| `POST /api/payments/verify` | Verify `razorpay_signature` using your Razorpay key secret, then save the registration and payment. |

Use the Razorpay test key while developing. The form only shows the success state after the backend verification endpoint returns successfully.
