var CompanyDAO = require('../companyDAO').CompanyDAO;
	
function routeHandler (client) {

	var companies = new CompanyDAO(client);
	
	// Landing page
	this.index = function(req, res){
		console.log("Loading the directory");
		res.render('index', { title: 'Directory.' });
	};

	// Results page
	this.results = function(req, res){
		
		// Get search
		if (req.query.search_input != '') {
			console.log("Loading the results page");
			var search_query = req.query.search_input;

			// Call to find companies:
			companies.getCompaniesByName(search_query, function(err, result) {
				console.log(result);
				
				// Render results page with apprpriate info:
				res.render('results', {
					search: search_query, 
					companies: result
				});
			});
		}
		else {

			// Empty search request redirects to landing page:
			res.redirect('/');
		}
	};

	// Render Get Listed page:
	this.get_listed = function(req, res){
		var info = {
			name: '',
			contact: '',
			description:''
		};
		res.render('get_listed', {info: info});
	};

	this.add_company = function(req, res){
		
		// If not enough info is put in do not change screens:
		if (req.body.name == '' || req.body.contact == '' 
				|| req.body.description == '') {
			console.log("Not enough input");
			res.render('get_listed', {info: req.body, error: 'All fields are required'});
		}
		else {

			// Render thank you page if info is proper:
			companies.add_new_company(req.body, function(err, result) {
				res.render('thank_you');
			});
		}
	
	};

	// No page found:
	this.errorPage = function(req, res) {
		console.log("Loading the error page");
		res.render('errorPage');
	}
}

module.exports = routeHandler;
