define([
    'jscore/core',
	"text!./MyApp.html",
	"styles!./MyApp.less"
], function (core, template, style) {

    return core.View.extend({
		
		getTemplate: function() {
			return template;
		},
		
		getStyle: function() {
			return style;
		},
        content: function(){
           return this.element.find('.eaMyApp-content');
        }
		
	});

});