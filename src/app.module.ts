import { Module } from '@nestjs/common';
import { SpendingsModule } from './infra/modules/spendings/spendings.module';
import { CreditCardModule } from './infra/modules/credit-card/credit-card.module';
import { PrismaModule } from './infra/modules/database/prisma.module';

@Module({
  imports: [PrismaModule, CreditCardModule, SpendingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
