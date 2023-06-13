import { Module } from '@nestjs/common';
import { SpendingController } from './controllers/spendings.controller';
import { ProcessCSVService } from './services/processCsvService';
import { PrismaModule } from '../database/prisma.module';
import { CategoryController } from './controllers/category.controller';
import { CategoryPrismaRepository } from './repositories/category-prisma.repository';
import { CreateCategoryUseCase } from 'src/core/domain/spending/use-cases/create-category.use-case';
import { CreditCardModule } from '../credit-card/credit-card.module';

@Module({
  imports: [PrismaModule, CreditCardModule],
  controllers: [SpendingController, CategoryController],
  providers: [
    ProcessCSVService,
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    CreateCategoryUseCase,
  ],
})
export class SpendingsModule {}
