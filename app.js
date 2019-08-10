var express = require('express');
var config = require('config');
var app = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('trust proxy', 1) // trust first proxy

// For Passport
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))

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