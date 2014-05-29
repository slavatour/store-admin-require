$(document).ready(function () {

	Store.module("Categories.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.SubcategoriesCollection = Backbone.Collection.extend({
			model: Store.Categories.Models.SubcategoryModel,
			url: "subcategories",
			parse: function (response) {
				this.reset(response);
			}
		});
	});

});