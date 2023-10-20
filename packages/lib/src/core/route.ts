import { TrackerPlugin } from '../types';
import { createHistoryEvent } from '../utils/browser';

/**
 * 监听路由信息
 */
export const monitorRouteInfo: TrackerPlugin = (tracker) => {
  // 哈希路由
  window.addEventListener('hashchange', (e) => {
    const newUrl = e.newURL;
    const oldUrl = e.oldURL;
    tracker.post('/route/hashchange', {
      type: 'hashchange',
      newUrl,
      oldUrl,
    });
  });
  // 浏览器路由
  (window as any)['trackerHistory'] = () => {
    window.history['pushState'] = createHistoryEvent('pushState');
    window.history['replaceState'] = createHistoryEvent('replaceState');
    const list = ['pushState', 'replaceState', 'popstate'];
    list.forEach((event) => {
      window.addEventListener(event, (e) => {
        const newUrl = window.location.href;
        // const oldUrl = e.state && e.state.url;
        console.log(e);
        tracker.post('/route/change', {
          type: event,
          newUrl,
          // oldUrl,
        });
      });
    });
  };
};
