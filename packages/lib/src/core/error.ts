/**
 * 监控异常错误的函数
 */

import { TrackerPlugin } from '../types';

export const monitorBasicInfo: TrackerPlugin = (tracker) => {
  /**
   * window.onerror
   * 捕获常规错误、异步错误，不能捕获资源错误
   */
  window.addEventListener('error', (event) => {
    const target = event.target as HTMLElement;
    const src = target.getAttribute('src');
    const href = target.getAttribute('href');

    // tracker.send(errorInfo);
  });
};
