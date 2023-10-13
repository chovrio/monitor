export const getBrowserWindow = () => {
  if (window !== null && window !== void 0) {
    return window;
  }
  return null;
};
