/**
 * Created by famer.me on 16-4-19.
 */

var config = require('../config');
var request = require('co-request');
var R = require('ramda');

module.exports = {
  login: function * () {
    var res = yield this.$({
      uri: config.API_HOST_TENANT_ADMIN + '/V1/adminportal/private/tenant/login',
      method: 'POST',
      json: true,
      headers: {
        username: this.request.body.username,
        password: this.request.body.password
      }
    });
    this.status = res.statusCode;
    if (200 === res.statusCode) {
      this.body = { msg: 'ok' };
    } else {
      this.body = { msg: '%>_<%' };
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
