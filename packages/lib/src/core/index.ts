import { getURLQuery } from '../utils';
import type { TrackerOption } from '../types';

class Tracker {
  BASE_URL: string;
  id: string;
  constructor(option: TrackerOption) {
    this.BASE_URL = option.requestURL;
    this.id = option.id;
  }
}

(async () => {
  const scripts = document.querySelectorAll('script');
  const src = scripts[0].src;
  const id = getURLQuery(src).id;
  if (id === void 0) {
    console.error('无id');
  } else {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/'
        : 'http://localhost:4001/';
    const res = await fetch(`${url}/site/${atob(id)}`);
    switch (res.status) {
      case 404:
        console.error('错误的id');
        break;
      case 403:
        console.error('该id与注册网址不符合');
        break;
      case 200: {
        console.log('启用埋点');
        (window as any)['tracker'] = new Tracker({
          id,
          requestURL: url,
        });
      }
    }
  }
})();
