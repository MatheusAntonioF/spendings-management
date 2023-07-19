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
import { GetCreditCardInvoicesUseCase } from 'src/core/domain/credit-card/use-cases/get-credit-card-invoices.use-case';
import { CreditCardInvoiceMapper } from '../mappers/credit-card-invoice.mapper';
import { GetCreditCardInvoiceQueriesDTO } from '../dtos/get-credit-card-invoice-queries.dto';

@Controller('spendings')
export class SpendingController {
  constructor(
    private readonly getCreditCardInvoiceUseCase: GetCreditCardInvoicesUseCase,
    private readonly processCsvService: ProcessCSVService,
  ) {}

  @Get()
  async findAll(@Query() { date }: GetCreditCardInvoiceQueriesDTO) {
    const parsedDate = new Date(date);

    const creditCardInvoice = await this.getCreditCardInvoiceUseCase.execute({
      date: parsedDate,
    });

    return CreditCardInvoiceMapper.toHttp(creditCardInvoice);
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
