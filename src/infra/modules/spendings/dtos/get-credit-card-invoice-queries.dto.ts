import { IsNotEmpty, IsString } from 'class-validator';

export class GetCreditCardInvoiceQueriesDTO {
  @IsString({
    message: 'Data de consulta inválida',
  })
  @IsNotEmpty({
    message: 'Data de consulta obrigatória',
  })
  date: string;
}
