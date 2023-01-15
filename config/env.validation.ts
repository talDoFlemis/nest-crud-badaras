import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

enum CacheStore {
  Redis = 'redis',
  inMemory = 'memory',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  //DATABASE
  @IsOptional()
  @IsInt()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsOptional()
  @IsBoolean()
  DATABASE_SYNCHRONIZE: boolean;

  //Cache
  @IsEnum(CacheStore)
  CACHE_STORE: CacheStore;

  @IsString()
  @ValidateIf((o) => o.CACHE_STORE === CacheStore.Redis)
  CACHE_HOST: string;

  @IsInt()
  @ValidateIf((o) => o.CACHE_STORE === CacheStore.Redis)
  CACHE_PORT: number;

  @IsOptional()
  @IsInt()
  CACHE_TTL: number;

  @IsOptional()
  @IsInt()
  CACHE_MAX: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
