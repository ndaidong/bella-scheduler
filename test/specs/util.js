/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

import {
  isFunction,
  isObject,
  isArray,
  isInteger,
  time
} from 'bellajs';

import {
  BellaMap,
  getDT1,
  getDT2,
  getDT3
} from '../../src/utils';

test('Test custom Map', (assert) => {

  let sampleMap = new BellaMap();
  assert.ok(isFunction(sampleMap.get), 'sampleMap must have method "get"');
  assert.ok(isFunction(sampleMap.set), 'sampleMap must have method "set"');
  assert.ok(isFunction(sampleMap.remove), 'sampleMap must have method "remove"');
  assert.ok(isFunction(sampleMap.all), 'sampleMap must have method "all"');

  sampleMap.set('abc', {name: 'abc'});
  let abc = sampleMap.get('abc');
  assert.ok(isObject(abc), 'abc must be object');

  let x = sampleMap.get('cab');
  assert.ok(x === null, 'x must be null');

  let all = sampleMap.all();
  assert.ok(isArray(all), 'all must be array');
  assert.ok(all.length === 1, 'all.length must be 1');

  sampleMap.remove('abc');
  all = sampleMap.all();
  assert.ok(isArray(all), 'all must be array');
  assert.ok(all.length === 0, 'all.length now must be 0');

  x = sampleMap.remove('cab');
  assert.ok(x === false, 'x must be false');

  assert.end();
});

test('Test getDT1', (assert) => {
  let reg = /^(\d+)\s?(d|h|m|s)+$/i;
  let pat = '1s'.match(reg);

  let t = time() - 1000;
  let x = getDT1(pat, t);

  assert.ok(isInteger(x), `getDT1(pat, ${t}) must be a number`);
  assert.end();
});

test('Test getDT2', (assert) => {
  let reg = /^(sun|mon|tue|wed|thu|fri|sat)+\w*\s+(\d+)(:\d+)?(:\d+)?$/i;
  let pat = 'sun 18:00'.match(reg);
  let x = getDT2(pat);

  assert.ok(isInteger(x), 'getDT2(pat) must be a number');
  assert.end();
});


test('Test getDT3', (assert) => {
  let reg = /^(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\d+)$/i;
  let pat1 = '* * * * * 00'.match(reg);
  let x1 = getDT3(pat1);
  assert.ok(isInteger(x1), 'getDT3(pat1) must be a number');

  let pat2 = '1000 * * * * 00'.match(reg);
  let x2 = getDT3(pat2);
  assert.ok(isInteger(x2), 'getDT3(pat2) must be a number');
  assert.end();
});
