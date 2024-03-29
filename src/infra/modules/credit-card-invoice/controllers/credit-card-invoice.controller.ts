import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessCSVService } from '../services/process-csv-service';
import { ProcessCsvSpendingsDTO } from '../dtos/process-csv-spendings.dto';
import {
  Details,
  GetCreditCardInvoicesUseCase,
} from 'src/core/domain/credit-card/use-cases/get-credit-card-invoices.use-case';
import { CreditCardInvoiceMapper } from '../mappers/credit-card-invoice.mapper';
import { GetCreditCardInvoiceQueriesDTO } from '../dtos/get-credit-card-invoice-queries.dto';

@Controller('spendings')
export class CreditCardInvoiceController {
  constructor(
    private readonly getCreditCardInvoiceUseCase: GetCreditCardInvoicesUseCase,
    private readonly processCsvService: ProcessCSVService,
  ) {}

  @Get()
  async findAll(
    @Query() { date }: GetCreditCardInvoiceQueriesDTO,
  ): Promise<{ details: Details; invoices: Record<string, any> }> {
    const parsedDate = new Date(date);

    const { invoices, details } =
      await this.getCreditCardInvoiceUseCase.execute({
        date: parsedDate,
      });

    return {
      invoices: invoices.map(CreditCardInvoiceMapper.toHttp),
      details,
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: ProcessCsvSpendingsDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.processCsvService.execute({
      file,
      keysToMap: body.keysToMap,
      creditCardId: body.creditCardId,
      date: body.date,
    });
  }
}
