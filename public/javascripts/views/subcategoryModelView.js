$(document).ready(function () {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SubcategoryModelView = Backbone.Marionette.ItemView.extend({
			tagName: "div",
			template: "#subcategoriesModelTemplate"
		});
	});

});