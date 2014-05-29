define(["marionette"], function (Marionette) {
	window.Store = new Marionette.Application();

	Store.addRegions({
		categoriesRegion: "#categoriesContainer",
		modalRegion: "#editModal",
		sliderRegion: ".sliderContainer"
	});

	Store.on("initialize:after", function () {
		if(Backbone.history){
			Backbone.history.start();
		}
	});
	return Store;
});
