
"use strict";
const config = require('../config');
const request = require('co-request');
const R = require('ramda');

module.exports = {
  login: function * () {
    let res = yield this.$({
      uri: config.API + '',
      method: '',
      json: true,
      headers: {

      }
    });
    this.status = res.statusCode;
    if (200 === res.statusCode) {
      this.body = {msg: 'OK'}
    } else {
      this.body = res.body;
    }
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
