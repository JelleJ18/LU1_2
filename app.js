var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./src/routes/index.route');
const usersRouter = require('./src/routes/users.route');
const authRouter = require('./src/routes/auth.route');
const filmsRouter = require('./src/routes/films.route');
const authController = require('./src/controllers/auth.controller');

var app = express();

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_PORT =", process.env.DB_PORT);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_DATABASE =", process.env.DB_DATABASE);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD ? "****" : "MISSING");

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(
  session({
    secret: 'secret_key',
    resave : false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 1000,
    },
  })
);

app.use((req,res,next)=> {
  res.locals.user = req.session.user;
  res.locals.authenticated = !!req.session.user;
  next();
})

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/films', filmsRouter);
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