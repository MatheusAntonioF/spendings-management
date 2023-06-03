import { IsHexColor, IsString } from 'class-validator';

export class CreateCreditCardDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}
