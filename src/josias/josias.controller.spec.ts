import { Test, TestingModule } from '@nestjs/testing';
import { UpdateJosiaDto } from './dto/update-josia.dto';
import { Josias4Real } from './entities/josia.entity';
import { JosiasController } from './josias.controller';
import { JosiasService } from './josias.service';

describe('JosiasController', () => {
  let controller: JosiasController;
  let service: JosiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JosiasController],
      providers: [JosiasService],
    }).compile();

    controller = module.get<JosiasController>(JosiasController);
    service = module.get<JosiasService>(JosiasService);
  });

  it('findJosias', () => {
    const result = new Josias4Real();
    jest.spyOn(service, 'findJosias').mockImplementation(() => result);
    expect(controller.findJosias()).toBe(result);
  });

  it('update', () => {
    const result = new Josias4Real();
    result.mood = 'serious';
    jest.spyOn(service, 'update').mockImplementation(() => result);

    const mood = new UpdateJosiaDto();
    mood.mood = 'serious';

    expect(controller.update(mood)).toBe(result);
  });

  it('delete', () => {
    const res = 'a random string';
    jest.spyOn(service, 'remove').mockImplementation(() => res);

    expect(controller.remove()).toBe(res);
  });
});
