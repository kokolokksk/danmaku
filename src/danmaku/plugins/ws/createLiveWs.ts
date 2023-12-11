import axios from 'axios';
import * as fs from 'fs';
import { authConfig } from 'src/danmaku/config/danmaku.config';
import { LiveInfo } from 'src/danmaku/entities/liveInfo';
import service from './service';
import { LiveWS, KeepLiveTCP } from 'bilibili-live-ws';

const createLiveWs = async (data: LiveInfo[], spread: boolean) => {
  const wsList: KeepLiveTCP[] = [];
  const key = await getKey(19864);
  const test: LiveInfo = {
    id: 0,
    roomid: 19864,
    real_roomid: 19864,
    uid: 1999280,
    area_id: '0',
    parent_area_id: '0',
    key: key,
    buvid: authConfig.buvid,
    protover: authConfig.protover,
    createdAt: new Date(),
  };
  data.push(test);
  if (data.length === 0) {
    console.info('no roomids');
    return spread;
  } else {
    data.forEach((element) => {
      const live = new KeepLiveTCP(Number(element.real_roomid), {
        uid: element.uid,
        key: element.key,
        buvid: element.buvid,
        protover: 3,
      });
      wsList.push(live);
      sleep(1000);
    });
    wsList.forEach((ls) => {
      ls.on('open', () => {
        console.info(`${ls.roomid}:try to connect server`);
      });
      ls.on('live', () => {
        console.info(`${ls.roomid}:success connected server`);
      });
      getLiveInfo(ls.roomid).then((LiveInfo) => {
        console.info(`${LiveInfo} try to on`);
        ls.on('msg', (msg) => {
          service.recordMsg(msg, LiveInfo);
        });
      });
    });
    globalThis.wsList = wsList;
    return spread;
  }
};
// 函数实现，参数单位 毫秒 ；
const sharedArrayBuffer_for_sleep = new SharedArrayBuffer(4);
const sharedArray_for_sleep = new Int32Array(sharedArrayBuffer_for_sleep);
// 同步函数，睡眠 n 毫秒；
const sleep = function (n: number) {
  Atomics.wait(sharedArray_for_sleep, 0, 0, n);
};

async function getLiveInfo(roomid: number) {
  let li: LiveInfo = new LiveInfo();
  li = await axios
    .get(`http://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomid}`)
    .then((response2) => {
      // console.log(response2);
      li.area_id = response2.data.data.area_id;
      li.parent_area_id = response2.data.data.parent_area_id;
      li.real_roomid = response2.data.data.room_id;
      return li;
    })
    .catch((error) => {
      console.log(error);
      return li;
    });
  return li;
}

async function getKey(roomid: number) {
  const key = await axios
    .get(
      `https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${roomid}`,
    )
    // eslint-disable-next-line func-names
    .then((res) => {
      console.log(res);
      return res.data.data.token;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return key;
    });
  return key;
}
export default createLiveWs;
