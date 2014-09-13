var cl = function () {
	if(console) {
		for (var i = 0, len = arguments.length; i < len; i++) {
			console.log(arguments[i]);
		};
	}
}

var App = Backbone.View.extend({
	el: "#app",
	initialize: function () {
		cl('App init...');
	},

	render: function () {
		this.$el.html('<h1>Transit POA</h1>');
	}
});

var app = new App();
app.render();