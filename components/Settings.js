import { renderComponent } from "../helpers/render.js";
import { pomodoro } from "./Pomodoro.js";
import {
  setTimerLocalStorage,
  getFromLocalStorage,
} from "./../helpers/timerStorage.js";
const saveTimer = (min, sec) => {
  setTimerLocalStorage("timerFocus", min);
  setTimerLocalStorage("timerBreak", sec);
};

const saveAction = () => {
  let inputFocus = document.querySelector(".input-focus");
  let inputBreak = document.querySelector(".input-break");
  let btnSave = document.querySelector(".btn-save");
  btnSave.onclick = () => {
    saveTimer(inputFocus.value, inputBreak.value);
    renderComponent(pomodoro, document.getElementById("root"));
  };
};
const cancelAction = () => {
  let btnCancel = document.querySelector(".btn-cancel");
  btnCancel.onclick = () => {
    renderComponent(pomodoro, document.getElementById("root"));
  };
};
const beforeRender = () => {
  //variables
  let inputFocus = document.querySelector(".input-focus");
  let inputBreak = document.querySelector(".input-break");
  inputFocus.value = getFromLocalStorage("timerFocus");
  inputBreak.value = getFromLocalStorage("timerBreak");
};
export const SettingsPomodoro = () => {
  const setActions = () => {
      cancelAction();
      saveAction();
      beforeRender();
    },
    txt = `<div class='form-settings'>
    <div class='form-s-group'>
        <label>focus min:</label>
        <input type="number" class="input-focus" min="1" max="100" type="text" />
    </div>
    <div class='form-s-group'>
        <label>break min:</label>
        <input type="number" class="input-break" min="1" max="100" type="text" />
    </div>
    <div class='form-s-group'>
        <button class="btn-cancel">cancel</button>
        <button class="btn-save">save</button>
    </div>
  </div>`;
  return {
    setActions,
    txt,
  };
};
