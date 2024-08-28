define([
    'jscore/core',
	"./MyAppView"
], function (core, View) {

    return core.App.extend({
	
		View: View,
	
		onStart: function () {
            this.view.content().text("Welcome to new version");
		}
	});

});