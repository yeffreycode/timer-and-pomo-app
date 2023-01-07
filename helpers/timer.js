export class Timer {
  constructor() {
    this.h = 0;
    this.m = 0;
    this.s = 0;
    this.intervalId = "";
    this.pomodoro = {
      m: 0,
      s: 0,
    };
    this.pomoBreak = {
      m: 0,
      s: 0,
    };
    this.isNegative = this.h < 0 || this.m < 0 || this.s < 0;
  }
  setTimer(h, m, s) {
    this.h = h;
    this.m = m;
    this.s = s;
  }
  changeSeconds() {
    this.s--;
  }
  changeMinutes() {
    this.m--;
  }
  changeHours() {
    this.h--;
  }
  changeState() {
    let all0 = this.s == 0 && this.m == 0 && this.h == 0;
    if (all0) {
      this.isNegative = true;
    }
    if (all0) {
      this.changeSeconds();
    } else if (!this.m && !this.s && this.h && !this.isNegative) {
      this.m = 59;
      this.s = 59;
      this.changeHours();
    } else if (!this.s && this.m && !this.isNegative) {
      this.s = 59;
      this.changeMinutes();
    } else if (this.s && this.s != -59) {
      this.changeSeconds();
    } else if (this.m == -59 && this.s == -59) {
      this.changeHours();
      this.m = 0;
      this.s = 0;
    } else if (this.s == -59) {
      this.s = 0;
      this.changeMinutes();
    } else if (this.s == 0 && this.isNegative) {
      this.changeSeconds();
    }
  }
  startTimer(callback) {
    this.intervalId = setInterval(() => {
      this.changeState();
      callback();
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
  }
}
