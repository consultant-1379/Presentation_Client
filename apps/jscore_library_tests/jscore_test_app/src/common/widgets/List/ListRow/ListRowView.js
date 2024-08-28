define([
	"jscore_beta/0.0.1/ext/mvp",
	"text!./ListRow.html"
], function(mvp, template) {

	return mvp.View.extend({
	
		getTemplate: function() {
			return template;
		},
		
		events: {
			"click span:last-child": "destroyModel"
		},
		
		setText: function(text) {
			this.element.findFirst("span").text(text);
		}
	
	});

});