import { Module } from '@nestjs/common';
import { JosiasModule } from './josias/josias.module';

@Module({
  imports: [JosiasModule],
})
export class AppModule {}
