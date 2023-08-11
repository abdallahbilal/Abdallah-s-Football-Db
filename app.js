var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//mongoose inpput

var configs = require('./configs/globals');
var mongoose = require('mongoose'); 


var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var teamRouter = require('./routes/teams');

// Import passport modules
var passport = require('passport');
var session = require('express-session');
var User = require('./models/user.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 's2023FootbalDatabase',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

// Set passport to write/read user data to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/teams', teamRouter);


//database connection
mongoose
.connect(configs.db, {useNewUrlParser: true, useUnifiedTopology:true})
.then((message)=>{
  console.log("connected Succesfully!");
})
.catch((error)=>{
  console.log("error while connecting");
})

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
