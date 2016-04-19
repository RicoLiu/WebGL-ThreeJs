/**
 * Created by famer.me on 16-4-19.
 */

'use strict'
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var _ = require('koa-route');
var router = require('koa-router');
var json = require('koa-json');
var mount = require('koa-mount');
var sendfile = require('koa-sendfile');
var session = require('koa-generic-session');
var bodyparser = require('koa-bodyparser');
var koa = require('koa');
var path = require('path');

const common = require('./controllers/main');
var auth = require('./controllers/login');


var app = module.exports = koa();

app.keys = ['es_building', 'Front_end'];
app.use(bodyparser());

app.use(session({ store: require('koa-redis')({  }), cookie: { maxage: 60 * 60 * 1000 }, rolling: true ,ttl: 12 * 60 * 60 * 1000}));
// Logger
app.use(logger());
// Json
app.use(json());
app.use(common.$);

//node进行API转发配置
app.use(_.post('/api/login', auth.login));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

app.use(_.get('/*',  function * () {
  yield* sendfile.call(this, './views/main.html');
}));
// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
