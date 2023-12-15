import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import crypto, { Sign } from 'crypto';
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

  @Post('/api/login')
  async login(@Body() newsData): Promise<string> {
    console.info(newsData);
    console.info(crypto);
    return await this.appService.login(newsData);
  }
}
