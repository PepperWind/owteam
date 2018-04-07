module.exports = function(app, auth, users, lobbies) {

  function getIndex(req, res) {
    res.render('index.hbs');
  }

  function postGeneral(req, res) {
    if(req.body.userName == undefined || req.body.userName == '' || req.body.userRank == undefined || req.body.userRank == '' || req.body.playedHeroes == undefined || req.body.playedHeroes == ''
  && (req.session == undefined || (req.session.userName == undefined || req.session.userName == '' || req.session.userRank == undefined || req.session.userRank == '' || req.session.playedHeroes == undefined || req.session.playedHeroes == ''))) {
      res.redirect('/');
      return;
    }
    req.session.userId = auth.makeId(users);
    users[req.session.userId] = {userName: req.body.userName, userRank: req.body.userRank, playedHeroes: req.body.playedHeroes};

    res.render('general.hbs');
  }

  function postLobby(req, res) {
    console.log("Trying to join lobby: " + req.body.lobbyName);
    if(req.body.lobbyName == undefined || req.body.lobbyName == '' || req.session.userId == undefined)
      return postGeneral(req, res);

    if(lobbies[req.body.lobbyName] == undefined) { // If the lobby is being created
      lobbies[req.body.lobbyName] = {};
      lobbies[req.body.lobbyName].leader = req.session.userId;
      lobbies[req.body.lobbyName].players = [req.session.userId];
      lobbies[req.body.lobbyName].lobbyName = req.body.lobbyName;
    }
    else if(lobbies[req.body.lobbyName].players.length >= 6) {
      return postGeneral(req, res);
    }
    else {
      lobbies[req.body.lobbyName].players.push(req.session.userId);
    }

    res.render('lobby.hbs', {lobbyName: req.body.lobbyName, uuid: req.session.userId});
  }

  app.get('/', function(req, res) {
    getIndex(req, res);
  });

  app.post('/general/', function(req, res) {
    postGeneral(req, res);
  });

  app.get('/general/', function(req, res) {
    if(req.session.userId in users)
      res.render('general.hbs');
    else {
      res.render('index.hbs');
    }
  });

  app.post('/lobby/', function(req, res) {
    postLobby(req, res);
  });
};
