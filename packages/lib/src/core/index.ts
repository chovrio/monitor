import FlushQueue from '../utils/flushStack';
import { getId } from '../utils';
import type { TrackerOption } from '../types';
import { monitorBasicInfo } from './basic';
import { monitorErrorInfo } from './error';
import { monitorRouteInfo } from './route';

export class Tracker {
  BASE_URL: string;
  id: string;
  flush: FlushQueue;
  plugins?: Array<(tracker: Tracker) => void>;
  constructor(option: TrackerOption) {
    this.BASE_URL = option.requestURL;
    this.id = option.id;
    this.plugins = option.plugins ?? [];
    this.flush = new FlushQueue();
    this.init();
  }
  init() {
    // 使用所有插件函数
    this.plugins?.some((plugin) => plugin(this));
  }
  private reportTracker<T>(data: T) {
    const params = Object.assign({}, data, { time: new Date() });
    const headers = {
      type: 'text/plain',
    };
    const blob = new Blob([JSON.stringify(params)], headers);
    navigator.sendBeacon(`${this.BASE_URL}/tracker`, blob);
  }
  post(type: string, data: Record<string, any>) {
    const task = () => {
      this.reportTracker({
        type,
        data,
      });
    };
    this.flush.push(task);
  }
}

(async () => {
  const scripts = document.querySelectorAll('script');
  const src = scripts[0].src;
  const id = getId(src);
  if (id === void 0) {
    console.error('无id');
  } else {
    // 兼容性问题
    window.requestIdleCallback =
      window.requestIdleCallback ||
      function (handler) {
        const startTime = Date.now();
        return setTimeout(function () {
          handler({
            didTimeout: false,
            timeRemaining: function () {
              return Math.max(0, 50.0 - (Date.now() - startTime));
            },
          });
        }, 1);
      };
    window.cancelIdleCallback =
      window.cancelIdleCallback ||
      function (id) {
        clearTimeout(id);
      };
    const url = 'http://localhost:4000';
    const res = await fetch(`${url}/site/${id}`);
    const data = await res.json();
    switch (data.code) {
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
          plugins: [monitorBasicInfo, monitorErrorInfo, monitorRouteInfo],
        });
      }
    }
  }
})();
