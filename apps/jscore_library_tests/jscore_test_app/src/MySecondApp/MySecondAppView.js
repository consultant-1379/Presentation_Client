define([
	"jscore_beta/0.0.1/core",
	"text!./MySecondApp.html",
	"text!./MySecondApp.css"
], function(core, template, style) {

	return core.View.extend({
	
		getTemplate: function() {
			return template;
		},
		
		getStyle: function() {
			return style;
		}
	
	});
	
});