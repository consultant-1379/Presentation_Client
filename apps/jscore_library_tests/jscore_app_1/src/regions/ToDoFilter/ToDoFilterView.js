define([
	"jscore_beta/0.0.1/core",
	"text!./ToDoFilter.html",
	"text!./ToDoFilter.css"
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