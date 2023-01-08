import { SetMetadata } from '@nestjs/common';

export const Name = (name: string) => SetMetadata('name', name);
