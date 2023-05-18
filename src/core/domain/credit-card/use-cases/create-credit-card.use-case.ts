import { CreditCard, CreditCardProps } from '../credit-card.entity';
import { CreditCardRepositoryContract } from '../repositories/credit-card-repository.contract';

export class CreateCreditCardUseCase {
  constructor(
    private readonly creditCardRepository: CreditCardRepositoryContract,
  ) {}

  async execute(creditCard: CreditCardProps): Promise<CreditCard> {
    try {
      const createdCreditCard = await this.creditCardRepository.create(
        creditCard,
      );

      return createdCreditCard;
    } catch (error) {
      console.error(error);
    }
  }
}
