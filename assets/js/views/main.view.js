window.App.Views.MainView = Backbone.View.extend({
	el: "#app",
	
	initialize: function () {
		cl('App init...');
	},

	appendAbout: function () {
		var view = new App.Views.InfoView();
		this.$el.append(view.render().$el);
	},

	render: function () {
		this.appendAbout();
		return this;
	}
});