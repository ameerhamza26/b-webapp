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
  var Twit = require('twit');
  var config = require('./config');

  var _ = require('lodash');
  global._ = _;  

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
  cookie: { maxAge: 60000*5 }
}))

  
 var connection = mysql.createConnection(config.dbConfig);

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



var T = new Twit({
  consumer_key:         'x1s5bZ0BBkLXEOQF0cUooj86z',
  consumer_secret:      'SZAIIJLgHSpSLnAemfHUwtJg3NCKxn1GzQHoHx8oGkpGmRg8zq',
  access_token:         '1288779955-yzF86U49qgjTZjiXSOt3dELarFJUouiAXO4XwxO',
  access_token_secret:  '9TI9PeEETzfeCcgCyVcpEQYTvmRRwptehcE5NubcsQu6U',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


// var stream = T.stream('statuses/filter', { track: 'mango' })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

var server = http.createServer(app);
var io = require('socket.io')(server,{log:false, origins:'*:*'});


//Middleware
//app.listen(8001);
server.listen(8001, '', function(){
  console.log("Server up and running...");
  });

console.log("SERVER LISTENING AT PORT : 8001");
require('./routes')(app);


io.on('connection', (socket) => {

  console.log('Socket.io connected');

  socket.on('hash', function(hash){
    var streamHash = hash.hash;
    T.get('search/tweets', { q: 'PSL3', count: 100 }, function(err, data, response) {
      io.emit('latest-tweets', data);
    })

    var stream = T.stream('statuses/filter', { track: 'PSL3' });

    stream.on('tweet', function (tweet) {
      io.emit('stream', {text:tweet.text, name:tweet.user.name, username:tweet.user.screen_name, icon:tweet.user.profile_image_url, hash:streamHash});
    });
  });
});