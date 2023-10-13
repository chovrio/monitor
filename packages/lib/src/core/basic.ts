import { TrackerPlugin } from '../types';

/**
 * 一些基本信息的监控
 * 比如TCP、DNS
 */
export const monitorBasicInfo: TrackerPlugin = (tracker) => {
  window.addEventListener('load', function () {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByType('navigation');
      const navigationEntry = entries[0];
      if (navigationEntry instanceof PerformanceNavigationTiming) {
        const t = navigationEntry;
        let r = 0;
        r = t.startTime;
        const n = [
          {
            key: 'Redirect',
            desc: '\u7f51\u9875\u91cd\u5b9a\u5411\u7684\u8017\u65f6',
            value: t.redirectEnd - t.redirectStart,
          },
          {
            key: 'AppCache',
            desc: '\u68c0\u67e5\u672c\u5730\u7f13\u5b58\u7684\u8017\u65f6',
            value: t.domainLookupStart - t.fetchStart,
          },
          {
            key: 'DNS',
            desc: 'DNS\u67e5\u8be2\u7684\u8017\u65f6',
            value: t.domainLookupEnd - t.domainLookupStart,
          },
          {
            key: 'TCP',
            desc: 'TCP\u8fde\u63a5\u7684\u8017\u65f6',
            value: t.connectEnd - t.connectStart,
          },
          {
            key: 'Waiting(TTFB)',
            desc: '\u4ece\u5ba2\u6237\u7aef\u53d1\u8d77\u8bf7\u6c42\u5230\u63a5\u6536\u5230\u54cd\u5e94\u7684\u65f6\u95f4 / Time To First Byte',
            value: t.responseStart - t.requestStart,
          },
          {
            key: 'Content Download',
            desc: '\u4e0b\u8f7d\u670d\u52a1\u7aef\u8fd4\u56de\u6570\u636e\u7684\u65f6\u95f4',
            value: t.responseEnd - t.responseStart,
          },
          {
            key: 'HTTP Total Time',
            desc: 'http\u8bf7\u6c42\u603b\u8017\u65f6',
            value: t.responseEnd - t.requestStart,
          },
          {
            key: 'DOMContentLoaded',
            desc: 'dom\u52a0\u8f7d\u5b8c\u6210\u7684\u65f6\u95f4',
            value: t.domContentLoadedEventEnd - r,
          },
          {
            key: 'Loaded',
            desc: '\u9875\u9762load\u7684\u603b\u8017\u65f6',
            value: t.loadEventEnd - r,
          },
        ];
        // 只对25%的用户进行上报
        if (Math.random() > 0.75) {
          const s = window.location,
            i = s.href,
            c = s.pathname,
            u = navigator.userAgent,
            d = i.split('?')[0];
          tracker.post(`${tracker.BASE_URL}/data`, {
            app: 'shakespeare-performance',
            url: d,
            ua: u,
            path: c,
            stats_ttfb: t.responseStart - t.requestStart,
            stats_domLoaded: t.domContentLoadedEventEnd - r,
            stats_loaded: t.loadEventEnd - r,
          });
        }
        console && console.log && console.log(n);
      }
    });
    observer.observe({ entryTypes: ['navigation'] });
  });
};
