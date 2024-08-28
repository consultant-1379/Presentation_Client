define([
	"jscore_beta/0.0.1/core",
	"text!./ToDoList.html"
], function(core, template) {
	
	return core.View.extend({
		getTemplate: function() {
			return template;
		}
	});
	
});