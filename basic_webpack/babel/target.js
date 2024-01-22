"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var a = 2 + 3 * 4;
var add = function add() {
  return 2 + 3 * 4;
};
var obj = Object.assign({}, {
  a: 1,
  b: 2
}, {
  b: 3,
  c: 4
});
Promise.resolve(1);