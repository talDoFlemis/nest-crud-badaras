import { Module } from '@nestjs/common';
import { TobaianorService } from './tobaianor.service';
import { TobaianorController } from './tobaianor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tobaianor } from './entities/tobaianor.entity';
import { TobaianorSubscriber } from './tobaianor.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Tobaianor])],
  controllers: [TobaianorController],
  providers: [TobaianorService, TobaianorSubscriber],
})
export class TobaianorModule {}
