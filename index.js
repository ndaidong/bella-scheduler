/**
 * Load core
 * @ndaidong
**/
var main = require('./dist/scheduler');
main.version = require('./package').version;
module.exports = main;
