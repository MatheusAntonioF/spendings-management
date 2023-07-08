import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import {
  CreditCard as PrismaCreditCard,
  CreditCardInvoice as PrismaCreditCardInvoice,
  Spending as PrismaSpending,
} from '@prisma/client';
import { SpendingMapper } from './spendings.mapper';
import { CreditCardMapper } from '../../credit-card/mappers/credit-card.mapper';

interface PrismaCreditCardInvoiceWithSpendings extends PrismaCreditCardInvoice {
  spendings: PrismaSpending[];
  creditCard: PrismaCreditCard;
}

export class CreditCardInvoiceMapper {
  static toPrisma(
    creditCardInvoice: CreditCardInvoice,
  ): PrismaCreditCardInvoiceWithSpendings {
    const { id, creditCard, date, createdAt, spendings } = creditCardInvoice;

    const prismaSpendings = spendings.map(SpendingMapper.toPrisma);
    const prismaCreditCard = CreditCardMapper.toPrisma(creditCard);

    const prismaCreditCardInvoice: PrismaCreditCardInvoiceWithSpendings = {
      id,
      date,
      creditCardId: creditCard.id,
      creditCard: prismaCreditCard,
      createdAt,
      spendings: prismaSpendings,
    };

    return prismaCreditCardInvoice;
  }

  static toDomain(
    prismaCreditCardInvoice: PrismaCreditCardInvoiceWithSpendings,
  ) {
    const { id, date, createdAt, spendings, creditCard } =
      prismaCreditCardInvoice;

    const creditCardInvoice = new CreditCardInvoice(
      {
        date,
        createdAt,
        creditCard: CreditCardMapper.toDomain(creditCard),
        spendings: spendings.map(SpendingMapper.toDomain),
      },
      id,
    );

    return creditCardInvoice;
  }

  static toHttp(creditCardInvoice: CreditCardInvoice) {
    const { id, date, createdAt, spendings, creditCard } = creditCardInvoice;

    const creditCardInvoiceEntity = {
      id,
      date,
      createdAt,
      creditCard: CreditCardMapper.toHttp(creditCard),
      spendings: spendings.map(SpendingMapper.toHttp),
    };

    return creditCardInvoiceEntity;
  }
}
