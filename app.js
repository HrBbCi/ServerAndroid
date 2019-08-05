var express = require('express');
var config = require('config');
var app = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
// var env = require('dotenv').config({path: __dirname + '.env'});
// var exphbs = require ('express-handlebars')
//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// For Passport

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.set('trust proxy', 1) // trust first proxy
//Models
// var models = require("./apps/models");
// //Sync Database
// models.sequelize.sync().then(function () {
//   console.log('Nice! Database looks fine')
// }).catch(function (err) {
//   console.log(err, "Something went wrong with the Database Update!")
// });

// For Passport
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// //load passport strategies
// //Models
// var models = require("./apps/models");
// var passport = require("./apps/config/passport/passport.js")(passport, models.user);

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs"); // render dc data động cho client

var routes = require('./apps/routes/route');
routes(app);

//Static folder althernative for public
app.use("/static", express.static(__dirname + "/public"));

var controllers = require(__dirname + "/apps/controllers");
app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");
app.listen(port, host, function () {
  console.log("Running", port);
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });