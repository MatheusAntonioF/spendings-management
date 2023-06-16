import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { ParseStepResult, parse } from 'papaparse';
import { parse as dateFnsParse } from 'date-fns';
import { CreditCardRepositoryContract } from 'src/core/domain/credit-card/contract/credit-card-repository.contract';
import { CreditCardInvoice } from 'src/core/domain/credit-card/credit-card-invoice.entity';
import { Spending } from 'src/core/domain/spending/spending.entity';
interface Input {
  keysToMap: string;
  file: Express.Multer.File;
  creditCardId: string;
}

@Injectable()
export class ProcessCSVService {
  constructor(
    @Inject('CreditCardRepository')
    private readonly creditCardRepository: CreditCardRepositoryContract,
  ) {}

  async execute({ file, keysToMap, creditCardId }: Input) {
    try {
      const foundCreditCard = await this.creditCardRepository.findById(
        creditCardId,
      );

      if (!foundCreditCard) {
        throw new HttpException('Credit card not found', 400);
      }

      const creditCardInvoice = new CreditCardInvoice({
        date: new Date(),
        creditCard: foundCreditCard,
        spendings: [],
      });

      const createdSpendings: Spending[] = [];

      const stream = Readable.from(file.buffer);

      await new Promise<void>((resolve, reject) => {
        parse(stream, {
          header: true,
          worker: true,
          step: (results: ParseStepResult<Record<string, string>>) => {
            this.mappingCsvKeys(results.data, keysToMap);
          },
          error: (error) => reject(error),
          complete: () => resolve(),
        });
      });
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  mappingCsvKeys(
    data: Record<string, string>,
    keysToMap: string,
  ): Record<string, string> {
    const parsedKeys: Record<string, string> = JSON.parse(keysToMap);

    const mappedKeys = Object.entries(parsedKeys).reduce(
      (accumulator, currentObj) => {
        const [internalKey, csvKey] = currentObj;

        accumulator[internalKey] = this.parseValue(internalKey, data[csvKey]);
        return accumulator;
      },
      {},
    );

    console.log('🚀 ~ mappedKeys:', mappedKeys);
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
}
