import { Spending } from '../spending.entity';

export interface SpendingsRepositoryContract {
  createMany(data: Spending[]): Promise<void>;
}
