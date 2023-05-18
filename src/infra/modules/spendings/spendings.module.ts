import { Module } from '@nestjs/common';
import { SpendingController } from './controllers/spendings.controller';

@Module({
  controllers: [SpendingController],
})
export class SpendingsModule {}
