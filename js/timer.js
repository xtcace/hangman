export class Timer {
  constructor({ duration, onTick, onExpire }) {
    this.duration = duration;
    this.remaining = duration;
    this.onTick = onTick;
    this.onExpire = onExpire;
    this.intervalId = null;
  }

  start() {
    if (this.intervalId) return; // already running
    this.intervalId = setInterval(() => {
      this.remaining -= 1;
      if (this.onTick) this.onTick(this.remaining, this.duration);
      if (this.remaining <= 0) {
        this.stop();
        if (this.onExpire) this.onExpire();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    this.stop();
    this.remaining = this.duration;
  }
}
