import { CreditCard } from '../credit-card.entity';

export interface CreditCardRepositoryContract {
  findById(id: string): Promise<CreditCard>;
  create(data: CreditCard): Promise<void>;
  delete(id: string): Promise<void>;
}
