import axios from 'axios';
import { decode } from 'iconv-lite';
import { stringify } from 'qs';
import { CatCatDanmakuDataSource } from '../../config/dataSource';
import { BiliBiliDanmu } from 'src/danmaku/entities/bilbili.danmu';
import { transformMsg } from 'src/danmaku/utils/danmuUtils';
import { LiveInfo } from 'src/danmaku/entities/liveInfo';
// eslint-disable-next-line @typescript-eslint/no-empty-function
async function getInfo(date = new Date()) {}

async function getSearch(key, bearer) {
  const { data } = await axios({
    responseType: 'arraybuffer',
    url:
      'https://app-api.pixiv.net/v1/search/illust?merge_plain_keyword_results=true&search_target=partial_match_for_tags&word=' +
      key +
      '&include_translated_tag_results=true',
    headers: {
      Authorization: 'Bearer ' + bearer,
      Referer: 'http://spapi.pixiv.net/',
      Host: 'app-api.pixiv.net',
      'User-Agent': 'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)',
    },
  });
  const datax = JSON.parse(decode(data, 'utf-8'));
  console.info(datax);
  let rodom = 0;
  if (eval(datax)?.illusts?.length) {
    rodom = 0;
  }
  return eval(datax)?.illusts[rodom]?.id;
}

async function rsshub(url, bearer) {
  console.info('get pixiv ranking data');
  const { data } = await axios({
    responseType: 'arraybuffer',
    url: 'https://app-api.pixiv.net/v1/illust/ranking' + url,
    headers: {
      Authorization: 'Bearer ' + bearer,
      Referer: 'http://spapi.pixiv.net/',
      Host: 'app-api.pixiv.net',
      'User-Agent': 'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)',
    },
  });
  const datax = JSON.parse(decode(data, 'utf-8'));
  console.info(datax);
  let rodom = 0;
  if (eval(datax)?.illusts?.length) {
    rodom = 0;
  }
  return eval(datax)?.illusts[rodom]?.id;
}

async function getBearer(refresh_token) {
  console.info('get bearer start');
  const { data } = await axios({
    responseType: 'arraybuffer',
    method: 'post',
    url: 'https://oauth.secure.pixiv.net/auth/token',
    data: stringify({
      client_id: 'MOBrBDS8blbauoSck0ZfDbtuzpyT',
      client_secret: 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj',
      grant_type: 'refresh_token',
      include_policy: 'true',
      refresh_token: refresh_token,
    }),
    headers: {
      'User-Agent': 'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const datax = JSON.parse(decode(data, 'utf-8'));
  console.info(datax);
  return datax.access_token;
}

async function getImageCheckResult(imageUrl) {
  const { data } = await axios({
    responseType: 'arraybuffer',
    url: 'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?access_token=ak',

    data: stringify({
      imgUrl: imageUrl,
      imgType: 0,
    }),
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const datax = JSON.parse(decode(data, 'utf-8'));
  console.info(datax.conclusion);
  return datax.conclusion;
}

async function getDetail() {
  const info = await getInfo();
  return;
}

async function getAIReply() {
  return '...';
}

async function recordMsg(msg, liveinfo: LiveInfo) {
  console.info(msg);
  //record to db
  try {
    const biliBiliDanmuRepository =
      CatCatDanmakuDataSource.getRepository(BiliBiliDanmu);
    //const danmu = new BiliBiliDanmu();
    const dm = await transformMsg(msg, false, {
      platform: 'pc',
      room_id: liveinfo.real_roomid,
      area_parent_id: liveinfo.parent_area_id,
      area_id: liveinfo.area_id,
    });
    console.info(dm);
    if (dm) {
      biliBiliDanmuRepository
        .createQueryBuilder()
        .insert()
        .values(dm)
        .execute();
    }
  } catch (e) {
    console.info(e);
  }
  return;
}
export default {
  getSearch,
  getBearer,
  rsshub,
  recordMsg,
};
