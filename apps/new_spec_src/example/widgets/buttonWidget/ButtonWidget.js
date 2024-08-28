define([
	"core",
	"facade",
], function(Core, f) {

	return Core.Widget.extend({
	
		init: function(name) {
			this.name = name;
		},
		
		getText: function() {
			return this.name;
		},
		
		setText: function(name) {
			this.name = name;
			this.render();
		},
		
		onClick: function(e) {
		},
		
		render: function() {
			f.dom.setText(this.getElement(), this.name);
		},
		
		start: function(element) {
			this._super("start", element);
			
			if (this.name) {
				f.dom.setText(element, this.name);
			} else {
				this.name = element.innerHTML;
			}
			
			f.dom.on(element, "click", (function(e) {
				this.onClick();
			}).bind(this));
		}
	});
});