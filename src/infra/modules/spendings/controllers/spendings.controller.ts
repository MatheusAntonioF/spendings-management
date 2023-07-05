import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessCSVService } from '../services/process-csv-service';
import { ProcessCsvSpendingsDTO } from '../dtos/process-csv-spendings.dto';

@Controller('spendings')
export class SpendingController {
  constructor(private readonly processCsvService: ProcessCSVService) {}

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
    });
  }
}
