var express = require('express');
var hbs = require('express-handlebars');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var users = lobbies =  {};

var externalRoutes = require('./js/routes')(app);
var communicator = require('./js/communicator')(app, io, users, lobbies);

app.use(express.static(__dirname + '/node_modules'))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + 'views/layouts/'}));
app.set('view engine', 'hbs')

/*io.on('connection', function(client) {
  console.log('Client connected.');
  client.on('join', function(data) {
  });

  client.on('chat', function(data){
  });

  client.on('disconnect', function() {
  });
});*/

server.listen(8080);
