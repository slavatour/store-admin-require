$(document).ready(function () {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SliderModelView = Backbone.Marionette.ItemView.extend({
			template: '#templateSliderItemView',
			tagName: 'tr',
			events: {
				'click .editSliderBtn'				: 	'editSlider', 
				'click .deleteSliderBtn'			: 	'deleteSlider',
				'click .btn-toggle'					: 	'toggleDisplayStatus',
				"click .sliderPhoto"				: 	"showSliderPhoto",
				'click .numberEdit'					: 	'changeNumber'
			},
			templateHelpers: {
				displayStatus: function () {
					var activeOn, activeOff;
					if(this.display) {
						activeOn = 'active btn-primary';
						activeOff = 'btn-default';
					} else {
						activeOn = 'btn-default';
						activeOff = 'active btn-danger';
					}
					var content = '<div class="btn-group btn-toggle"><button class="btn btn-xs '+
								activeOn+'">on</button><button class="btn btn-xs '+
								activeOff+'">off</button></div>';
					return content;
				}
			},
			deleteSlider: function () {
				this.model.destroy();
			},
			editSlider: function () {
				var modal = new Store.Common.Views.ModalView({
					template: '#modalEditSlider',
					model: this.model
				});
				Store.modalRegion.show(modal);
			},
			toggleDisplayStatus: function (e) {
				if(!$(e.target).hasClass('active')) {
					if($(e.target).text() == 'off') {
						$(e.currentTarget.lastChild).removeClass('btn-default').addClass('active btn-danger');
						$(e.currentTarget.firstChild).removeClass('active btn-primary').addClass('btn-default');
						this.model.set({display: false});
					} else {
						$(e.currentTarget.lastChild).removeClass('active btn-danger').addClass('btn-default');
						$(e.currentTarget.firstChild).removeClass('btn-default').addClass('active btn-primary');
						this.model.set({display: true});
					}
				}
				this.model.save();
			},
			showSliderPhoto: function () {
				var modal = new Store.Common.Views.ModalView({
					template: '#modalPhoto',
					model: this.model
				});
				Store.modalRegion.show(modal);				
			},
			changeNumber: function (e) {
				var collectionSliders = Store.request('slider:collection');
				var collectionSlidersView = Store.request('slider:collectionView');
				var step = $(e.target).attr('data-step');
				var number = 1*this.model.get('number') + 1*step;
				if( number > 0 ) {
					this.model.set('number', number);
				}
			}
		});
	});

});