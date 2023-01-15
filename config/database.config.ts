import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  autoLoadEntities: true,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || false,
  migrationsTableName: 'migration',
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migration' },
}));
