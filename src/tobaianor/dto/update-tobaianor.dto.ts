import { PartialType } from '@nestjs/mapped-types';
import { CreateTobaianorDto } from './create-tobaianor.dto';

export class UpdateTobaianorDto extends PartialType(CreateTobaianorDto) {}
