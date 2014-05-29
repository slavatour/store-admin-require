$(document).ready(function () {
	
	Store.module("Slider.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.SliderModel = Backbone.Model.extend({
			defaults: {
				id: null,
				number: null,
				name: '',
				description: '',
				url: '',
				img_name: '',
				active: false,
				display: false
			},
			initialize: function () {
				this.id = this.get('id');	
			},
			urlRoot: 'slider'
		});
	});

});