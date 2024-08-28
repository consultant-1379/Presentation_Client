define([
	'jscore_beta/0.0.1/core',
	"./ListRowView",
	"jscore_beta/0.0.1/ext/mvp"
], function (core, View, mvp) {

	return core.Widget.extend({
	
		View: View,
		
		init: function(model) {
			this.model = model || new mvp.Model({ticked: false, text:"empty"});
			this.view.setText(model.getAttribute("text"));
			this.view.setTicked(model.getAttribute("ticked"));
		},
		
		toggleTicked: function() {
			this.model.setAttributes("ticked", !this.model.getAttribute("ticked"));
		},
		
		destroyModel: function() {
			this.model.setAttributes("isDestroyed", true);
			this.destroy();
		},
		
		setVisible: function(value) {
			this.view.setVisible(value);
		}
		
	});
});