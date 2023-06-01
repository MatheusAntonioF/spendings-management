import { HttpException, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';
import { ParseStepResult, parse } from 'papaparse';
interface Input {
  keysToMap: string;
  file: Express.Multer.File;
}

@Injectable()
export class ProcessCSVService {
  async execute({ file, keysToMap }: Input) {
    try {
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

  mappingCsvKeys(data: Record<string, string>, keysToMap: string) {
    console.log('🚀 ~ keysToMap:', keysToMap, typeof keysToMap);
    console.log('🚀 ~ data:', data);

    const parsedKeys: Record<string, string> = JSON.parse(keysToMap);

    const mappedKeys = Object.entries(parsedKeys).reduce(
      (accumulator, currentObj) => {
        console.log('🚀 ~ currentObj:', currentObj);

        const [internalKey, csvKey] = currentObj;

        accumulator[internalKey] = data[csvKey];
        return accumulator;
      },
      {},
    );
    console.log('🚀 ~ mappedKeys:', mappedKeys);
  }
}
