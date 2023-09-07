import { CreditCardInvoice } from '../credit-card-invoice.entity';
import { FindByDateCreditCardInvoiceResponseDTO } from '../dtos/find-by-date-credit-card-invoice-response.dto';
import { FindByDateCreditCardInvoiceDTO } from '../dtos/find-by-date-credit-card-invoice.dto';

export interface CreditCardInvoiceRepositoryContract {
  findByDate(
    queries: FindByDateCreditCardInvoiceDTO,
  ): Promise<FindByDateCreditCardInvoiceResponseDTO>;
  create(data: CreditCardInvoice): Promise<void>;
}
