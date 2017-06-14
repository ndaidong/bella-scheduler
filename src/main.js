/**
 * bella-scheduler
 * @ndaidong
**/

const MAX_TIMEOUT = 2147483647;

import {
  time,
  createId
} from 'bellajs';

import {
  BellaMap,
  getDT1,
  getDT2,
  getDT3
} from './utils';

var TaskList = new BellaMap();
var checkTimer;

var getDelayTime = (pat, lastTick) => {

  let pt1 = /^(\d+)\s?(d|h|m|s)+$/i;
  let pt2 = /^(sun|mon|tue|wed|thu|fri|sat)+\w*\s+(\d+)(:\d+)?(:\d+)?$/i;
  let pt3 = /^(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\d+)$/i;

  let mat = pat.match(pt1);
  if (mat) {
    return getDT1(mat, lastTick);
  }

  mat = pat.match(pt2);
  if (mat) {
    return getDT2(mat);
  }

  mat = pat.match(pt3);
  if (mat) {
    return getDT3(mat);
  }

  return -1;
};

var execute = (task) => {
  task.fn();
  let id = task.id;
  if (!task.repeat) {
    return TaskList.remove(id);
  }

  let t = time();
  task.lastTick = t;
  TaskList.set(id, task);
  return true;
};

var updateTimer = () => {
  if (checkTimer) {
    clearTimeout(checkTimer);
  }
  if (TaskList.size > 0) {
    let minDelay = MAX_TIMEOUT;
    let candidates = [];
    TaskList.all().forEach((task) => {
      let id = task.id;
      let delay = getDelayTime(task.time, task.lastTick);
      if (delay < 0) {
        TaskList.remove(id);
      } else if (delay === 0) {
        task.delay = 0;
        candidates.push(task);
      } else {
        task.delay = delay;
        TaskList.set(id, task);
        if (delay <= minDelay) {
          minDelay = delay;
          let arr = [];
          arr = candidates.concat(task);
          candidates = arr.filter((item) => {
            return item.delay <= minDelay;
          });
        }
      }
    });
    if (candidates.length) {
      checkTimer = setTimeout(() => {
        candidates.map(execute);
        setTimeout(updateTimer, 1);
      }, minDelay);
    }
  }
};

var register = (t, fn, once) => {
  let rep = once ? 0 : 1;
  let n = time();
  let id = createId(32);
  let task = {
    id,
    fn,
    time: t,
    repeat: rep,
    createdAt: n,
    lastTick: n,
    delay: 0
  };
  TaskList.set(id, task);
  updateTimer();
  return id;
};

export const yearly = (t, fn) => {
  let pt = '* ' + t;
  return register(pt, fn);
};

export const monthly = (t, fn) => {
  let pt = '* * ' + t;
  return register(pt, fn);
};

export const daily = (t, fn) => {
  let pt = '* * * ' + t;
  return register(pt, fn);
};

export const hourly = (t, fn) => {
  let pt = '* * * * ' + t;
  return register(pt, fn);
};

export const every = (t, fn) => {
  return register(t, fn);
};

export const once = (t, fn) => {
  return register(t, fn, 1);
};

export const unregister = (id) => {
  if (TaskList.remove(id)) {
    updateTimer();
    return true;
  }
  return false;
};
