import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { ParseStepResult, parse } from 'papaparse';
import { parse as dateFnsParse } from 'date-fns';
import { CreditCardRepositoryContract } from 'src/core/domain/credit-card/contract/credit-card-repository.contract';
import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import { Spending } from 'src/core/domain/spending/spending.entity';
import { CategoryRepositoryContract } from 'src/core/domain/spending/contract/category-repository.contract';
import { Category } from 'src/core/domain/spending/category.entity';
interface Input {
  keysToMap: string;
  file: Express.Multer.File;
  creditCardId: string;
}

@Injectable()
export class ProcessCSVService {
  private categories: Category[];
  private creditCardInvoice: CreditCardInvoice;

  constructor(
    @Inject('CreditCardRepository')
    private readonly creditCardRepository: CreditCardRepositoryContract,
    @Inject('CategoryRepository')
    private readonly categoriesRepository: CategoryRepositoryContract,
  ) {}

  async execute({ file, keysToMap, creditCardId }: Input) {
    try {
      const foundCreditCard = await this.creditCardRepository.findById(
        creditCardId,
      );

      if (!foundCreditCard) {
        throw new HttpException('Credit card not found', 400);
      }

      this.categories = await this.categoriesRepository.findAll();

      this.creditCardInvoice = new CreditCardInvoice({
        date: new Date(),
        creditCard: foundCreditCard,
        spendings: [],
      });

      const stream = Readable.from(file.buffer);

      const invoiceToBeCreated = await new Promise<CreditCardInvoice>(
        (resolve, reject) => {
          parse(stream, {
            header: true,
            worker: true,
            step: (results: ParseStepResult<Record<string, string>>) => {
              this.handleStepExecution(results, keysToMap);
            },
            error: (error) => reject(error),
            complete: () => {
              console.log('completed');
              resolve(this.creditCardInvoice);
            },
          });
        },
      );
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  handleStepExecution(
    results: ParseStepResult<Record<string, string>>,
    keysToMap: string,
  ) {
    const rawSpending = this.mappingCsvKeys(results.data, keysToMap);

    const spending = this.parseSpendingData(rawSpending);

    this.creditCardInvoice.addSpending(spending);
  }

  mappingCsvKeys(
    data: Record<string, string>,
    keysToMap: string,
  ): Record<string, any> {
    const parsedKeys: Record<string, string> = JSON.parse(keysToMap);

    const mappedKeys = Object.entries(parsedKeys).reduce(
      (accumulator, currentObj) => {
        const [internalKey, csvKey] = currentObj;

        accumulator[internalKey] = this.parseValue(internalKey, data[csvKey]);
        return accumulator;
      },
      {},
    );

    return mappedKeys;
  }

  parseValue(key: string, value: string) {
    if (key === 'price') {
      const parsedString = String(value).replace(/[^\d]+/g, '');

      return isNaN(Number(parsedString)) ? 0 : Number(parsedString);
    }

    if (key === 'purchaseDate') {
      return dateFnsParse(String(value), 'dd/MM/yyyy', new Date());
    }

    return value;
  }

  getCategoryBySpendingName(spendingName: string): Category {
    let foundCategory = this.categories.find(({ keyMapping }) => {
      const regex = new RegExp(keyMapping.join('|'), 'gmi');

      const isValid = regex.test(spendingName);

      return !!isValid;
    });

    if (!foundCategory) {
      foundCategory = this.categories.find(
        (category) => category.name === 'Outros',
      );
    }

    return foundCategory;
  }

  parseSpendingData(rawCategory: Record<string, any>): Spending {
    const { name, price, purchaseDate } = rawCategory;

    const foundCategory = this.getCategoryBySpendingName(name);

    const spending = new Spending({
      name: String(name),
      price: Number(price),
      purchaseDate: new Date(purchaseDate),
      installment: { currentInstallment: 1, totalInstallments: 0 },
      category: foundCategory,
      creditCardInvoiceId: this.creditCardInvoice.id,
    });

    return spending;
  }
}
