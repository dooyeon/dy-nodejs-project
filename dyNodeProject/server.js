'use strict';
var express = require('express');

var appRoot = require('app-root-path').path;
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
 
var main = require('./router/main');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', main);

app.set('port', 3000 || process.env.PORT);
var server = app.listen(app.get('port'), function () {
    console.log('Express server has started on port : ' + server.address().port);
});