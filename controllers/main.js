
"use strict";
const request = require('co-request')
const debug = require('debug')
const R = require('ramda')

module.exports = {
  $: function * (next) {
    this.$ = function () {

      // 默认添加的头和配置
      if (typeof arguments[0] === 'object') {
        if (typeof arguments[0].headers === 'object') {
          arguments[0].headers.token = this.session.token
        } else {
          arguments[0].headers = { token: this.session.token }
        }

        if (undefined === arguments[0].timeout) {
          arguments[0].timeout = 25000
        }
      }

      return request.apply(request, arguments).then((res) => {
        debug('es_building:response')(JSON.stringify(res))
        if(!(res.headers === undefined || res.headers.token === undefined)){
          this.session.token = R.path(['headers', 'token'], res)
          debug('es_building:token')(this.session.token)
        }
        if (2 === Math.floor(res.statusCode / 100)) {
          this.cookies.set('auth', 'pass', {
            expires:new Date(Date.now() + 59 * 60 * 1000),
            path : '/',
            httpOnly: false
          });
        } else {
          //统一处理错误码
          switch (res.headers.resultcode) {

          }
        }
        return res;
      })
    }
    yield next
  }
};
