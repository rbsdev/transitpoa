(function (global, $) {
	var importer = global.importer = function () {
		this.init();
	};

	importer.prototype = {
		init: function () {
			this.bindEvents();
			this.msgs = [
				'Erro, Não foi possivel fazer a importação dos dados.',
				'Importação realizada com sucesso!',
				'Arquivo já importado.'
			];
		},

		bindEvents: function () {
			var self = this;

			$('#submit').click(function (ev) {
				ev.preventDefault();
				self.send();
			})
		},

		send: function () {
			var self = this,
			data = this.getData();
			$('#loader').show();
			$('#result').empty();
			$.post('/importer/import', data, function (result) {
				self.success(result);
			});
		},

		success: function (result) {
			$('#result').append(this.msgs[result.type]);
			$('#loader').hide();
		},

		getData: function () {
			return {
				fileUrl: $('#fileUrl').val()
			}
		}
	};

	$(document).ready(function () {
		new importer();
	});

}(window, jQuery));