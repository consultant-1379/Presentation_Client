define([
	"core", 
	"facade",
	"widgets/mvpListWidget/MVPListWidget",
], function(Core, f, ListWidget) {

	return Core.Region.extend({
	
		template: "./template.html",
	
		init: function() {
			this.listWidget = new ListWidget();
	
			f.subscribe("itemSubmit", (function(data) {
				this.listWidget.addItem(data);
			}).bind(this));
		},
		
		start: function(element) {
			this._super("start", element);
			this.listWidget.start(f.dom.getElement("#listWidget"));
		}
	});

});