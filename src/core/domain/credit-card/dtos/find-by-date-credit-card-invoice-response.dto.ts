import { CreditCardInvoice } from '../credit-card-invoice.entity';

interface CategoryMostExpensive {
  categoryId: string;
  value: number;
}

export interface FindByDateCreditCardInvoiceResponseDTO {
  invoices: CreditCardInvoice[];
  categoryMostExpensive: CategoryMostExpensive;
}
