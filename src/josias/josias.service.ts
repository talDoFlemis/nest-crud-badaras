import { Injectable } from '@nestjs/common';
import { UpdateJosiaDto } from './dto/update-josia.dto';
import { Josias4Real } from './entities/josia.entity';

@Injectable()
export class JosiasService {
  findJosias(): Josias4Real {
    return new Josias4Real();
  }

  update({ mood }: UpdateJosiaDto): Josias4Real {
    const josias = new Josias4Real();
    josias.mood = mood;
    return josias;
  }

  remove(): string {
    return 'You should not see this men, this service should be protected';
  }
}
