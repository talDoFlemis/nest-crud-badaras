import { HttpStatus } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { UpdateJosiaDto } from '../src/josias/dto/update-josia.dto';
import { Josias4Real } from '../src/josias/entities/josia.entity';
import { JosiasModule } from '../src/josias/josias.module';
import { JosiasService } from '../src/josias/josias.service';

describe('Josias Controller', () => {
  let app: NestFastifyApplication;
  const josiasService = {
    findJosias: () => new Josias4Real(),
    update: ({ mood }: UpdateJosiaDto) => {
      const resp = new Josias4Real();
      resp.mood = mood;
      return resp;
    },
    delete: () => 'a random string',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JosiasModule],
    })
      .overrideProvider(JosiasService)
      .useValue(josiasService)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET josias`, async () => {
    return app
      .inject({
        method: 'GET',
        url: '/josias',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(result.json()).toEqual(josiasService.findJosias());
      });
  });

  it(`/PATCH josias with success`, async () => {
    const mood = new UpdateJosiaDto();
    mood.mood = 'serious';
    return app
      .inject({
        method: 'PATCH',
        url: '/josias',
        payload: { name: 'Josias', mood: 'serious' },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(result.json()).toEqual(josiasService.update(mood));
      });
  });

  it(`/PATCH josias with wrong mood`, async () => {
    return app
      .inject({
        method: 'PATCH',
        url: '/josias',
        payload: { name: 'Josias', mood: 'clown' },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.json()).toEqual({
          error: 'Bad Request',
          message: [
            'mood must be one of the following values: focused, serious, geponto',
          ],
          statusCode: 400,
        });
      });
  });

  it(`/PATCH josias without Josias Name on body`, async () => {
    return app
      .inject({
        method: 'PATCH',
        url: '/josias',
        payload: { name: 'Josney', mood: 'serious' },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.FORBIDDEN);
        expect(result.json()).toEqual({
          message: 'Josias exception: TU NON ES JOSIAS MANITO',
          statusCode: 403,
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
