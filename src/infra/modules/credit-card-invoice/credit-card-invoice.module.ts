import { Module } from '@nestjs/common';
import { CreditCardInvoiceController } from './controllers/credit-card-invoice.controller';
import { ProcessCSVService } from './services/process-csv-service';
import { PrismaModule } from '../database/prisma.module';
import { CategoryController } from './controllers/category.controller';
import { CategoryPrismaRepository } from './repositories/category-prisma.repository';
import { CreateCategoryUseCase } from 'src/core/domain/spending/use-cases/create-category.use-case';
import { CreditCardModule } from '../credit-card/credit-card.module';
import { CreateManySpendingsUseCase } from 'src/core/domain/spending/use-cases/create-many-spendings.use-case';
import { SpendingsPrismaRepository } from './repositories/spendings-prisma.repository';
import { CreditCardInvoicePrismaRepository } from './repositories/credit-card-invoice.repository';
import { GetCreditCardInvoicesUseCase } from 'src/core/domain/credit-card/use-cases/get-credit-card-invoices.use-case';

@Module({
  imports: [PrismaModule, CreditCardModule],
  controllers: [CreditCardInvoiceController, CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryPrismaRepository,
    },
    {
      provide: 'SpendingsRepository',
      useClass: SpendingsPrismaRepository,
    },
    {
      provide: 'CreditCardInvoiceRepository',
      useClass: CreditCardInvoicePrismaRepository,
    },
    CreateCategoryUseCase,
    ProcessCSVService,
    CreateManySpendingsUseCase,
    GetCreditCardInvoicesUseCase,
  ],
})
export class CreditCardInvoiceModule {}
