window.App.Views.InfoView = Backbone.View.extend({
	className: 'about',

	initialize: function () {
		cl('InfoView init...');
	},

	render: function () {
		var el = this.$el;
		var p = $('<p class="about"></p>');

		p.html('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum repudiandae optio, delectus nulla quaerat, ipsam magni sed, dicta hic esse tempore dolorem laudantium qui dolor incidunt. Iste facere fugiat tempore.');
		el.append(p);
		return this;
	}
});