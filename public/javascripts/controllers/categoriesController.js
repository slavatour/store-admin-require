$(document).ready(function () {

	Store.module("Categories.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.CategoriesController = Marionette.Controller.extend({
			initialize: function () {
				this.categoryModel = new Store.Categories.Models.CategoryModel();
				this.categoriesCollection = new Store.Categories.Collections.CategoriesCollection({
					model: this.categoryModel
				});
				this.categoryModelView = new Store.Categories.Views.CategoryModelView({
					model: this.categoryModel
				});
				this.categoriesCollectionView = new Store.Categories.Views.CategoryCollectionView({
					collection: this.categoriesCollection
				});
				Store.reqres.setHandler("category:model", function () {
					return this.categoryModel;
				},this);
				Store.reqres.setHandler("category:collection", function () {
					return this.categoriesCollection;
				},this);
				Store.reqres.setHandler("category:modelView", function () {
					return this.categoryModelView;
				},this);
				Store.reqres.setHandler("category:collectionView", function () {
					return this.categoriesCollectionView;
				},this);
			},
			renderView: function () {
				this.categoriesCollection.fetch();
				Store.categoriesRegion.show(this.categoriesCollectionView);	
			}
		});
	});

});