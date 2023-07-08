import { Category } from '../spending/category.entity';
import { Spending } from '../spending/spending.entity';
import { CreditCardInvoice } from './credit-card-invoice.entity';
import { CreditCard } from './credit-card.entity';

describe('credit card invoice', () => {
  it('should be able to create a new credit card invoice', () => {
    const creditCard = new CreditCard({
      name: 'random card',
      color: '#7159c1',
    });

    const spending = new Spending({
      name: 'test',
      price: 123,
      purchaseDate: new Date(),
      installment: { currentInstallment: 1, totalInstallments: 2 },
      category: new Category({ name: '', color: '', keyMapping: [] }),
    });

    const creditCardInvoice = new CreditCardInvoice({
      creditCard,
      spendings: [spending],
      date: new Date(),
    });

    expect(creditCardInvoice.id).toBeDefined();
    expect(creditCardInvoice.creditCard).toBeInstanceOf(CreditCard);
    expect(creditCardInvoice.spendings.length).toEqual(1);
  });
});
