[![Build Status](https://travis-ci.org/RicoLiu/WebGL-ThreeJs.svg?branch=master)](https://travis-ci.org/RicoLiu/WebGL-ThreeJs)

# Angular.js 

# 开发环境

    $ git clone <this repo>
    $ cd <this repo>
    $ npm install
    $ npm install -g gulp bower
    $ cd public/
    $ bower install
    $ cd ../
    $ gulp || npm run build
    $ npm start

# 生产环境

    $ npm install -g pm2
    $ gulp || npm run build
    $ pm2 start app.js -i 2 -n <app name>
