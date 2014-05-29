$(document).ready(function () {
	
	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SubcategoryCollectionView = Backbone.Marionette.CompositeView.extend({
			template: "#subcategoriesCollectionTemplate",
			itemView: Store.Categories.Views.SubcategoryModelView,
			// itemViewContainer: "div", 
			render: function (containerId) {
				
			}
		});
	});

});