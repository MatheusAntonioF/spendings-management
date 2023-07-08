import { CreditCardInvoice } from '../credit-card-invoice.entity';
import { FindByDateCreditCardInvoiceDTO } from '../dtos/find-by-date-credit-card-invoice.dto';

export interface CreditCardInvoiceRepositoryContract {
  findByDate(
    queries: FindByDateCreditCardInvoiceDTO,
  ): Promise<CreditCardInvoice>;
  create(data: CreditCardInvoice): Promise<void>;
}
