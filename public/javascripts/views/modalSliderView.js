$(document).ready(function () {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: null,
			events: {
				'click .saveSliderChangesBtn'     	: 	'saveSliderChanges',
				'click .saveNewSliderBtn'			: 	'saveNewSlider'
			},
			initialize: function () {

			},
			saveSliderChanges: function (e) {
				e.preventDefault();
				var collectionSliders = Store.request('slider:collection');
				var collectionSlidersView = Store.request('slider:collectionView');
				var fd = new FormData();
				var file = this.$el.find('#sliderImgEdit')[0].files[0];
				fd.append('id', this.model.get('id'));
				fd.append('name', this.$el.find('#sliderNameEdit').val());
				fd.append('description', this.$el.find('#sliderDescEdit').val());
				fd.append('url', this.$el.find('#sliderURLEdit').val());
				if(file != undefined) {
					fd.append('file', file);
				}
				$.ajax({
					type: "PUT",
					url: '/slider/'+this.model.get('id'),
					data: fd,
					processData: false,
					contentType: false,
					success: function () {
						collectionSliders.fetch();
					}
				});
				$('#editModal').modal('hide');
			},
			saveNewSlider: function (e) {
				e.preventDefault();
				var collectionSliders = Store.request('slider:collection');
				var collectionSlidersView = Store.request('slider:collectionView');
				var fd = new FormData();
				fd.append('name', this.$el.find('#sliderName').val());
				fd.append('description', this.$el.find('#sliderDesc').val());
				fd.append('url', this.$el.find('#sliderURL').val());
				fd.append('file', this.$el.find('#sliderImg')[0].files[0]);
				$.ajax({
					type: "POST",
					url: '/slider',
					data: fd,
					processData: false,
					contentType: false,
				});
				setTimeout(function () {
					collectionSliders.fetch();
				},500);
				$('#editModal').modal('hide');
			}

		});
	});

});