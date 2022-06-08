import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getList(): Array<object> {
    return [{a: 'Test: a'}, {b: 'Test b'}]
  }
}
