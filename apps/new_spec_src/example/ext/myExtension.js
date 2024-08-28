define(["JSCore"], function(Core) {
	
	return Core.Facade.Extension.extend({
		myExtensionFunction: function(input) {
			console.log("From myExtensionFunction" + input);
		}
	});
});