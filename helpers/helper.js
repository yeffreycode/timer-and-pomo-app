export function setCaretPosition(ctrl, pos) {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

export function doGetCaretPosition(ctrl) {
  var CaretPos = 0;
  // IE Support
  if (document.selection) {
    ctrl.focus();
    var Sel = document.selection.createRange();
    Sel.moveStart("character", -ctrl.value.length);
    CaretPos = Sel.text.length;
  }
  // Firefox support
  else if (ctrl.selectionStart || ctrl.selectionStart == "0")
    CaretPos = ctrl.selectionStart;

  return CaretPos;
}

export const parseArrayToTimer = (a) => {
  let timer = {
    hours: parseInt(a[0] + a[1]),
    minutes: parseInt(a[2] + a[3]),
    seconds: parseInt(a[4] + a[5]),
  };
  return timer;
};

export const parseTimerToArray = (timer) => {
  let a = [];
  a[0] = parseNumberToString(timer.hours)[0];
  a[1] = parseNumberToString(timer.hours)[1];
  a[2] = parseNumberToString(timer.minutes)[0];
  a[3] = parseNumberToString(timer.minutes)[1];
  a[4] = parseNumberToString(timer.seconds)[0];
  a[5] = parseNumberToString(timer.seconds)[1];
  return a;
};

export const parseNumberToString = (n) => {
  if (!n) return "00";
  if (n < 10 && n > -10) return "0" + (n < 0 ? n * -1 : n);
  return n < 0 ? (n * -1).toString() : n.toString();
};

export const isNegativeTimer = (timer) => {
  return timer.hours < 0 || timer.minutes < 0 || timer.seconds < 0;
};

export const isNumberNegative = (n) => n < 0;

export const noNumberInput = (value) => {
  if (!value) return false;
  return value.match(/^\d+$/) ? false : true;
};
