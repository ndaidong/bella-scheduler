// utils / getDT3


import {
  time,
  now
} from 'bellajs';

export var getDT3 = (mat) => {

  let yy = mat[1] === '*' ? '*' : parseInt(mat[1], 10);
  let mm = mat[2] === '*' ? '*' : parseInt(mat[2], 10);
  let dd = mat[3] === '*' ? '*' : parseInt(mat[3], 10);
  let hh = mat[4] === '*' ? '*' : parseInt(mat[4], 10);
  let ii = mat[5] === '*' ? '*' : parseInt(mat[5], 10);
  let ss = mat[6] === '*' ? '*' : parseInt(mat[6], 10);

  let today = now();
  let ayy = today.getFullYear();

  if (yy !== '*' && yy < ayy) {
    return -1;
  }

  let tyy = yy;
  let tmm = mm;
  let tdd = dd;
  let thh = hh;
  let tii = ii;
  let tss = ss;

  if (yy === '*') {
    tyy = ayy;
  }

  let amm = today.getMonth() + 1;
  if (mm === '*') {
    tmm = amm;
  }
  let add = today.getDate();
  if (dd === '*') {
    tdd = add;
  }
  let ahh = today.getHours();
  if (hh === '*') {
    thh = ahh;
  }
  let aii = today.getMinutes();
  if (ii === '*') {
    tii = aii;
  }

  let gd = new Date(tyy, tmm - 1, tdd, thh, tii, tss);
  let ttime = gd.getTime();
  let ctime = time();
  let delta = ttime - ctime;

  if (delta < 0) {
    if (ii === '*') {
      gd.setMinutes(tii + 1);
      ttime = gd.getTime();
      delta = ttime - ctime;
    }
  }
  if (delta < 0) {
    if (hh === '*') {
      gd.setHours(thh + 1);
      ttime = gd.getTime();
      delta = ttime - ctime;
    }
  }
  if (delta < 0) {
    if (dd === '*') {
      gd.setDate(tdd + 1);
      ttime = gd.getTime();
      delta = ttime - ctime;
    }
  }

  if (delta < 0) {
    if (mm === '*') {
      gd.setMonth(tmm);
      ttime = gd.getTime();
      delta = ttime - ctime;
    }
  }

  if (delta < 0) {
    if (yy === '*') {
      gd.setFullYear(tyy + 1);
      ttime = gd.getTime();
      delta = ttime - ctime;
    }
  }

  return delta;
};
