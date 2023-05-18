import { Module } from '@nestjs/common';
import { SpendingsModule } from './infra/modules/spendings/spendings.module';

@Module({
  imports: [SpendingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
