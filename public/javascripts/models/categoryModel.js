$(document).ready(function () {

	Store.module("Categories.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.CategoryModel = Backbone.Model.extend({
			defaults: {
				id: null,
				name: "noname",
				serial_number: null,
				subcategories: null
			},
			initialize: function () {
				this.id = this.get('id');
			},
			urlRoot: "category"
		});
	});

});