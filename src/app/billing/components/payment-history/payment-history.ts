import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-payment-history',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
        this.error.set(
          "We're facing some issues at the moment. Please try again later or contact support."
        );
      },
    });
  }

  onRetry(): void {
    this.loadInvoices();
  }

  onDownload(invoice: Invoice): void {
    // [Stretch] 真實情況會用後端產生 signed URL
    window.open(invoice.downloadUrl, '_blank', 'noopener');
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }
}
