import { Spending } from 'src/core/domain/spending/spending.entity';
import { Spending as PrismaSpending } from '@prisma/client';
import { CategoryMapper } from './category.mapper';

export class SpendingMapper {
  static toHttp(spending: Spending) {
    const { id, name, price, createdAt, purchaseDate, category } = spending;

    const spendingResponse = {
      id,
      name,
      price,
      createdAt,
      purchaseDate,
      category: CategoryMapper.toHttp(category),
    };

    return spendingResponse;
  }

  static toPrisma(spending: Spending) {
    const {
      id,
      name,
      price,
      category,
      createdAt,
      purchaseDate,
      creditCardInvoiceId,
    } = spending;

    const prismaSpending: PrismaSpending = {
      id,
      name,
      price,
      categoryId: category.id,
      createdAt,
      purchaseDate,
      currentInstallment: 0,
      totalInstallments: 0,
      creditCardInvoiceId,
    };

    return prismaSpending;
  }
}
