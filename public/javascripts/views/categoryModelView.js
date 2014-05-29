$(document).ready(function () {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
			initialize: function () {
				var subcategoriesController = new Store.Categories.Controllers.SubcategoriesController();
				var fetchedSubcat = subcategoriesController.fetchCollection(this.model.get('id'), function (collection) {
					console.log(collection);
				});
				// this.model.set('subcategories', fetchedSubcat);
			},
			templateHelpers: {
				viewSubcategories: function (data) {
					// console.log(this.subcategories);
				}
			},
			events: {
				'click .subcategoriesLink': 'openModal'
			},
			openModal: function (e) {
				var modelId = 1*($(e.target).attr('data-submodel-id'));
				var subcategories = this.model.get('subcategories');
				var openedModel = _.where(subcategories, {id: modelId});
				var submodel = new Store.Categories.Models.SubcategoryModel();
				submodel.set(openedModel[0]);
				var modalView = new Store.Common.Views.ModalView({
					model: submodel
				});
				Store.modalRegion.show(modalView);
			}
		});
	});

});