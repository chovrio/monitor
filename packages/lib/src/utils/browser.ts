export const getBrowserWindow = () => {
  if (window !== null && window !== void 0) {
    return window;
  }
  return null;
};

export const createHistoryEvent = <T extends keyof History>(type: T) => {
  const origin = history[type];
  return function (this: any, ...args: any[]) {
    const res = origin.aplly(this, args);
    const e = new Event(type);
    window.dispatchEvent(e);
    return res;
  };
};
