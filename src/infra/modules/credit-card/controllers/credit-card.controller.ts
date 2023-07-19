import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { CreateCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/create-credit-card.use-case';
import { CreditCardMapper } from '../mappers/credit-card.mapper';
import { DeleteCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/delete-credit-card.use-case';
import { GetAllCreditCardsUseCase } from 'src/core/domain/credit-card/use-cases/get-all-credit-cards.use-case';

@Controller('credit-card')
export class CreditCardController {
  constructor(
    private readonly getAllCreditCardsUseCase: GetAllCreditCardsUseCase,
    private readonly createCreditCardUseCase: CreateCreditCardUseCase,
    private readonly deleteCreditCardUseCase: DeleteCreditCardUseCase,
  ) {}

  @Get()
  async findAll() {
    const creditCards = await this.getAllCreditCardsUseCase.execute();

    return creditCards.map(CreditCardMapper.toHttp);
  }

  @Post()
  async create(@Body() createCreditCardDto: CreateCreditCardDto) {
    const createdCreditCard = await this.createCreditCardUseCase.execute(
      createCreditCardDto,
    );

    return CreditCardMapper.toHttp(createdCreditCard);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteCreditCardUseCase.execute(id);
  }
}
