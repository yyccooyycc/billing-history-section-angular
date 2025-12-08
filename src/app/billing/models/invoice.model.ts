export type InvoiceStatus = 'paid' | 'pending' | 'failed';

export interface Invoice {
  created_at: string;
  status: InvoiceStatus;
  amount: number;
  plan: string;
  invoice_url: string;
}

export interface InvoiceApiResponse {
  data: Invoice[];
}
