
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , map = require('./routes/map')
  , twitter = require('./routes/twitter');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/map', map.map);
app.get('/tweets', twitter.twitterSearch)
app.get('/embedded_timeline', twitter.embeddedTimeline)
app.get('/getVenues',map.getVenues)
app.get('/renderVenueList',map.renderVenueList)
app.post('/tweets', twitter.twitterSearch)
app.post('/getLocation',map.getLocation)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
