import { Category } from 'src/core/domain/spending/category.entity';
import { Category as PrismaCategory } from '@prisma/client';

export class CategoryMapper {
  static toHttp(category: Category) {
    const { id, name, color, createdAt } = category;

    const categoryResponse = { id, name, color, createdAt };

    return categoryResponse;
  }

  static toPrisma(category: Category) {
    const { id, name, color, keyMapping, createdAt } = category;

    const prismaCategory: PrismaCategory = {
      id,
      name,
      color,
      keyMapping,
      createdAt,
    };

    return prismaCategory;
  }
}
