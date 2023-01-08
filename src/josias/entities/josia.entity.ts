import { IsIn, IsString, ValidateIf } from 'class-validator';

export class Josias4Real {
  id: 1;
  name = 'Josias';

  @ValidateIf((o) => o.operational_type !== '')
  @IsIn(['focused', 'serious', 'geponto'])
  @IsString()
  mood: string;
}
