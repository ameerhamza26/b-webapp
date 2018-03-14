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
  
  
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'burmacausemanagement'
 });

 connection.connect();

global.db = connection;

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