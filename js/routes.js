module.exports = function(app, auth, users) {
  app.get('/', function(req, res) {
    res.render('index.hbs');
  });

  app.post('/general/', function(req, res) {
    console.log("General query: ", req.body);
    if(req.body.userName == undefined || req.body.userName == '' || req.body.userRank == undefined || req.body.userRank == '' || req.body.playedHeroes == undefined || req.body.playedHeroes == '') {
      res.redirect('/');
      return;
    }
    req.session.name = req.body.username;
    req.session.userRank = req.body.userRank;
    req.session.playedHeroes = req.body.playedHeroes;

    res.render('general.hbs');
  });

  app.get('/lobby/', function(req, res) {
    console.log(req.query);
    res.render('lobby.hbs', {userName: req.session.userName, userRank: req.session.userRank, playedHeroes: req.session.playedHeroes.split(',')});
  });
};
