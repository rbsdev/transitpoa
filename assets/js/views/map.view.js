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
		this.model.getInitialData();
	},

	onMapClick: function (event) {
		console.log(event.latLng.lat(), event.latLng.lng());
		this.model.getData(event);
		this.getBoundaries();
	},

	getMapOptions: function () {
		var mapOptions = {
			center: this.model.get('center'),
			zoom: this.model.get('zoom')
		};

		return mapOptions;
	},

	getBoundaries: function () {
		var bounds = this.map.getBounds();
		var ne = bounds.getNorthEast();
		var sw = bounds.getSouthWest();

		console.log('ne', ne.lat(), ne.lng());
		console.log('sw', sw.lat(), sw.lng());
	},

	plotMarkers: function (markers) {
		var that = this;

		markers.forEach(function (marker) {
			that.plotMarker(marker);
		});
	},

	plotMarker: function (markerData) {
		var that = this;
		var	position = new google.maps.LatLng(
			markerData.LATITUDE,
			markerData.LONGITUDE);

		var opts = {
		    position: position,
		    map: this.map
		}

		opts.icon = this.getIcon(markerData);

		var marker = new google.maps.Marker(opts);

		google.maps.event.addListener(marker, 'click', function(event){
		    that.onMarkerClick(markerData);
		});
	},

	getIcon: function (marker) {
		var icon = null;

		if (marker.CAMINHAO > 0) {
			icon = 'http://png-1.findicons.com/files/icons/2579/iphone_icons/30/truck.png';
		}

		if (marker.BICICLETA > 0) {
			icon = 'http://assets2.tribesports.com/system/challenges/images/000/027/901/tiny/20121002150517-get-a-bike-and-go-out-to-cycle.png';
		}

		return icon;
	},

	onDataArrived: function (data) {
		this.plotMarkers(data.markers);
	},

	onMarkerData: function (data) {

	},

	onMarkerClick: function (markerData) {
		var id = markerData.id;

		var	position = new google.maps.LatLng(
			markerData.LATITUDE,
			markerData.LONGITUDE);

		this.map.setCenter(position);

		this.model.getById(id);
	},

	bind: function () {
		var that = this;

		vent.bind('onDataArrived', function (data) {
			that.onDataArrived(data);
		});

		vent.bind('onMarkerData', function (data) {
			that.onMarkerData(data);
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
