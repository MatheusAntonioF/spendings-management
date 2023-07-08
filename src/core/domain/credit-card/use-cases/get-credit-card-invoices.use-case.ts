import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreditCardInvoiceRepositoryContract } from '../contract/credit-card-invoice.repository.contract';
import { FindByDateCreditCardInvoiceDTO } from '../dtos/find-by-date-credit-card-invoice.dto';

@Injectable()
export class GetCreditCardInvoicesUseCase {
  constructor(
    @Inject('CreditCardInvoiceRepository')
    private readonly creditCardInvoiceRepository: CreditCardInvoiceRepositoryContract,
  ) {}

  async execute({ date }: FindByDateCreditCardInvoiceDTO) {
    try {
      const creditCardInvoice =
        await this.creditCardInvoiceRepository.findByDate({ date });

      return creditCardInvoice;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao consultar fatura do cartão de crédito',
        400,
      );
    }
  }
}
