import { CreditCard } from '../credit-card.entity';

export interface CreditCardRepositoryContract {
  create(data: CreditCard): Promise<void>;
  delete(id: string): Promise<void>;
}
