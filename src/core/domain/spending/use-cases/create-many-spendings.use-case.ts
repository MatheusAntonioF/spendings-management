import { Inject, Injectable } from '@nestjs/common';
import { SpendingsRepositoryContract } from '../contract/spendings-repository.contract';
import { Spending, SpendingProps } from '../spending.entity';

interface Input {
  name: string;
  price: number;
  purchaseDate: Date;
}

@Injectable()
export class CreateManySpendingsUseCase {
  constructor(
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: SpendingsRepositoryContract,
  ) {}

  async execute(data: SpendingProps[]) {
    const spendingsToBeCreated = data.map(
      ({
        name,
        price,
        purchaseDate,
        installment,
        category,
        createdAt,
        creditCardInvoiceId,
      }) => {
        return new Spending({
          name,
          price,
          purchaseDate,
          installment,
          category,
          createdAt,
          creditCardInvoiceId,
        });
      },
    );

    await this.spendingsRepository.createMany(spendingsToBeCreated);
  }
}
