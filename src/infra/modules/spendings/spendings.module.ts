import { Module } from '@nestjs/common';
import { SpendingController } from './controllers/spendings.controller';
import { ProcessCSVService } from './services/processCsvService';

@Module({
  controllers: [SpendingController],
  providers: [ProcessCSVService],
})
export class SpendingsModule {}
