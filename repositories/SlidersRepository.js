var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.SlidersRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.dbRepository(conString);

	self.fetchSliders = function (callbackFunction) {
		var command = "SELECT * FROM slider ORDER BY number;"
		dbRepository.actionData(command, function (result) {
			for (var i = 0; i < result.length; i++) {
				if(result[i].img_name) {
					var folder = path.resolve(__dirname, "..", "public/images/temp/", result[i].img_name);
					var command = "SELECT lo_export(slider.img, '"+folder+"') FROM slider WHERE id = "+result[i].id+";"
					dbRepository.actionData(command);
				}
			};
			callbackFunction(result);
		});	
	},
	self.putSlider = function (id, model, file) {
		var command = "SELECT * FROM slider WHERE id='"+id+"';";
		dbRepository.actionData(command, function (result) {
			if(result[0]) {
				for (key in model) {
					var command = "UPDATE slider SET "+key+" = '"+model[key]+"' WHERE id = "+id+";";
					dbRepository.actionData(command);
				};
				var fileName = "slider"+id+".png";
				if(file !== undefined && file.file !== undefined) {
					var command = "UPDATE slider SET img = lo_import('"+file.file.path+"') WHERE id = "+id+";"
					dbRepository.actionData(command, function (result) {
						var command = "UPDATE slider SET img_name = '"+fileName+"' WHERE id = "+id+";"
						dbRepository.actionData(command);
						fs.unlink(file.file.path, function (err) {
							if(err){
								console.error('error delete tepl file', err);
							};
						});
					});
				};
			};
		});	
	},
	self.saveSlider = function (model, file) {
		var command = "SELECT max(number) FROM slider;";
		dbRepository.actionData(command, function (result) {
			for(key in model) {
				if(model[key] === undefined) {
					model[key] = "";
				}
			}
			if(!result[0]) {
				model.number = 1;
			} else {
				model.number = 1*result[0].max+1;
			}
			var command = "SELECT max(id) FROM slider;";
			dbRepository.actionData(command, function (result) {
				var command = "INSERT INTO slider (number, name, description, url, img, img_name) VALUES ("+
					model.number+", '"+model.name+"', '"+model.description+"', '"+model.url+"', lo_import('"+
					file.file.path+"'), 'slider"+(result[0].max+1)+".png')";
				dbRepository.actionData(command);
			});
		});
	},
	self.deleteSlider = function (id) {
		var command = "DELETE FROM slider WHERE id="+id+";";
		dbRepository.actionData(command);
	}

	return self;
}