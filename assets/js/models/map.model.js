window.App.Models.MapModel = Backbone.Model.extend({
	initialize: function (options) {
		console.log('MapModel');
		this.set('center', options.center || {});
		this.set('zoom', options.zoom || 10);
	}
});