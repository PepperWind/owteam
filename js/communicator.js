module.exports = function(app, io, users, lobbies) {

  io.on('connection', function(client) {
    client.on('checkLobbyExists', function(data) {

      if(typeof data != "string") {
        return;
      }

      if(data in lobbies)
        client.emit('checkLobbyExists', true);
      else
        client.emit('checkLobbyExists', false);
    });

    client.on('getLobbyPlayers', function(data) { // data = {dataPlayerId, dataLobbyName}
      if(data.dataPlayerId == undefined || data.dataLobbyName == undefined || typeof data.dataPlayerId != "string" || typeof data.dataLobbyName != "string" || lobbies[data.dataLobbyName] == undefined)
        return;

      client.join(data.dataLobbyName);
      client.playerId = data.dataPlayerId;

      users[data.dataPlayerId].lobby = data.dataLobbyName;

      var payload = [];
      for(var playerId in lobbies[data.dataLobbyName].players) {
        var isLeader = (data.dataPlayerId == lobbies[data.dataLobbyName].leader);
        payload.push({userName: users[lobbies[data.dataLobbyName].players[playerId]].userName, userRank: users[lobbies[data.dataLobbyName].players[playerId]].userRank, playedHeroes: users[lobbies[data.dataLobbyName].players[playerId]].playedHeroes, isLeader: isLeader});
      }

      io.in(data.dataLobbyName).emit('getLobbyPlayers', payload);
    })

    client.on('getLobbyList', function(data) {
      data = [];

      for(lobby of lobbies) {
        if() // TODO
      }
    });

    client.on('updateWantedHeroes', function(data) {
      // TODO Check if the player is the leader
    }

    client.on('disconnect', function() {
      if(client.playerId == undefined) {
        console.log("Client disconnected but had no player id.");
        return;
      }
      if(users[client.playerId].lobby == undefined || lobbies[users[client.playerId].lobby] == undefined) {
        console.log("Client disconnected but was not in a lobby.");
        return;
      }
      console.log("Client disconnected !");


      if(lobbies[users[client.playerId].lobby].players.length == 1 || lobbies[users[client.playerId].lobby].leader == client.playerId) {
        io.in(users[client.playerId].lobby).emit('lobbyDestroyed');
        delete lobbies[users[client.playerId].lobby];
        delete users[client.playerId].lobby;
        return;
      }

      delete lobbies[users[client.playerId].lobby].players[client.playerId];
      delete users[client.playerId].lobby;
    });
  });

};
