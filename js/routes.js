module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.hbs', {title:"Lopes !"});
  });

  app.get('/general/', function(req, res) {
    res.render('general.hbs');
  });

  app.get('/lobby/', function(req, res) {
    res.render('lobby.hbs');
  });
};
