/**
 * Created by famer.me on 16-4-19.
 */

'use strict'
let compress = require('koa-compress');
let logger = require('koa-logger');
let serve = require('koa-static');
let _ = require('koa-route');
let router = require('koa-router');
let json = require('koa-json');
let mount = require('koa-mount');
let sendfile = require('koa-sendfile');
let session = require('koa-generic-session');
let bodyparser = require('koa-bodyparser');
let koa = require('koa');
let path = require('path');

const common = require('./controllers/main');
let auth = require('./controllers/login');


let app = module.exports = koa();

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
  app.listen(3001);
  console.log('listening on port 3001');
}
