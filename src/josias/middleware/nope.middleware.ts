import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class NopeMenSova implements NestMiddleware {
  use(_: IncomingMessage, res: ServerResponse) {
    console.log("I' m the Josias middleware");
    res.writeHead(HttpStatus.FORBIDDEN, { 'content-type': 'application/json' });
    res.write(
      JSON.stringify({
        NOT_TODAY_MOTHERFUCKER:
          "I'm josias middleware and U shouldn't pass motherfucker",
      }),
    );
    res.end();
    return;
  }
}
