import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CategoryRepositoryContract } from '../contract/category-repository.contract';
import { categoryExceptions } from './exceptions/category.exception';
import { Category, CategoryProps } from '../category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepositoryContract,
  ) {}

  async execute({ name, color, keyMapping }: CategoryProps) {
    try {
      const category = new Category({ name, color, keyMapping });

      await this.categoryRepository.create(category);

      return category;
    } catch (error) {
      throw new HttpException(categoryExceptions.FAIL_TO_CREATE_CATEGORY, 400);
    }
  }
}
