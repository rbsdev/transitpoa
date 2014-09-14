window.App.Views.InfoView = Backbone.View.extend({
	el: '#app-desc',

	initialize: function () {
		cl('InfoView init...');
	},

	render: function () {
		var el = this.$el;
		var text = 'O acidentespoa.info é um site que organiza informações sobre acidentes de trânsito e oferece ao usuário possibilidades de navegações específicas por estes dados. Através da localização e da utilização dos filtros, são gerados gráficos da relação dos horários, dos tipos, dos veículos envolvidos, do clima, dos mortos e feridos e até mesmo de notícias relacionadas aos acidentes da área selecionada. Os banco de dados do Pexada.info é oriundo de estatísticas divulgadas pela prefeitura de Porto Alegre, mas os usuários podem interagir com a ferramenta e reportar acidentes, vias bloqueadas e outros problemas de trânsito.';

		el.append(text);
		return this;
	}
});