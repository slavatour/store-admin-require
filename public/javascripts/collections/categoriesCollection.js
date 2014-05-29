$(document).ready(function () {

	Store.module("Categories.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.CategoriesCollection = Backbone.Collection.extend({
			model: Store.Categories.Models.CategoryModel,
			url: "categories"
		});
	});

});