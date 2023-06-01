import { IsNotEmptyObject } from 'class-validator';

export class ProcessCsvSpendingsDTO {
  @IsNotEmptyObject()
  keysToMap: string;
}
