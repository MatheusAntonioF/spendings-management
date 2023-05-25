import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessCSVService } from '../services/processCsvService';

@Controller('spendings')
export class SpendingController {
  constructor(private readonly processCsvService: ProcessCSVService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.processCsvService.execute({ file });
  }
}
