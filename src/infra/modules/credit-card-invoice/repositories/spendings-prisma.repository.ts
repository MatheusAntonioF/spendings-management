import { Injectable } from '@nestjs/common';
import { SpendingsRepositoryContract } from 'src/core/domain/spending/contract/spendings-repository.contract';
import { PrismaService } from '../../database/prisma.service';
import { SpendingMapper } from '../mappers/spendings.mapper';
import { Spending } from 'src/core/domain/spending/spending.entity';

@Injectable()
export class SpendingsPrismaRepository implements SpendingsRepositoryContract {
  constructor(private prisma: PrismaService) {}

  async createMany(data: Spending[]) {
    const prismaSpendings = data.map((spending) =>
      SpendingMapper.toPrisma(spending),
    );
    await this.prisma.spending.createMany({ data: prismaSpendings });
  }
}
