import { Injectable } from '@nestjs/common';
import { CreditCardInvoiceRepositoryContract } from '../../../../core/domain/credit-card/contract/credit-card-invoice.repository.contract';
import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import { PrismaService } from '../../database/prisma.service';
import { CreditCardInvoiceMapper } from '../mappers/credit-card-invoice.mapper';
import { FindByDateCreditCardInvoiceDTO } from 'src/core/domain/credit-card/dtos/find-by-date-credit-card-invoice.dto';
import { endOfMonth, startOfMonth } from 'date-fns';
import { FindByDateCreditCardInvoiceResponseDTO } from 'src/core/domain/credit-card/dtos/find-by-date-credit-card-invoice-response.dto';

@Injectable()
export class CreditCardInvoicePrismaRepository
  implements CreditCardInvoiceRepositoryContract
{
  constructor(private prisma: PrismaService) {}

  async findByDate({
    date,
  }: FindByDateCreditCardInvoiceDTO): Promise<FindByDateCreditCardInvoiceResponseDTO> {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    const prismaCreditCardInvoice =
      await this.prisma.creditCardInvoice.findFirst({
        where: {
          date: {
            gt: startDate,
            lt: endDate,
          },
        },
        include: {
          creditCard: true,
          spendings: {
            include: {
              category: true,
            },
          },
        },
      });

    const spendingIDs = prismaCreditCardInvoice.spendings.map(({ id }) => id);

    const groupedCategoriesBySumPrice = await this.prisma.spending.groupBy({
      by: ['categoryId'],
      _sum: {
        price: true,
      },
      where: {
        id: {
          in: spendingIDs,
        },
        createdAt: {
          gt: startDate,
          lt: endDate,
        },
      },
    });

    const categoryIdMostExpensive = groupedCategoriesBySumPrice.sort(
      (previousItem, currentItem) => {
        if (previousItem._sum.price > currentItem._sum.price) {
          return -1;
        }

        if (previousItem._sum.price < currentItem._sum.price) {
          return 1;
        }

        if (previousItem._sum.price === currentItem._sum.price) {
          return 0;
        }
      },
    )[0];

    return {
      invoice: CreditCardInvoiceMapper.toDomain(prismaCreditCardInvoice),
      categoryMostExpensive: {
        value: categoryIdMostExpensive._sum.price,
        categoryId: categoryIdMostExpensive.categoryId,
      },
    };
  }

  async create(data: CreditCardInvoice) {
    const prismaCreditCardInvoice = CreditCardInvoiceMapper.toPrisma(data);

    const { id, date, creditCardId, createdAt } = prismaCreditCardInvoice;

    await this.prisma.creditCardInvoice.create({
      data: {
        id,
        date,
        creditCardId: creditCardId,
        createdAt,
      },
    });
  }
}
