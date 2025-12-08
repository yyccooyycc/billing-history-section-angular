import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Invoice, InvoiceApiResponse } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://www.greatfrontend.com/api/projects/challenges/account/billing/history';

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<InvoiceApiResponse>(this.apiUrl).pipe(map((res) => res.data));
  }
}
