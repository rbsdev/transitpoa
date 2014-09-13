window.App = {
	Collections: {},
	Models: {},
	Routers: {},
	Views: {}
}

var cl = function () {
	if(console) {
		for (var i = 0, len = arguments.length; i < len; i++) {
			console.log(arguments[i]);
		};
	}
}