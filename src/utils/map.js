/**
 * bella-scheduler
 * @ndaidong
**/

import {
  isUndefined,
  hasProperty
} from 'bellajs';

export class BellaMap {
  constructor() {
    this.size = 0;
    this.data = {};
  }

  set(k, v) {
    let d = this.data;
    if (!hasProperty(d, k)) {
      this.size++;
    }
    d[k] = v;
    return this;
  }

  get(k) {
    let d = this.data;
    return d[k] || null;
  }

  all() {
    let d = this.data;
    let a = [];
    for (let k in d) {
      if (!isUndefined(d[k])) {
        a.push(d[k]);
      }
    }
    return a;
  }

  remove(k) {
    let d = this.data;
    if (!hasProperty(d, k)) {
      return false;
    }
    d[k] = null;
    delete d[k];
    this.size--;
    return true;
  }
}
