define(["marionette"], function (Marionette) {
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"slider"				: "showSliderEdit", 

		},
		index: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.indexContainer').css('display', 'block');
		},
		showCategories: function () {
			$('.contentContainer > div').css('display', 'none');
			$('#categoriesContainer').fadeIn();

			var categoriesController = new Store.Categories.Controllers.CategoriesController();
			categoriesController.renderView();
			
		},
		showProducts: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.productsContainer').css('display', 'block');
		},
		showSliderEdit: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.sliderContainer').css('display', 'block');
			var sliderController = new Store.Slider.Controllers.SliderController();
			sliderController.renderView();
		}
	});
	return StoreRouter;
});
