import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateTobaianorDto {
  @IsString()
  nickname: string;

  @IsInt()
  @Min(0)
  @Max(10)
  tobaianisse: number;
}
