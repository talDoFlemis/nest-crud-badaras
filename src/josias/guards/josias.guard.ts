import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JosiasException } from '../exceptions/josias.exceptions';

@Injectable()
export class JosiasGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const name = this.reflector.get<string>('name', ctx.getHandler());

    if (!name) return true;

    const req = ctx.switchToHttp().getRequest();
    const { body } = req;
    if (!body || body.name !== name) throw new JosiasException();
    return true;
  }
}
