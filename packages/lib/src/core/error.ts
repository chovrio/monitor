/**
 * 监控异常错误的函数
 */

import { TrackerPlugin } from '../types';

export const monitorErrorInfo: TrackerPlugin = (tracker) => {
  /**
   * window.onerror
   * 捕获常规错误、异步错误，不能捕获资源错误
   */
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement;
      const src = target.getAttribute('src');
      const href = target.getAttribute('href');
      const source = src || href;
      console.log('出错了', event);
      if (source) {
        tracker.post('/error/asset', {
          type: 'resource',
          message: `${source} is load error`,
          reason: event.message,
        });
      } else {
        tracker.post('/error/simple', {
          type: 'resource',
          message: event.message,
        });
      }
    },
    true
  );
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      console.log('异步错误', event.reason);
      tracker.post('/error/async', {
        type: 'unhandledrejection',
        message: event.reason,
      });
    },
    true
  );
};
