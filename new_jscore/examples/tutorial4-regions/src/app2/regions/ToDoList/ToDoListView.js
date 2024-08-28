define([
	"jscore/core",
	"text!./ToDoList.html"
], function(core, template) {
    console.log(core.Version, 'ToDoListView');

    return core.View.extend({
		getTemplate: function() {
			return template;
		}
	});
	
});