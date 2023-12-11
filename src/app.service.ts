import { Injectable } from '@nestjs/common';
import { stopAll, wsDetails } from './danmaku/core/core';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sendMsg(msg: string): string {
    return msg;
  }
  stopAll(): string {
    stopAll();
    return 'stop all';
  }
  detail(): string {
    return wsDetails();
  }
}
