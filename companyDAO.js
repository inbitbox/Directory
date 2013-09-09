function CompanyDAO(client) {

	// Must be new object:
    if (false === (this instanceof CompanyDAO)) {
        console.log('Warning: CompanyDAO constructor called without "new" operator');
        return new CompanyDAO(client);
    }

    this.getCompaniesByName = function(query, callback) {
    	
    	client.query("SELECT company_name FROM directory WHERE search_name~*lower('" + query + "');", function(err, result) {
			if(err){
				console.log('error in getCompaniesByName');
				process.exit();
			}

			callback(err,result.rows);

		});
    };

    this.add_new_company = function(query, callback) {
    	
    	query['id'] = Math.floor(Math.random()*50);
    	query['search'] = query['name'].toLowerCase();
    	

    	client.query("INSERT INTO directory (company_id, company_name," + 
    		"search_name, contact, rating, description) VALUES ('" + 
    		query['id'].toString() + "', '" + query['name'] + "', '" + query['search'] + 
    		"', '" + query['contact'] + "', 0, '" + query['description'] + "');", function(err, result) {

	    	if(err){
	    		console.log('error in add_new_company');
	    		console.log(err);
	    		process.exit();
	    	}

	    	callback(err, result);
	    });
    };
}

exports.CompanyDAO = CompanyDAO;


