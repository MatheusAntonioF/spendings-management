import { Module } from '@nestjs/common';
import { SpendingController } from './controllers/spendings.controller';
import { ProcessCSVService } from './services/process-csv-service';
import { PrismaModule } from '../database/prisma.module';
import { CategoryController } from './controllers/category.controller';
import { CategoryPrismaRepository } from './repositories/category-prisma.repository';
import { CreateCategoryUseCase } from 'src/core/domain/spending/use-cases/create-category.use-case';
import { CreditCardModule } from '../credit-card/credit-card.module';
import { CreateManySpendingsUseCase } from 'src/core/domain/spending/use-cases/create-many-spendings.use-case';
import { SpendingsPrismaRepository } from './repositories/spendings-prisma.repository';

@Module({
  imports: [PrismaModule, CreditCardModule],
  controllers: [SpendingController, CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    {
      provide: 'SpendingsRepository',
      useClass: SpendingsPrismaRepository,
    },
    CreateCategoryUseCase,
    ProcessCSVService,
    CreateManySpendingsUseCase,
  ],
})
export class SpendingsModule {}
