var pg = require('pg');

exports.dbRepository = function (conString) {
	var self = {};

	self.actionData = function (command, callbackFunction) {
		var client = new pg.Client(conString);
		client.connect(function (err) {
			if(err) {
				return console.error('could not connect to pg', err);
			}
			
			client.query(command, function (err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				if(callbackFunction) {
					callbackFunction(result.rows);
				}
				client.end();
			});
		});
	}

	return self;
}