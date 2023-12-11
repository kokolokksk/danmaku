import { DataSource } from 'typeorm';
import { GuildLiLiLaUser } from '../entities/guild.lilila.user';
import { Message } from '../entities/message';
import { Words } from '../entities/words';
import { LiveInfo } from '../entities/liveInfo';
import { BiliBiliDanmu } from '../entities/bilbili.danmu';

export const CatCatDanmakuDataSource = new DataSource({
  type: 'sqlite',
  database: './catcatdanmaku.db',
  synchronize: true,
  entities: [Message, Words, LiveInfo, BiliBiliDanmu],
});

CatCatDanmakuDataSource.initialize()
  .then(() => {
    console.log('CatCatDanmakuDataSource initialized');
  })
  .catch((error) => {
    console.error('CatCatDanmakuDataSource initialization failed');
    console.error(error);
  });
