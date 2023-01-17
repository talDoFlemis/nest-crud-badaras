import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JosiasService } from './josias.service';
import { JosiasController } from './josias.controller';
import { NopeMenSova } from './middleware/nope.middleware';

@Module({
  controllers: [JosiasController],
  providers: [JosiasService],
})
export class JosiasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NopeMenSova).forRoutes({
      path: 'josias',
      method: RequestMethod.DELETE,
      version: '1',
    });
  }
}
