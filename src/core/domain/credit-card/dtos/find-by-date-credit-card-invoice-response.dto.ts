import { CreditCardInvoice } from '../credit-card-invoice.entity';

interface CategoryMostExpensive {
  categoryId: string;
  value: number;
}

export interface FindByDateCreditCardInvoiceResponseDTO {
  invoice: CreditCardInvoice;
  categoryMostExpensive: CategoryMostExpensive;
}
