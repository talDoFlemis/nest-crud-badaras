import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JosiasModule } from './josias/josias.module';
import { TobaianorModule } from './tobaianor/tobaianor.module';

@Module({
  imports: [
    JosiasModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'flemis',
      password: '',
      database: 'tubias',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TobaianorModule,
  ],
})
export class AppModule {}
