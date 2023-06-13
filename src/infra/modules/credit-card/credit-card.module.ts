import { Module } from '@nestjs/common';
import { CreateCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/create-credit-card.use-case';
import { CreditCardController } from './controllers/credit-card.controller';
import { CreditCardPrismaRepository } from './repositories/credit-card-prisma.repository';
import { PrismaModule } from '../database/prisma.module';
import { DeleteCreditCardUseCase } from 'src/core/domain/credit-card/use-cases/delete-credit-card.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [CreditCardController],
  providers: [
    {
      provide: 'CreditCardRepository',
      useClass: CreditCardPrismaRepository,
    },
    CreateCreditCardUseCase,
    DeleteCreditCardUseCase,
  ],
  exports: [
    {
      provide: 'CreditCardRepository',
      useClass: CreditCardPrismaRepository,
    },
  ],
})
export class CreditCardModule {}
