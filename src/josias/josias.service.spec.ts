import { Test, TestingModule } from '@nestjs/testing';
import { JosiasService } from './josias.service';

describe('JosiasService', () => {
  let service: JosiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JosiasService],
    }).compile();

    service = module.get<JosiasService>(JosiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
