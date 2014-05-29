$(document).ready(function () {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryCollectionView = Marionette.CompositeView.extend({
			template: "#categoriesCollectionTemplate",
			itemView: Store.Categories.Views.CategoryModelView,
			itemViewContainer: ".categoriesContainerView",
			events: {
				'click .addNewSubategory': 'addNewSubcategory'
			},
			addNewSubcategory: function (e) {
				var model = new Store.Categories.Models.SubcategoryModel();
				var modalView = new Store.Common.Views.ModalView({
					model: model
				});
				Store.modalRegion.show(modalView);
			}
		});
	});

});