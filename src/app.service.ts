import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { name: 'Ayudame App', message: 'Hello World!' };
  }
}
