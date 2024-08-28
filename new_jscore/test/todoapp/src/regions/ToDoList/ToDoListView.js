define([
	"jscore/core",
	"text!./ToDoList.html",
	"text!./ToDoList.css"
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