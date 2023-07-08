import { Injectable } from '@nestjs/common';
import { CreditCardInvoiceRepositoryContract } from '../../../../core/domain/credit-card/contract/credit-card-invoice.repository.contract';
import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import { PrismaService } from '../../database/prisma.service';
import { CreditCardInvoiceMapper } from '../mappers/credit-card-invoice.mapper';

@Injectable()
export class CreditCardInvoicePrismaRepository
  implements CreditCardInvoiceRepositoryContract
{
  constructor(private prisma: PrismaService) {}

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
