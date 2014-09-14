window.App.Models.MapModel = Backbone.Model.extend({
	initialize: function (options) {
		console.log('MapModel');
		this.set('center', options.center || {});
		this.set('zoom', options.zoom || 10);
	},

	getData: function (event) {
		// should request data here
		// vent.trigger('onDataArrived', {markers: data});
	},

	onDataArrived: function (markers) {
		vent.trigger('onDataArrived', {markers: markers});
	},

	onMarkerData: function (marker) {
		vent.trigger('onMarkerData', {marker: marker});
	},

	getById: function (id) {
		var that = this;

		$.get('/accidents?id='+id, function (data) {
			console.log('markerData', data);
			//that.onMarkerData(data);
		});
	},

	getInitialData: function () {
		var that = this;

		$.get('/accidents', {}, function (data) {
			that.onDataArrived(data);
		});
	}
});
