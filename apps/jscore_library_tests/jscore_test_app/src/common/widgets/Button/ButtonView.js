define([
	"jscore_beta/0.0.1/ext/mvp",
	"text!./Button.html",
	"text!./Button.css"
], function(mvp, template, style) {

	return mvp.View.extend({
	
		getTemplate: function() {
			return template;
		},
	
		getStyle: function() {
			return style;
		},
		
		events: {
			"click button": "onClick"
		},
		
		setCaption: function(caption) {
			this.element.findFirst("button").text(caption);
		}
	
	});

});