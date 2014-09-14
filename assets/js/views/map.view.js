window.App.Views.MapView = Backbone.View.extend({
	events: {},

	initialize: function (options) {
		this.model = options.model;
		this.bind();
	},

	initializeMap: function () {
		var mapOptions = this.getMapOptions();
		var container = document.getElementById('map-container');

		this.map = new google.maps.Map(container, mapOptions);
		this.bindMapEvents();
	},

	onMapClick: function (event) {
		console.log(event.latLng.lat(), event.latLng.lng());
		this.model.getData(event);
	},

	getMapOptions: function () {
		var mapOptions = {
			center: this.model.get('center'),
			zoom: this.model.get('zoom')
		};

		return mapOptions;
	},

	plotMarkers: function (markers) {
		var that = this;

		markers.forEach(function (marker) {
			that.plotMarker(marker);
		});
	},

	plotMarker: function (marker) {
		var position = new google.maps.LatLng(
			marker.LATITUDE.replace(',', '.'),
			marker.LONGITUDE.replace(',', '.'));

		var marker = new google.maps.Marker({
		    position: position,
		    map: this.map
		});
	},

	onDataArrived: function (data) {
		this.plotMarkers(data.markers);
	},

	bind: function () {
		var that = this;

		vent.bind('onDataArrived', function (data) {
			that.onDataArrived(data);
		});
	},

	bindMapEvents: function () {
		var that = this;

		google.maps.event.addDomListener(this.map, 'click', function (event) {
			that.onMapClick(event);
		});
	},

	render: function () {
		var el = this.$el;

		this.initializeMap();
		
		return this;
	}
});
