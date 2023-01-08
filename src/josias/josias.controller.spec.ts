import { Test, TestingModule } from '@nestjs/testing';
import { JosiasController } from './josias.controller';
import { JosiasService } from './josias.service';

describe('JosiasController', () => {
  let controller: JosiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JosiasController],
      providers: [JosiasService],
    }).compile();

    controller = module.get<JosiasController>(JosiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
