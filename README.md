bella-scheduler
========

Lightweight util for handling schedule in your Node.js and browser apps.

[![NPM](https://badge.fury.io/js/bella-scheduler.svg)](https://badge.fury.io/js/bella-scheduler)
[![Build Status](https://travis-ci.org/ndaidong/bella-scheduler.svg?branch=master)](https://travis-ci.org/ndaidong/bella-scheduler)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/bella-scheduler/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/bella-scheduler?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/bella-scheduler.svg)](https://gemnasium.com/github.com/ndaidong/bella-scheduler)
[![Known Vulnerabilities](https://snyk.io/test/npm/bella-scheduler/badge.svg)](https://snyk.io/test/npm/bella-scheduler)


## Setup

- Node.js

  ```
  npm install bella-scheduler --save
  ```

- CDN

  - [scheduler.js](https://cdn.rawgit.com/ndaidong/bella-scheduler/master/dist/scheduler.js)
  - [scheduler.min.js](https://cdn.rawgit.com/ndaidong/bella-scheduler/master/dist/scheduler.min.js)

- This library also supports ES6 Module, AMD and UMD style.


# Usage

```
var scheduler = require('bella-scheduler');

scheduler.once('5s', () => {
  console.log('Resolved task.');
});

scheduler.every('sunday 8:00', () => {
  console.log('Resolved a task on Sunday at 8 AM.');
});

scheduler.daily('15:00', () => {
  console.log('Resolved a daily task at 3 PM...');
});
```

# APIs

 - .every(String pattern, Function callback)
 - .once(String pattern, Function callback)
 - .hourly(String pattern, Function callback)
 - .daily(String pattern, Function callback)
 - .monthly(String pattern, Function callback)
 - .yearly(String pattern, Function callback)


Almost cases you can use this library instead of setInterval or setTimeout, because it runs only one timer for the entire process. Regarding parameter "pattern" for .every(), it may be:

**1, A string in the format of 'Y m d h i s'.**

For example:

    - .every('2040 05 16 15 30 10', callback);
       --> run callback at 15:30:10 on May 16, 2040
    - .every('* 05 16 15 30 10', callback);
       --> run callback at 15:30:10 on May 16 of years
       --> similar to yearly('05 16 15 30 10', callback)
    - .every('* * 16 15 30 10', callback);
       --> run callback at 15:30:10 on the 16th of months
       --> similar to monthly('16 15 30 10', callback)
    - .every('* * * 15 30 10', callback);
       --> run callback at 15:30:10 of days
       --> similar to daily('15 30 10', callback)
    - .every('* * * * 30 10', callback);
       --> run callback at the 10th second of the 30th minute of hours
       --> similar to hourly('30 10', callback)
    - .every('* * * * * 10', callback);
       --> run callback at the 10th second of minutes.

**2, A string in the format of 'weekday H:i:s'.**

For example:

    - .every('sunday 15:30:10', callback);
       --> run callback on Sundays at 15:30:10
    - .every('sunday 15:30', callback);
       --> run callback on Sundays at 15:30:00
    - .every('sunday 15', callback);
       --> run callback on Sundays at 15:00:00

It's possible to use "sun" instead of "sunday", "mon" for "monday", and so on.

**3, A string in the format of 'N unit'.**

For example:

    - .every('5m', callback)
       --> call callback every 5 minutes
    - .once('5m', callback)
       --> call callback in 5 minutes, then stop

The available units: **d** (days), **h** (hours), **m** (minutes), **s** (seconds).

The method .once() do the same thing as .every(), but just once. The 4 remain methods yearly(), monthly(), daily(), hourly() can be looked as the shortcuts of every().


# Test

```
git clone https://github.com/ndaidong/bella-scheduler.git
cd bella-scheduler
npm install
npm test
```

# License

The MIT License (MIT)
