import { HttpException, HttpStatus } from '@nestjs/common';

export class JosiasException extends HttpException {
  constructor() {
    super('Josias exception: TU NON ES JOSIAS MANITO', HttpStatus.FORBIDDEN);
  }
}
