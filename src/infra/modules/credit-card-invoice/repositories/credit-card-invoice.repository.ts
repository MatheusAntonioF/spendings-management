import { Injectable } from '@nestjs/common';
import { CreditCardInvoiceRepositoryContract } from '../../../../core/domain/credit-card/contract/credit-card-invoice.repository.contract';
import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import { PrismaService } from '../../database/prisma.service';
import { CreditCardInvoiceMapper } from '../mappers/credit-card-invoice.mapper';
import { FindByDateCreditCardInvoiceDTO } from 'src/core/domain/credit-card/dtos/find-by-date-credit-card-invoice.dto';
import { endOfMonth, startOfMonth } from 'date-fns';

@Injectable()
export class CreditCardInvoicePrismaRepository
  implements CreditCardInvoiceRepositoryContract
{
  constructor(private prisma: PrismaService) {}

  async findByDate({ date }: FindByDateCreditCardInvoiceDTO) {
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

    return CreditCardInvoiceMapper.toDomain(prismaCreditCardInvoice);
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
