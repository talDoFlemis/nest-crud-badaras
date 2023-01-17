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
import { ScheduleModule } from '@nestjs/schedule';
import { SuaMaeModule } from './suamae/suamae.module';
import { BullModule, BullModuleOptions } from '@nestjs/bull';

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
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get<BullModuleOptions>('bull');
      },
      inject: [ConfigService],
    }),
    JosiasModule,
    TobaianorModule,
    CacheModule,
    SuaMaeModule,
  ],
})
export class AppModule {}
