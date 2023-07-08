import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/core/domain/spending/use-cases/create-category.use-case';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryMapper } from '../mappers/category.mapper';

@Controller('category')
export class CategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.createCategoryUseCase.execute(
      createCategoryDto,
    );

    return CategoryMapper.toHttp(createdCategory);
  }
}
