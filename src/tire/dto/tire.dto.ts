import { IsNotEmpty } from 'class-validator';
import { tireType } from '../tire.entity';

export class TireDto {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  ratio: number;

  @IsNotEmpty()
  wheelSize: number;

  @IsNotEmpty()
  type: tireType;
}