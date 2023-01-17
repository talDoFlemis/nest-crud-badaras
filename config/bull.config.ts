import { BullModuleOptions } from '@nestjs/bull';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'cache',
  (): BullModuleOptions => ({
    redis: {
      host: process.env.BULL_HOST,
      port: Number(process.env.BULL_PORT),
    },
  }),
);
