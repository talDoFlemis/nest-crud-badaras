import { PickType } from '@nestjs/mapped-types';
import { Josias4Real } from '../entities/josia.entity';

export class UpdateJosiaDto extends PickType(Josias4Real, ['mood'] as const) {}
