/**
 * Created by famer.me on 16-4-19.
 */

var config = require('../config');
var request = require('co-request');
var R = require('ramda');

module.exports = {
  login: function * () {

  },
  check: function * (next) {
    if (/\/api\/*/.test(this.req.url) && undefined === this.session.token) {
      this.status = 401;
      this.body = {msg: 'o(>﹏<)o'};
    } else {
      yield* next;
    }
  }
};
