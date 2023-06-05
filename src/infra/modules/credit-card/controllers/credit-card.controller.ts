import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { CreateCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/create-credit-card.use-case';
import { CreditCardMapper } from '../mappers/credit-card.mapper';
import { DeleteCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/delete-credit-card.use-case';

@Controller('credit-card')
export class CreditCardController {
  constructor(
    private readonly createCreditCardUseCase: CreateCreditCardUseCase,
    private readonly deleteCreditCardUseCase: DeleteCreditCardUseCase,
  ) {}

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
