import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./billing/components/payment-history/payment-history').then(
        (m) => m.PaymentHistoryComponent
      ),
  },
];
