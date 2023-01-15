import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/database.config';
import { validate } from 'config/env.validation';
import { DataSourceOptions } from 'typeorm';
import { TobaianorModule } from './tobaianor/tobaianor.module';
import { CacheModule } from './cache/cache.module';
import { JosiasModule } from './josias/josias.module';
import cacheConfig from 'config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, cacheConfig],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database');
      },
      inject: [ConfigService],
    }),
    JosiasModule,
    TobaianorModule,
    CacheModule,
  ],
})
export class AppModule {}
