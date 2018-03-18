var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);

app.use(session({
  secret: "yPyL2j6hHCGKfUQ38plS3NiooCjsszD9a1kVGD4feFJMzUnb9sHt1EePrMPDKQNr",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var io = require('socket.io')(server);
var users = lobbies =  {};

var auth = require('./js/auth');
var externalRoutes = require('./js/routes')(app, auth, users);
var communicator = require('./js/communicator')(app, io, users, lobbies);

app.use(express.static(__dirname + '/node_modules'))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + 'views/layouts/'}));
app.set('view engine', 'hbs')

server.listen(8080);
