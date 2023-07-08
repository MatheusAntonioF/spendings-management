import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { ParseStepResult, parse } from 'papaparse';
import { parse as dateFnsParse } from 'date-fns';
import { CreditCardRepositoryContract } from 'src/core/domain/credit-card/contract/credit-card-repository.contract';
import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import { Spending } from 'src/core/domain/spending/spending.entity';
import { CategoryRepositoryContract } from 'src/core/domain/spending/contract/category-repository.contract';
import { Category } from 'src/core/domain/spending/category.entity';
import { CreditCardInvoiceRepositoryContract } from 'src/core/domain/credit-card/contract/credit-card-invoice.repository.contract';
import { SpendingsRepositoryContract } from 'src/core/domain/spending/contract/spendings-repository.contract';
import { CreditCardInvoiceMapper } from '../mappers/credit-card-invoice.mapper';
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
    @Inject('SpendingsRepository')
    private readonly spendingsRepository: SpendingsRepositoryContract,
    @Inject('CreditCardRepository')
    private readonly creditCardRepository: CreditCardRepositoryContract,
    @Inject('CategoryRepository')
    private readonly categoriesRepository: CategoryRepositoryContract,
    @Inject('CreditCardInvoiceRepository')
    private readonly creditCardInvoiceRepository: CreditCardInvoiceRepositoryContract,
  ) {}

  async execute({ file, keysToMap, creditCardId }: Input) {
    try {
      const foundCreditCard = await this.creditCardRepository.findById(
        creditCardId,
      );

      if (!foundCreditCard) {
        throw new HttpException('Cartão de crédito não encontrado', 400);
      }

      this.categories = await this.categoriesRepository.findAll();

      this.creditCardInvoice = new CreditCardInvoice({
        date: new Date(),
        creditCard: foundCreditCard,
        spendings: [],
      });

      const stream = Readable.from(file.buffer);

      await new Promise<void>((resolve, reject) => {
        parse(stream, {
          header: true,
          worker: true,
          step: (results: ParseStepResult<Record<string, string>>) => {
            this.handleStepExecution(results, keysToMap);
          },
          error: (error) => reject(error),
          complete: () => {
            resolve();
          },
        });
      });

      await this.spendingsRepository.createMany(
        this.creditCardInvoice.spendings,
      );

      await this.creditCardInvoiceRepository.create(this.creditCardInvoice);

      return CreditCardInvoiceMapper.toHttp(this.creditCardInvoice);
    } catch (error) {
      console.error(error);
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
    const parsedData = Object.entries(data).reduce((accumulator, entry) => {
      const [key, value] = entry;

      const parsedKey = String(key).replace(/[^a-zA-Z]/g, '');

      accumulator[parsedKey] = value;

      return accumulator;
    }, {});

    const parsedKeys: Record<string, string> = JSON.parse(keysToMap);

    const mappedKeys = Object.entries(parsedKeys).reduce(
      (accumulator, currentObj) => {
        const [internalKey, csvKey] = currentObj;

        accumulator[internalKey] = this.parseValue(
          internalKey,
          parsedData[csvKey],
        );
        return accumulator;
      },
      {},
    );

    return mappedKeys;
  }

  parseValue(key: string, value: string) {
    if (key === 'price') {
      let parsedString = String(value).split(' ')[1];

      parsedString = parsedString.trim().replace(',', '.');

      return isNaN(Number(parsedString)) ? 0 : parseFloat(parsedString);
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
