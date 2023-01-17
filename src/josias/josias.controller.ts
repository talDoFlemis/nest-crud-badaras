import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JosiasService } from './josias.service';
import { UpdateJosiaDto } from './dto/update-josia.dto';
import { Name } from './decorator/name.decorator';
import { JosiasGuard } from './guards/josias.guard';
import { Josias4Real } from './entities/josia.entity';

@UseGuards(JosiasGuard)
@Controller({ path: 'josias', version: '1' })
export class JosiasController {
  constructor(private readonly josiasService: JosiasService) {}

  @Get()
  findJosias(): Josias4Real {
    return this.josiasService.findJosias();
  }

  //Should be using Guard to stop any motherfucker instead of Josias here
  @Name('Josias')
  @Patch()
  update(@Body(new ValidationPipe()) mood: UpdateJosiaDto) {
    return this.josiasService.update(mood);
  }

  //Should stop using middleware here
  @Delete()
  remove() {
    return this.josiasService.remove();
  }
}
