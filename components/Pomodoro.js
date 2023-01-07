import { renderComponent, render } from "../helpers/render.js";
import { Timer } from "./../helpers/timer.js";
import { SettingsPomodoro } from "./Settings.js";
import { TimerComponent } from "./Timer.js";
import { getFromLocalStorage } from "./../helpers/timerStorage.js";
import { parseNumberToString } from "../helpers/helper.js";

export const pomodoro = () => {
  let f = getFromLocalStorage("timerFocus") || 20;
  let b = getFromLocalStorage("timerBreak") || 5;
  const p = new Timer();
  let pomoIsRunning = false;
  let isBreak = false;

  p.setTimer(0, f, 0);

  const changeTimer = () => {
    let btnStart = document.querySelector(".pomo-btn");
    p.stopTimer();
    pomoIsRunning = false;
    isBreak = !isBreak;
    p.setTimer(0, isBreak ? b : f, 0);
    btnStart.innerHTML = "start";
    render(
      pomoTimer({ m: p.m, s: p.s }),
      document.querySelector(".p-timer-box")
    );
    let changeBtn = document.querySelector(".change-timer");
    changeBtn.innerHTML = isBreak ? "focus time" : "break time";
    render(
      isBreak ? "Break" : "Focus",
      document.querySelector(".pomo-title h3")
    );
  };

  const addChangeTimer = () => {
    let changeBtn = document.querySelector(".change-timer");
    changeBtn.onclick = changeTimer;
  };

  const startPomodoro = () => {
    let btnStart = document.querySelector(".pomo-btn");
    btnStart.onclick = () => {
      if (!pomoIsRunning) {
        p.startTimer(() => {
          if (!p.m && !p.s) {
            changeTimer();
          }
          render(
            pomoTimer({ m: p.m, s: p.s }),
            document.querySelector(".p-timer-box")
          );
        });
        btnStart.innerHTML = "stop";
      } else {
        btnStart.innerHTML = "play";
        p.stopTimer();
      }
      pomoIsRunning = !pomoIsRunning;
    };
  };
  const settingPomodoro = () => {
    let btn = document.querySelector(".settings-pomo");
    btn.onclick = () => {
      p.stopTimer();
      renderComponent(SettingsPomodoro, document.querySelector(".content"));
    };
  };

  const beforeRender = () => {
    let timerBtn = document.querySelector(".to-timer");
    timerBtn.onclick = () => {
      p.stopTimer();
      renderComponent(TimerComponent, document.getElementById("root"));
    };
    settingPomodoro();
    startPomodoro();
    addChangeTimer();
  };

  const setActions = () => {
    render(
      pomoTimer({ m: f ? f : 20, s: 0 }),
      document.querySelector(".p-timer-box")
    );
    render(pomoInfo({ f, b }), document.querySelector(".pomo-info"));
    beforeRender();
  };
  let txt = `<div class="pomodoro">
  <ul class="p-nav">
    <button>Pomo</button>
    <button class="to-timer">Timer</button>
  </ul>
  <div class="content">
    <div class="pomo-title">
      <h3>Focus</h3>
    </div>
    <div class="pomo-header">  
      <div class="pomo-info">
      </div>
      <button class="settings-pomo"><i class="fa-solid fa-gear"></i></button>
    </div>
    <div class="p-timer-box">
    </div>
    <div class="pomo-controls">
      <button class="pomo-btn">start</button>
      <button class="change-timer">break time</button>
    </div>
  </div>
  
  </div>`;
  return {
    setActions,
    txt,
  };
};

export const pomoTimer = (timer) => {
  return `<div class="pomo-timer">
      <span>${parseNumberToString(timer.m)}:</span>
      <span>${parseNumberToString(timer.s)}</span>
    </div>`;
};

export const pomoInfo = ({ f, b }) => {
  return `
      <span>focus: ${f}</span>
      <span>break: ${b}</span>`;
};
