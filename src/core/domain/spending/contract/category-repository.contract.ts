import { Category } from '../category.entity';

export interface CategoryRepositoryContract {
  create(data: Category): Promise<void>;
}
