var RouteHandler = require('./routes');

module.exports = exports = function (app, client) {
	
	var routeHandler = new RouteHandler(client);

	//Requests:
	app.get('/', routeHandler.index);
	app.get('/search/', routeHandler.results);
	app.get('/get_listed', routeHandler.get_listed);
	app.post('/add_company', routeHandler.add_company);
	app.get('*', routeHandler.errorPage);
}