define([
	"jscore/core",
	"text!./List.html",
	"text!./List.css"
], function(core, template, style) {
    console.log(core.Version, 'ListView common');

    return core.View.extend({
	
		getTemplate: function() {
			return template;
		},
	
		getStyle: function() {
			return style;
		}
	
	});

});