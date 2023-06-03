import { Injectable } from '@nestjs/common';
import { CreditCardRepositoryContract } from 'src/core/domain/credit-card/contract/credit-card-repository.contract';
import { CreditCard } from 'src/core/domain/credit-card/credit-card.entity';
import { PrismaService } from '../../database/prisma.service';
import { CreditCardMapper } from '../mappers/credit-card.mapper';

@Injectable()
class CreditCardPrismaRepository implements CreditCardRepositoryContract {
  constructor(private prisma: PrismaService) {}

  async create(data: CreditCard): Promise<void> {
    const prismaCreditCard = CreditCardMapper.toPrisma(data);
    await this.prisma.creditCard.create({ data: prismaCreditCard });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.creditCard.delete({ where: { id } });
  }
}

export { CreditCardPrismaRepository };
