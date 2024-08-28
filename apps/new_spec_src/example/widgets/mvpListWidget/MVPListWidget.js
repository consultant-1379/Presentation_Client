define([
	"core",
	"./listWidgetView",
	"./listWidgetModel"
], function(Core, View, Model) {

	return Core.Widget.extend({
	
		init: function() {
			this.view = new View();
			this.model = new Model();
			this.model.on("change", this.updateView, this);
		},
		
		addItem: function(text) {
			this.model.addItem(text);
		},
		
		updateView: function() {
			this.view.render(this.model);
		},
		
		start: function(element) {
			this.view.start(element);
			this.updateView();
		}
	});

});