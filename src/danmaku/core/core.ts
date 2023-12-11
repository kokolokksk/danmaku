import { LiveWS } from 'bilibili-live-ws';
import { CatCatDanmakuDataSource } from '../config/dataSource';
import { LiveInfo } from '../entities/liveInfo';
import createLiveWs from '../plugins/ws/createLiveWs';

const loadDefaultTask = async () => {
  console.info('loading task...');
  let spread = true;
  let rooms: LiveInfo[] = [];
  try {
    const LiveInfoRepository = CatCatDanmakuDataSource.getRepository(LiveInfo);
    rooms = await LiveInfoRepository.find();
  } catch ({}) {}
  spread = await createLiveWs(rooms, spread);
  return spread;
};

const stopAll = () => {
  console.info('stop all');
  const list: LiveWS[] = globalThis.wsList;
  list.forEach((element: LiveWS) => {
    element.close();
    console.info(`${element.roomid}:closed`);
  });
};
const wsDetails = () => {
  const list: LiveWS[] = globalThis.wsList;
  let details = '';
  list.forEach((element: LiveWS) => {
    details += `${element.roomid}:${!element.closed}\n`;
  });
  return details;
};
export { loadDefaultTask, stopAll, wsDetails };
