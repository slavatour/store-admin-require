$(document).ready(function () {

	Store.module("Categories.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.SubcategoriesController = Marionette.Controller.extend({
			initialize: function () {
				this.subcategoryModel = new Store.Categories.Models.SubcategoryModel();
				this.subcategoryCollection = new Store.Categories.Collections.SubcategoriesCollection({
					model: this.subcategoryModel
				});
				this.subcategoryModelView = new Store.Categories.Views.SubcategoryModelView({
					model: this.subcategoryModel
				});
				this.subcategoryCollectionView = new Store.Categories.Views.SubcategoryCollectionView({
					collection: this.subcategoryCollection
				});
			},
			fetchCollection: function (id, callbackFunction) {
				this.subcategoryCollection.url = "/subcategories/parent_id/"+id;
				this.subcategoryCollection.fetch({
					success: function (data) {
						callbackFunction(data.toJSON());
					}
				});
				// return this.subcategoryCollection;
			}
		});

	});

});