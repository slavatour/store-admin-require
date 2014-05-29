requirejs.config({
	mainUrl: "javascripts",
	paths: {
		backbone: "libs/backbone",
		"bootstrap-switch": "libs/bootstrap-switch",
		jquery: "libs/jquery",
		less: "libs/less",
		marionette: "libs/backbone.marionette",
		underscore: "libs/underscore"
	},
	shim: {
		
		underscore: {
			exports: "_"
		},

		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		}
	}
});

require(["less", "app", "marionette", ], function (Marionette) {
	
	Store.start();

	require(["routes/routes"], function (StoreRouter) {
		var storeRouter = new StoreRouter();
	});
});