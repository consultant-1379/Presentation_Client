define([
	"jscore/core",
	"text!./ToDoInput.html",
	"text!./ToDoInput.css"
], function(core, template, style) {
    console.log(core.Version, 'TodoInputView');

    return core.View.extend({
		getTemplate: function() {
			return template;
		},
		
		getStyle: function() {
			return style;
		}
	});
	
});