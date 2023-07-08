import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProcessCsvSpendingsDTO {
  @IsNotEmpty()
  keysToMap: string;

  @IsUUID()
  creditCardId: string;
}
