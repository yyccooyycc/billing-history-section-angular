import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-payment-history',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-history.html',
  styleUrl: './payment-history.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PaymentHistoryComponent {
  private readonly invoiceService = inject(InvoiceService);
  private readonly toast = inject(ToastService);

  // ---- UI State ----
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly invoices = signal<Invoice[]>([]);

  constructor() {
    this.loadInvoices();

    effect(() => {
      const msg = this.error();
      if (msg) {
        this.toast.show(msg);
      }
    });
  }

  private loadInvoices(): void {
    this.loading.set(true);
    this.error.set(null);

    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('There was a problem, try again later.');
      },
    });
  }

  onRetry(): void {
    this.loadInvoices();
  }

  onDownload(invoice: Invoice): void {
    window.open(invoice.invoice_url, '_blank');
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);

    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  formatAmount(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  formatPlan(plan: Invoice['plan']): string {
    return plan.charAt(0).toUpperCase() + plan.slice(1) + ' plan';
  }
}
