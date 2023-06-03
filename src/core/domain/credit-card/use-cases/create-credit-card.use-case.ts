import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreditCardRepositoryContract } from '../contract/credit-card-repository.contract';
import { CreditCard, CreditCardProps } from '../credit-card.entity';
import { creditCardExceptions } from './exceptions/credit-card.exceptions';

@Injectable()
export class CreateCreditCardUseCase {
  constructor(
    @Inject('CreditCardRepository')
    private readonly creditCardRepository: CreditCardRepositoryContract,
  ) {}

  async execute({ name, color }: CreditCardProps): Promise<CreditCard> {
    try {
      const creditCard = new CreditCard({ name, color });

      await this.creditCardRepository.create(creditCard);

      return creditCard;
    } catch (error) {
      throw new HttpException(
        creditCardExceptions.FAIL_TO_CREATE_CREDIT_CARD,
        400,
      );
    }
  }
}
