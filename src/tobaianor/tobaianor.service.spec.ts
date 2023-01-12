import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTobaianorDto } from './dto/create-tobaianor.dto';
import { UpdateTobaianorDto } from './dto/update-tobaianor.dto';
import { Tobaianor } from './entities/tobaianor.entity';
import { TobaianorService } from './tobaianor.service';

const oneTobaianor = new Tobaianor(1, 'tobaianor', 5);
const twoTobaianors = [
  new Tobaianor(1, 'tobaianor', 5),
  new Tobaianor(2, 'geponto tobaianor', 10),
];

const mockTobaianorRepository = {
  find: jest.fn().mockResolvedValue(twoTobaianors),
  findOneBy: jest.fn().mockResolvedValue(oneTobaianor),
  save: jest.fn().mockResolvedValue(oneTobaianor),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
};

describe('TobaianorService', () => {
  let service: TobaianorService;
  let repo: Repository<Tobaianor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TobaianorService,
        {
          provide: getRepositoryToken(Tobaianor),
          useValue: mockTobaianorRepository,
        },
      ],
    }).compile();

    service = module.get<TobaianorService>(TobaianorService);
    repo = module.get<Repository<Tobaianor>>(getRepositoryToken(Tobaianor));
  });

  describe('findAll()', () => {
    it('Should return an array with 2 tobaianors', async () => {
      const result = await service.findAll();
      expect(result).toEqual(twoTobaianors);
    });
  });

  describe('findOne()', () => {
    it('Should return one tobaianor', async () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(oneTobaianor);
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create()', () => {
    it('Should create one tobaianor', async () => {
      const repoSpy = jest.spyOn(repo, 'save');
      const createDto = new CreateTobaianorDto();
      createDto.nickname = 'tobaianor';
      createDto.tobaianisse = 5;

      expect(service.create(createDto)).resolves.toEqual(oneTobaianor);
      expect(repoSpy).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update()', () => {
    it('Should update one tobaianor', async () => {
      const update = new UpdateTobaianorDto();
      update.nickname = oneTobaianor.nickname;
      update.tobaianisse = oneTobaianor.tobaianisse;

      expect(service.update(1, update)).resolves.toEqual(true);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toHaveBeenCalledWith(1, update);
    });
  });

  describe('delete()', () => {
    it('Should return deleted with success', async () => {
      expect(service.remove(1)).resolves.toEqual({ deleted: true });
    });

    it('Should return deleted with error', async () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Nope'));
      repoSpy.mockClear();
      const resp = await service.remove(3);

      expect(resp).toEqual({ deleted: false, message: 'Nope' });
      expect(repoSpy).toHaveBeenCalledWith(3);
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
