import { Spending } from 'src/core/domain/spending/spending.entity';
import { Spending as PrismaSpending } from '@prisma/client';

export class SpendingMapper {
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
