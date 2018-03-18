module.exports = function(app, io, users, lobbies) {

  const MAX_USERS = 200000;
  users.availableIds = [];

  lobbies.Lopes = true;

  for(var i = 0; i < MAX_USERS; i++) {
    users.availableIds.push(MAX_USERS-i-1);
  }

  io.on('connection', function(client) {
    console.log('Client connected.');

    client.on('checkLobbyExists', function(data) {
      console.log("Checking if lobby exists: "+data);

      if(typeof data != "string") {
        console.log("Not a string sent.");
        return;
      }
      console.log(data);
      console.log(data in lobbies);
      console.log(data in lobbies);

      if(data in lobbies)
        client.emit('checkLobbyExists', true);
      else
        client.emit('checkLobbyExists', false);
    });

    /*client.on('createLobby', function(data) {
      console.log(data);

    });*/

    client.on('chat', function(data){
      io.emit('chat.'+data[0], data);
      console.log(data);
    });

    client.on('disconnect', function() {
      if(!client.userName) return;

      delete users[client.userId];
    });
  });

};
