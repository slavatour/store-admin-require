$(document).ready(function () {
	
	Store.module("Slider.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.SliderController = Marionette.Controller.extend({
			initialize: function () {
				this.sliderModel = new Store.Slider.Models.SliderModel();
				this.slidersCollection = new Store.Slider.Collections.SlidersCollection({
					model: this.sliderModel
				});
				this.sliderModelView = new Store.Slider.Views.SliderModelView({
					model: this.sliderModel
				});
				this.slidersCollectionView = new Store.Slider.Views.SlidersCollectionView({
					collection: this.slidersCollection
				});
				Store.reqres.setHandler("slider:model", function () {
					return this.sliderModel;
				},this);
				Store.reqres.setHandler("slider:collection", function () {
					return this.slidersCollection;
				},this);
				Store.reqres.setHandler("slider:modelView", function () {
					return this.sliderModelView;
				},this);
				Store.reqres.setHandler("slider:collectionView", function () {
					return this.slidersCollectionView;
				},this);
			},
			renderView: function () {
				this.slidersCollection.fetch();
				this.slidersCollection.sort();
				Store.sliderRegion.show(this.slidersCollectionView);
			}
			
		});
	});

});