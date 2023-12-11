import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.sendMsg('H!');
  }

  @Get('/ws/stopAll')
  stopAll(): string {
    return this.appService.stopAll();
  }
  @Get('/ws/detail')
  detail(): string {
    return this.appService.detail();
  }
}
