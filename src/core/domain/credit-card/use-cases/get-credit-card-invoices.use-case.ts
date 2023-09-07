import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreditCardInvoiceRepositoryContract } from '../contract/credit-card-invoice.repository.contract';
import { FindByDateCreditCardInvoiceDTO } from '../dtos/find-by-date-credit-card-invoice.dto';
import { CreditCardInvoice } from '../credit-card-invoice.entity';

interface GetCreditCardInvoicesUseCaseResponse {
  details: {
    total: number;
    average: number;
    categoryMostExpensive: {
      name: string;
      value: number;
    };
  };
  invoices: CreditCardInvoice;
}

@Injectable()
export class GetCreditCardInvoicesUseCase {
  constructor(
    @Inject('CreditCardInvoiceRepository')
    private readonly creditCardInvoiceRepository: CreditCardInvoiceRepositoryContract,
  ) {}

  async execute({
    date,
  }: FindByDateCreditCardInvoiceDTO): Promise<GetCreditCardInvoicesUseCaseResponse> {
    try {
      const { categoryMostExpensive, invoice } =
        await this.creditCardInvoiceRepository.findByDate({ date });

      let total = 0;
      let categoryMostExpensiveName = '';

      for (const spending of invoice.spendings) {
        total += spending.price;

        if (spending.category.id === categoryMostExpensive.categoryId) {
          categoryMostExpensiveName = spending.category.name;
        }
      }

      const priceAverage = total / invoice.spendings.length;

      return {
        details: {
          total,
          average: priceAverage,
          categoryMostExpensive: {
            name: categoryMostExpensiveName,
            value: categoryMostExpensive.value,
          },
        },
        invoices: invoice,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao consultar fatura do cartão de crédito',
        400,
      );
    }
  }
}
