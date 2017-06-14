// utils / getDT2

import {
  time,
  now
} from 'bellajs';

var getIndex = (arr, item) => {
  let r = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      r = i;
      break;
    }
  }
  return r;
};

var getNextDay = (t, tday) => {
  let d = new Date(t);
  d.setDate(d.getDate() + tday + 7 - d.getDay() % 7);
  return d;
};

export var getDT2 = (mat) => {
  let wds = 'sun|mon|tue|wed|thu|fri|sat'.split('|');
  let today = now();
  let wday = today.getDay();

  let awd = wds[wday];
  let awi = getIndex(awd, wds);

  let dd = mat[1].toLowerCase();
  let ddi = getIndex(dd, wds);

  let hh = 0;
  let ii = 0;
  let ss = 0;
  if (mat[2]) {
    hh = parseInt(mat[2], 10);
  }
  if (mat[3]) {
    ii = parseInt(mat[3].replace(/\D/gi, ''), 10);
  }
  if (mat[4]) {
    ss = parseInt(mat[4].replace(/\D/gi, ''), 10);
  }

  today.setHours(hh);
  today.setMinutes(ii);
  today.setSeconds(ss);

  let ttime = today.getTime();
  let ctime = time();

  let nextDay = today;
  if (ddi < awi || ctime > ttime) {
    nextDay = getNextDay(today, awi);
  }
  nextDay.setHours(hh);
  nextDay.setMinutes(ii);
  nextDay.setSeconds(ss);

  return nextDay.getTime() - ctime;
};
