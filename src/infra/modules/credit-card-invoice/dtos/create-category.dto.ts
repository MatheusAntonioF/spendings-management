import { IsArray, IsDefined, IsHexColor } from 'class-validator';

export class CreateCategoryDto {
  @IsDefined()
  name: string;
  @IsDefined()
  @IsHexColor()
  color: string;

  @IsDefined()
  @IsArray()
  keyMapping: string[];
}
