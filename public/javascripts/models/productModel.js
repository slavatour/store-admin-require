$(document).ready(function () {
	
	Store.module("Products.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.ProductModel = Backbone.Model.extend({
			defaults: {
				id: null,
				parent_id: null,
				fullname: "",
				shortname: "",
				description: "",
				specification: null, // характеристика
				pricesType: "", //тип цен (масив: тип цены цена)
				price: null, //розница (основная цена)
				photosUrls: null, // масив список названий фото
				discounts: "", //тип скидки
				discountsValues: null, //размер скидки
				brands: null,
				stock: false, //наличие на складе
				quantityStock: null,
				quantityOrders: null, //статистика количество заказов
				raiting: null, // оценка товара посетителями
				barcode: null,
				units: null, //наличие на складе
				date: null
			}
		});
	});

});
