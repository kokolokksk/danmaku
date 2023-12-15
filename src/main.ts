import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadDefaultTask } from './danmaku/core/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
  initDanmaku();
}
bootstrap();
function initDanmaku() {
  console.log('init danmaku!');
  // loadDefaultTask();
}
