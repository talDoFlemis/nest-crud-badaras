import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/database.config';
import { validate } from 'config/env.validation';
import { DataSourceOptions } from 'typeorm';
import { JosiasModule } from './josias/josias.module';
import { TobaianorModule } from './tobaianor/tobaianor.module';

@Module({
  imports: [
    JosiasModule,
    TobaianorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database');
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
      validate,
    }),
  ],
})
export class AppModule {}
