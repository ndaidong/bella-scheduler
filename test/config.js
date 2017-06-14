var es6Scheduler = require('../src/main');
var fullScheduler = require('../dist/scheduler');
var minScheduler = require('../dist/scheduler.min');

module.exports = {
  schedulers: [es6Scheduler, fullScheduler, minScheduler]
};
