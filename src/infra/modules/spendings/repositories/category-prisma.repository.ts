import { Injectable } from '@nestjs/common';
import { Category } from 'src/core/domain/spending/category.entity';
import { CategoryRepositoryContract } from 'src/core/domain/spending/contract/category-repository.contract';
import { CategoryMapper } from '../mappers/category.mapper';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepositoryContract {
  constructor(private prisma: PrismaService) {}

  async create(data: Category): Promise<void> {
    const prismaCategory = CategoryMapper.toPrisma(data);

    await this.prisma.category.create({ data: prismaCategory });
  }
}
