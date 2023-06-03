import { Body, Controller, Post } from '@nestjs/common';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { CreateCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/create-credit-card.use-case';
import { CreditCardMapper } from '../mappers/credit-card.mapper';

@Controller('credit-card')
export class CreditCardController {
  constructor(
    private readonly createCreditCardUseCase: CreateCreditCardUseCase,
  ) {}

  @Post()
  async create(@Body() createCreditCardDto: CreateCreditCardDto) {
    const createdCreditCard = await this.createCreditCardUseCase.execute(
      createCreditCardDto,
    );

    const teste = CreditCardMapper.toHttp(createdCreditCard);

    return teste;
  }
}
