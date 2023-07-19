import { CreditCard as PrismaCreditCard } from '@prisma/client';
import { CreditCard } from 'src/core/domain/credit-card/credit-card.entity';

export class CreditCardMapper {
  static toHttp(creditCard: CreditCard) {
    const { id, name, color, createdAt } = creditCard;

    const creditCardResponse = {
      id,
      name,
      color,
      createdAt: new Date(createdAt),
    };

    return creditCardResponse;
  }

  static toPrisma(creditCard: CreditCard): PrismaCreditCard {
    const { id, name, color, createdAt } = creditCard;

    const prismaCreditCard: PrismaCreditCard = {
      id,
      name,
      color,
      createdAt,
    };

    return prismaCreditCard;
  }

  static toDomain(prismaCreditCard: PrismaCreditCard): CreditCard {
    const { id, name, color, createdAt } = prismaCreditCard;

    const creditCard = new CreditCard(
      {
        name,
        color,
        createdAt,
      },
      id,
    );

    return creditCard;
  }
}
