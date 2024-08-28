define([
	"jscore/core",
	"text!./ToDoForm.html",
	"text!./ToDoForm.css"
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