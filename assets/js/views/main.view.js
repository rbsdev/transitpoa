window.App.Views.MainView = Backbone.View.extend({
	el: "#app",
	
	initialize: function () {
		cl('App init...');
	},

	appendAbout: function () {
		var view = new App.Views.InfoView();
		this.$el.append(view.render().$el);
	},

	appendMap: function () {
		var model = new App.Models.MapModel({
			center: {lat: -32.51, lng: -52.52},
			zoom: 10
		});
		var view = new App.Views.MapView({model: model});
		this.$el.append(view.render().$el);
	},

	render: function () {
		this.appendAbout();
		this.appendMap();
		return this;
	}
});