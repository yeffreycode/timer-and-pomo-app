"use strict";

import {
  doGetCaretPosition,
  isNegativeTimer,
  noNumberInput,
  parseArrayToTimer,
  parseTimerToArray,
  setCaretPosition,
} from "../helpers/helper.js";
import { renderComponent } from "../helpers/render.js";
import { Timer } from "./../helpers/timer.js";
import { pomodoro } from "./Pomodoro.js";

export const TimerComponent = () => {
  let isRunning = false;
  let clickOutside = 0;
  const beforeRender = () => {
    let timer = ["0", "0", "0", "5", "0", "0"];
    let timerCache = Array.from(timer);
    let tt = new Timer();
    let timerInput = document.getElementById("timer-input");
    let txtTimer = "";
    let indexCursor = 0;
    let focusCursor = 0;
    let timerNumbers = document.querySelectorAll(".timer-number");
    const stopTimer = () => {
      let t = parseArrayToTimer(timer);
      tt.setTimer(t.hours, t.minutes, t.seconds);
      tt.stopTimer();
      isRunning = false;
      btnStart.innerHTML = "start";
    };
    const renderNumbers = () => {
      timerNumbers.forEach((value, key) => {
        value.innerHTML = timer[key];
        if (key + 1 == timer.length - txtTimer.length + indexCursor) {
          timerNumbers[key].className = ".timer-number tim-cursor";
        } else {
          timerNumbers[key].className = ".timer-number";
        }
        if (key < timer.length - txtTimer.length) {
          !timerNumbers[key].classList.contains("opacity-number") &&
            timerNumbers[key].classList.add("opacity-number");
        } else {
          timerNumbers[key].classList.contains("opacity-number") &&
            timerNumbers[key].classList.remove("opacity-number");
        }
      });
    };
    const clearRender = () => {
      let symbol = document.querySelector(".symbol");
      let isN = isNegativeTimer({ hours: tt.h, minutes: tt.m, seconds: tt.s });
      symbol.innerHTML = isN ? "-" : "";
      timerNumbers.forEach((value, key) => {
        value.innerHTML = timer[key];
        timerNumbers[key].className = ".timer-number";
      });
    };
    const clearCursor = () => {
      activeInput.style.display = "block";
      clearRender();
      timerInput.value = "";
      txtTimer = "";
      if (!clickOutside) timerCache = Array.from(timer);
      clickOutside++;
    };
    const addTxtTimerToTimerArray = () => {
      timer = timer.map((item, i) => {
        if (i >= timer.length - txtTimer.length) {
          item = txtTimer[txtTimer.length - (timer.length - i)];
        } else {
          item = "0";
        }
        return item;
      });
    };
    timerInput.addEventListener("input", (e) => {
      if (noNumberInput(e.target.value)) {
        e.target.value = txtTimer;
      }
      txtTimer = e.target.value;
      txtTimer =
        txtTimer.length > 6
          ? txtTimer.substring(
              txtTimer.length - (txtTimer.length - 1),
              txtTimer.length
            )
          : txtTimer;
      timerInput.value = txtTimer;
      indexCursor = doGetCaretPosition(timerInput);
      if (!txtTimer) focusCursor = 0;
      if (focusCursor && txtTimer.length == 6) indexCursor = focusCursor;
      setCaretPosition(timerInput, indexCursor);
      addTxtTimerToTimerArray();
      renderNumbers();
    });
    timerNumbers.forEach((item, key) => {
      item.style.cursor = "pointer";
      item.onclick = () => {
        console.log({ key });
        indexCursor =
          key + txtTimer.length < 6
            ? doGetCaretPosition(timerInput)
            : key - (timer.length - txtTimer.length) + 1;
        focusCursor = indexCursor;
        console.log({ indexCursor });
        setCaretPosition(timerInput, indexCursor);
        renderNumbers();
      };
    });
    clearRender();
    //start the timer button
    let btnStart = document.querySelector(".start-timer-btn");
    btnStart.onclick = function (e) {
      if (isRunning) return stopTimer();
      let t = parseArrayToTimer(timer);
      tt.setTimer(t.hours, t.minutes, t.seconds);
      tt.startTimer(() => {
        timer = parseTimerToArray({
          hours: tt.h,
          minutes: tt.m,
          seconds: tt.s,
        });
        clearRender();
      });
      btnStart.innerHTML = "stop";
      isRunning = true;
    };

    //reset to set value tiemr
    let btnReset = document.querySelector(".reset-tiemer-btn");
    btnReset.onclick = () => {
      if (isRunning) stopTimer();
      timer = Array.from(timerCache);
      clearRender();
    };
    //start write input
    let activeInput = document.querySelector(".box-hidden");
    activeInput.onclick = () => {
      indexCursor = 0;
      setCaretPosition(timerInput, indexCursor);
      stopTimer();
      activeInput.style.display = "none";
      clickOutside = 0;
      renderNumbers();
    };
    //click outside of the timer box
    let timerContent = document.querySelector(".timer-content");
    document.addEventListener("mousedown", (e) => {
      if (!timerContent.contains(e.target)) {
        clearCursor();
      }
    });
    //to pomo
    let toPomoBtn = document.querySelector(".to-pomo");
    toPomoBtn.onclick = () =>
      renderComponent(pomodoro, document.getElementById("root"));
  };
  const setActions = () => {
    beforeRender();
  };
  const txt = `
  <div class="timer">
    <ul class="p-nav">
      <button class="to-pomo">Pomo</button>
      <button>Timer</button>
    </ul>
    <div class="content">
      <div class="timer-title">
        <h2>Timer</h2>
      </div>
      <div class="timer-box">
        <div class="timer-content">
          <span class="symbol"></span>
          <span class="timer-number">0</span>
          <span class="timer-number">0</span>
          <span>:</span>
          <span class="timer-number">0</span>
          <span class="timer-number">0</span>
          <span>:</span>
          <span class="timer-number">0</span>
          <span class="timer-number">0</span>
          <div class="box-hidden"></div>
        </div>
        <input id="timer-input" type="tel" />
    </div>
      <div class="timer-buttons">
        <button class="start-timer-btn">start</button>
        <button class="reset-tiemer-btn">reset</button>
      </div>
  </div>`;
  return { setActions, txt };
};
