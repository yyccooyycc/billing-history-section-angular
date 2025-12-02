export type InvoiceStatus = 'paid' | 'pending';

export interface Invoice {
  id: string;
  date: string;
  status: InvoiceStatus;
  amount: number;
  currency: string;
  plan: string;
  downloadUrl: string;
}
