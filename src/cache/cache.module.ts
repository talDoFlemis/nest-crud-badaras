import { CacheModule as BaseCacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BaseCacheModule.register({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return configService.get('cache');
      },
      inject: [ConfigService],
    }),
  ],
  exports: [BaseCacheModule],
})
export class CacheModule {}
//TODO: If someday I need to log this shit

// export class CacheModule implements OnModuleInit {
//   constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
//
//   public onModuleInit(): any {
//     const logger = new Logger('Cache');
//     const commands = ['get', 'set', 'del'];
//     const cache = this.cache;
//
//     commands.forEach((commandName) => {
//       const oldCommand = cache[commandName];
//       cache[commandName] = async (...args: string[]) => {
//         const start = new Date();
//         const result = await oldCommand.call(cache, ...args);
//         const end = new Date();
//         const duration = end.getTime() - start.getTime();
//
//         args = args.slice(0, 2);
//         logger.log(
//           `${commandName.toUpperCase()} ${args.join(', ')} - ${duration}ms`,
//         );
//
//         return result;
//       };
//     });
//   }
// }
