module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.hbs');
  });

  app.get('/general/', function(req, res) {
    if(req.query.userName == undefined || req.query.userName == '' || req.query.userRank == undefined || req.query.userRank == '' || req.query.playedHeroes == undefined || req.query.playedHeroes == '')
      res.render()
    res.render('general.hbs', {title});
  });

  app.get('/lobby/', function(req, res) {
    console.log(req.query);
    res.render('lobby.hbs');
  });
};
