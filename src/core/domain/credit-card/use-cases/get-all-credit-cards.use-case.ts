import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreditCardRepositoryContract } from '../contract/credit-card-repository.contract';
import { creditCardExceptions } from './exceptions/credit-card.exceptions';

@Injectable()
export class GetAllCreditCardsUseCase {
  constructor(
    @Inject('CreditCardRepository')
    private readonly creditCardRepository: CreditCardRepositoryContract,
  ) {}

  async execute() {
    try {
      const creditCards = await this.creditCardRepository.findAll();

      return creditCards;
    } catch (error) {
      throw new HttpException(
        creditCardExceptions.FAIL_TO_GET_ALL_CREDIT_CARDS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
