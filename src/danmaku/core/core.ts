import { LiveWS } from 'bilibili-live-ws';
import { CatCatDanmakuDataSource } from '../config/dataSource';
import { LiveInfo } from '../entities/liveInfo';
import createLiveWs from '../plugins/ws/createLiveWs';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as NodeRSA from 'node-rsa';
import { User } from '../entities/user';
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

const getOnesKey = async (username: string) => {
  const LiveInfoRepository = CatCatDanmakuDataSource.getRepository(User);
  const user = await LiveInfoRepository.createQueryBuilder('user')
    .where('user.username = :username', { username: username })
    .getOne();
  return user;
};

const login = async (request: any) => {
  let data;
  // const privateKey = crypto.generateKeyPairSync('ed25519').privateKey;
  const { publicKey } = request;
  console.info(request);
  if (!publicKey) {
    data.json({ success: false, message: 'Invalid request' });
    return;
  }
  // 进行数字签名的示例
  try {
    console.info(crypto);
    // queryOnes rsa privateKey
    const username = request.username;
    const privateKey = await getOnesKey(username);
    const pk = request.publicKey;
    console.info(privateKey);
    const key = new NodeRSA(privateKey.private_key);
    const signKey = new NodeRSA(pk);
    const encrypted = signKey.encrypt(request.dataToEncrypt, 'base64');
    console.info('encrypted: ', encrypted);
    //key.importKey(privateKey, 'pkcs1');
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.log('decrypted: ', decrypted);
  } catch (e) {
    return JSON.stringify({ success: false, message: 'Invalid request' });
  }
  return JSON.stringify({ success: true, message: 'passed' });
};
export { loadDefaultTask, stopAll, wsDetails, login };
