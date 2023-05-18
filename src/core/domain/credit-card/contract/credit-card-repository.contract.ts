import { CreditCard, CreditCardProps } from '../credit-card.entity';

export interface CreditCardRepositoryContract {
  create(data: CreditCardProps): Promise<CreditCard>;
  delete(id: string): Promise<void>;
}
