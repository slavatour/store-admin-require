var pg = require('pg');

exports.CategoriesRepository = function (conString) {
	var self = {};
	self.fetchCategories = function (callbackFunction) {
		var client = new pg.Client(conString);
		client.connect(function (err) {
			if(err) {
				return console.error('could not connect to pg', err);
			}
			var command = 'SELECT * FROM categories;';
			client.query(command, function (err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				callbackFunction(result.rows);
				client.end();
			});
		});
	}

	return self;
}