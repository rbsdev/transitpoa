window.App.Views.MapView = Backbone.View.extend({

	initialize: function (options) {
		this.model = options.model;
	},

	initializeMap: function () {
		var mapOptions = this.getMapOptions();
		var container = document.getElementById('map-container');
		cl(mapOptions, container);

		this.map = new google.maps.Map(container, mapOptions);
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
