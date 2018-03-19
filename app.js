/**
* Module dependencies.
*/
var express = require('express')
, http = require('http')
, path = require('path'),
  busboy = require("then-busboy"),
  fileUpload = require('express-fileupload'),
  app = express(),
  mysql = require('mysql'),
  morgan  = require('morgan'),
  bodyParser=require("body-parser");

  //var Sequelize = require('sequelize');
  //var sequelize = new Sequelize('burmacausemanagement', 'root', '', {
  //  host: 'localhost',
  //  dialect: 'mysql',
  //  pool: {
  //    max: 5,
  //    min: 0,
  //    idle: 10000
  //  },
  //
  //
  //});
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

  
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'burmacausemanagement'
 });

 connection.connect();

global.db = connection;

app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});


// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//Middleware
app.listen(8001);
console.log("SERVER LISTENING AT PORT : 8001");
require('./routes')(app);