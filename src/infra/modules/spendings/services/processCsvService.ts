import { Injectable } from '@nestjs/common';

interface Input {
  file: Express.Multer.File;
}

@Injectable()
export class ProcessCSVService {
  async execute({ file }: Input) {
    console.log('🚀 ~ file:', file);
  }
}
