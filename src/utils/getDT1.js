// utils / getDT1

import {
  time
} from 'bellajs';

export var getDT1 = (mat, lastTick) => {

  let delta = 0;
  let passed = time() - lastTick;

  if (!mat) {
    return -1;
  }
  let v = parseInt(mat[1], 10);
  let s = mat[2];
  if (s === 's') {
    delta = 1000;
  } else if (s === 'm') {
    delta = 6e4;
  } else if (s === 'h') {
    delta = 6e4 * 60;
  } else if (s === 'd') {
    delta = 6e4 * 60 * 24;
  }
  delta *= v;
  return delta - passed;
};
