var express = require('express'),
	routes = require('./routes'),
	pg = require('pg');

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Connect to postgresql:
var conString = "postgres://MatthewNeubauer:Rangers6@localhost/template1";
var client = new pg.Client(conString);

client.connect(function(err) {
	if(err) {
		console.log("Error connecting to postgres");
		process.exit();
	}

	// Directs to ./routes/index.js:
	routes(app, client);

	var port = 8888;
	app.listen(port);
	console.log("listening on port " + port);
});

