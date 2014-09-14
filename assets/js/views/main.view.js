window.App.Views.MainView = Backbone.View.extend({
	el: "#app",
	
	initialize: function () {
		cl('App init...');
		this.bindEvents();
	},

	bindEvents: function () {
		var btn = $('#mais-sobre');
		var showInfo = $('.show-info');
		var boxInfo = $('.box-info');
		var footer = $('footer');

		showInfo.on('click', function () {
			boxInfo.toggleClass('active');
		});

		btn.on('click', function (ev) {
			ev.preventDefault();
			footer.toggleClass('expanded');
		});
	},

	appendAbout: function () {
		var view = new App.Views.InfoView();
		view.render();
	},

	appendMap: function () {
		var model = new App.Models.MapModel({
			center: {lat: -30.032541581093586, lng: -51.2208366394043},
			zoom: 14
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