define([
	'jscore_beta/0.0.1/core',
	"./ListRowView",
	"jscore_beta/0.0.1/ext/mvp"
], function (core, View, mvp) {

	return core.Widget.extend({
	
		View: View,
		
		init: function(model) {
			this.model = model || new mvp.Model({text:"empty"});
			this.view.setText(model.getAttribute("text"));
		},
		
		destroyModel: function() {
			this.model.setAttributes("isDestroyed", true);
			this.destroy();
		}
		
	});
});