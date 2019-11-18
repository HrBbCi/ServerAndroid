var express = require('express');
var config = require('config');
var app = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var path, crypto;
path = require('path');
crypto = require('crypto');
var multer = require('multer');
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

var socket = require('socket.io');

var server = app.listen(port, host, function () {
  console.log("Running", port);
});

let io = socket(server);

io.on('connection', function (socket) {
  socket.on('client-send-log', function (msg) {
    io.sockets.emit('message', msg);
    console.log(msg);
  });
});

var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage
});
// Post files
app.post('/upload', upload.single('upload'), function (req, res) {
  console.log(req.file);
  res.redirect("/uploads/" + req.file.filename);
  return res.status(200).end();
});

app.get('/uploads/:upload', function (req, res) {
  file = req.params.upload;
  var img = fs.readFileSync(__dirname + "/public/images/" + file);
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(img, 'binary');
});
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });