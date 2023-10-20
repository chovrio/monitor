class FlushQueue {
  private queue: (() => void)[] = [];
  taskHandle: number | null = null;
  push(fn: () => void) {
    this.queue.push(fn);
    this.run();
  }
  run() {
    const runTaskQueue: IdleRequestCallback = (deadline) => {
      while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        this.queue.length
      ) {
        this.queue.shift()?.();
      }
      if (this.queue.length) {
        this.taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
      }
    };
    this.taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  }
}

export default FlushQueue;
