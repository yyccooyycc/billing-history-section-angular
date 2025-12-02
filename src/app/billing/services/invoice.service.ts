import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly http = inject(HttpClient);

  // TODO: switch to real API (ex: environment.apiBaseUrl + '/invoices')
  private readonly apiUrl = '/api/invoices';

  getInvoices(): Observable<Invoice[]> {
    // this.http.get<Invoice[]>(this.apiUrl)
    const mockData: Invoice[] = [
      {
        id: 'inv_2024_03_01',
        date: '2024-03-01',
        status: 'paid',
        amount: 10,
        currency: 'USD',
        plan: 'Basic plan',
        downloadUrl: '/assets/invoices/inv_2024_03_01.pdf',
      },
      {
        id: 'inv_2024_02_01',
        date: '2024-02-01',
        status: 'paid',
        amount: 10,
        currency: 'USD',
        plan: 'Basic plan',
        downloadUrl: '/assets/invoices/inv_2024_02_01.pdf',
      },
      {
        id: 'inv_2024_01_01',
        date: '2024-01-01',
        status: 'pending',
        amount: 10,
        currency: 'USD',
        plan: 'Basic plan',
        downloadUrl: '/assets/invoices/inv_2024_01_01.pdf',
      },
      {
        id: 'inv_2023_12_01',
        date: '2023-12-01',
        status: 'paid',
        amount: 10,
        currency: 'USD',
        plan: 'Basic plan',
        downloadUrl: '/assets/invoices/inv_2023_12_01.pdf',
      },
    ];

    return of(mockData).pipe(delay(500));
  }
}
