$(document).ready(function () {
	
	Store.module("Slider.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.SlidersCollection = Backbone.Collection.extend({
			model: Store.Slider.Models.SliderModel,
			url: "slider",
			comparator: function (modelA, modelB) {
				if(1*modelA.get('number') > 1*modelB.get('number')) {
					return 1;
				} else {
					return -1;
				}
			}
		});
	});

});