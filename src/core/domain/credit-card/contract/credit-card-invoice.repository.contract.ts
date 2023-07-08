import { CreditCardInvoice } from '../credit-card-invoice.entity';

export interface CreditCardInvoiceRepositoryContract {
  create(data: CreditCardInvoice): Promise<void>;
}
