import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { ParseStepResult, parse } from 'papaparse';
import { parse as dateFnsParse } from 'date-fns';
import { CreditCardRepositoryContract } from 'src/core/domain/credit-card/contract/credit-card-repository.contract';
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
      console.log('🚀 ~ error:', error);
      throw new HttpException(error.message, 400);
    }
  }

  mappingCsvKeys(
    data: Record<string, string>,
    keysToMap: string,
  ): Record<string, string> {
    console.log('🚀 ~ keysToMap:', keysToMap, typeof keysToMap);
    console.log('🚀 ~ data:', data);

    const parsedKeys: Record<string, string> = JSON.parse(keysToMap);

    const mappedKeys = Object.entries(parsedKeys).reduce(
      (accumulator, currentObj) => {
        console.log('🚀 ~ currentObj:', currentObj);

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
      return String(value).replace(/[^\d]+/g, '');
    }

    if (key === 'purchaseDate') {
      return dateFnsParse(String(value), 'dd/MM/yyyy', new Date());
    }

    return value;
  }
}
