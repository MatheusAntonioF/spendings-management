import { Module } from '@nestjs/common';
import { CreditCardInvoiceModule } from './infra/modules/credit-card-invoice/credit-card-invoice.module';
import { CreditCardModule } from './infra/modules/credit-card/credit-card.module';
import { PrismaModule } from './infra/modules/database/prisma.module';

@Module({
  imports: [PrismaModule, CreditCardModule, CreditCardInvoiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
