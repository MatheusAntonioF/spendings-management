import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreditCardRepositoryContract } from '../contract/credit-card-repository.contract';
import { creditCardExceptions } from './exceptions/credit-card.exceptions';

@Injectable()
export class DeleteCreditCardUseCase {
  constructor(
    @Inject('CreditCardRepository')
    private readonly creditCardRepository: CreditCardRepositoryContract,
  ) {}

  async execute(creditCardId: string): Promise<void> {
    try {
      await this.creditCardRepository.delete(creditCardId);
    } catch (error) {
      throw new HttpException(
        creditCardExceptions.FAIL_TO_DELETE_CREDIT_CARD,
        400,
      );
    }
  }
}
