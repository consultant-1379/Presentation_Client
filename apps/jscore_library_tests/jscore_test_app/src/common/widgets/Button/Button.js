define([
	'jscore_beta/0.0.1/core',
	"./ButtonView"
], function (core, View) {

	return core.Widget.extend({
	
		View: View,
		
		init: function(caption) {
			this.view.setCaption(caption);
		},
		
		onClick: function() {
			this.trigger("click");
		}
	});
});