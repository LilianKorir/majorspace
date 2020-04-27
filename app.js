require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
let cookieSession = require('cookie-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.root = (...args) => path.join(__dirname, ...args);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

// Database setup
let Knex = require('knex');
let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);

let { Model } = require('objection');
Model.knex(knex);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'layout'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cookie session
if (process.env.SECRET) {
  app.set('session-secret', process.env.SECRET);
} else {
  app.set('session-secret', 'f3quq4930fdsi');
}

let sessionHandler = cookieSession({
  name: 'session',
  secret: app.get('session-secret')
});
app.use(sessionHandler);


let getUser = require('./getUser');
app.use(getUser);


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
