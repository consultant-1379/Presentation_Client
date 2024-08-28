define([
	"core",
	"facade",
	"widgets/buttonWidget/ButtonWidget",
], function(Core, f, ButtonWidget) {

	return Core.Region.extend({
	
		template: "./template.html",
		style: "./style.css",
	
		init: function() {
			this.buttonWidget = new ButtonWidget("Submit");
			
			this.buttonWidget.onClick = (function() {
				var inputField = document.getElementById("textInput");
				f.publish("itemSubmit", inputField.value);
				inputField.value = "";
			}).bind(this);
		},
		
		start: function(element) {
			this._super("start", element);
			this.buttonWidget.start(f.dom.getElement("#buttonWidget"));
		}
	});

});