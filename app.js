/**
* Module dependencies.
*/
var express = require('express')
, http = require('http')
, path = require('path'),
  busboy = require("then-busboy"),
  fileUpload = require('express-fileupload'),
  app = express(),
  mysql      = require('mysql'),
  bodyParser=require("body-parser");
  
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
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
app.listen(8001)

require('./routes')(app);