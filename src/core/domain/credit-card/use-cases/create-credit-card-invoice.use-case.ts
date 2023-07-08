import { Inject, Injectable } from '@nestjs/common';
import { CreditCardInvoiceRepositoryContract } from '../contract/credit-card-invoice.repository.contract';
import { CreditCardInvoice } from '../credit-card-invoice.entity';

@Injectable()
export class CreateCreditCardInvoiceUseCase {
  constructor(
    @Inject('CreditCardInvoiceRepository')
    private readonly creditCardInvoiceRepository: CreditCardInvoiceRepositoryContract,
  ) {}

  async execute(data: CreditCardInvoice) {}
}
