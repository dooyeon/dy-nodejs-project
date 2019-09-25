'use strict';
const express = require('express');
const session = require('express-session');

const appRoot = require('app-root-path').path;
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
//redis config
// const redis = require(appRoot + '/config/redisConfig.js');
const redis = require(appRoot + '/config/redis')['db_0'];
const environments = require(appRoot + '/config/environments');

let app = express();

//redis setting
app.use(session({
    store: new RedisStore({
        client: redis,
        host: 'localhost',
        port: 6379,
        prefix : "session:",
        db : 0
    }),
    saveUninitialized: false,
    resave: false,
    secret: 'dyLearn',
    cookie: { maxAge: 2592000000 }
}));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
 
const main = require('./router/main');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', main);

app.set('port', environments['port'] || process.env.PORT);
var server = app.listen(app.get('port'), function () {
    console.log('Express server has started on port : ' + server.address().port);
});