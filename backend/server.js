var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var authRouter = require('./routes/auth')
// var {skio} = require('./routes/socketio');
var app = express();
let passport = require('passport')
require('./config/passport');
app.use(passport.initialize())

// var io = require("socket.io")(3000)

//Connect to MongoDB

const uri = "mongodb+srv://ngujen1407:123@cluster0-ufaxv.mongodb.net/FindKid?retryWrites=true&w=majority"

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database connected!")
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(skio);
app.use('/', indexRouter);
app.use('/users',passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/uploadRecord', uploadRouter);
app.use('/auth', authRouter)


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
