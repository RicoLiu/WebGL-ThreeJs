
# Angular.js 

# 开发环境

    $ git clone <this repo>
    $ cd <this repo>
    $ npm install
    $ npm install -g gulp bower
    $ cd public/
    $ bower install
    $ cd ../
    $ gulp
    $ npm start

# 生产环境

    $ npm install -g pm2
    $ gulp
    $ pm2 start app.js -i 2 -n <app name>
