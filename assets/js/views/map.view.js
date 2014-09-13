window.App.Views.MapView = Backbone.View.extend({

	initialize: function (options) {
		this.model = options.model;
	},

	initializeMap: function () {
		var mapOptions = this.getMapOptions();
		var container = document.getElementById('map-container');

		this.map = new google.maps.Map(container, mapOptions);
		this.bindMapEvents();
	},

	bindMapEvents: function () {
		google.maps.event.addDomListener(this.map, 'click', function (event) {
			console.log(event.latLng.lat(), event.latLng.lng());
		});
	},

	getMapOptions: function () {
		var mapOptions = {
			center: this.model.get('center'),
			zoom: this.model.get('zoom')
		};

		return mapOptions;
	},

	render: function () {
		var el = this.$el;

		this.initializeMap();
		
		return this;
	}
});
