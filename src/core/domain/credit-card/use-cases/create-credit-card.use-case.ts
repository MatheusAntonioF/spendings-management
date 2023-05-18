import { CreditCardRepositoryContract } from '../contract/credit-card-repository.contract';
import { CreditCard, CreditCardProps } from '../credit-card.entity';

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
