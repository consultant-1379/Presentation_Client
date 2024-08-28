define([
	"jscore_beta/0.0.1/ext/mvp",
	"text!./ListRow.html"
], function(mvp, template) {

	return mvp.View.extend({
	
		getTemplate: function() {
			return template;
		},
		
		events: {
			"change input": "toggleTicked",
			"click .listrowRemove": "destroyModel"
		},
		
		setText: function(text) {
			this.element.findFirst(".listrowText").text(text);
		},
		
		setTicked: function(value) {
			this.element.findFirst("input").element.checked = value;
		},
		
		setVisible: function(value) {

			if (value) {
				this.element.element.style.display = "block";
			} else {
				this.element.element.style.display = "none";
			}
		}
	
	});

});