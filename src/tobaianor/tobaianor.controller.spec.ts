import { Test, TestingModule } from '@nestjs/testing';
import { TobaianorController } from './tobaianor.controller';
import { TobaianorService } from './tobaianor.service';

describe('TobaianorController', () => {
  let controller: TobaianorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TobaianorController],
      providers: [TobaianorService],
    }).compile();

    controller = module.get<TobaianorController>(TobaianorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
