define([
	"core",
], function(Core) {

	return Core.Facade.mvp.Model.extend({
		
		init: function(e) {
			this.set({items: []}); // can't put items into default, otherwise all lists will refer to the same array
		},
		
		addItem: function(text) {
			this.get("items").push(text);
			this.trigger("change"); // this is required because backbone is only concerned with the reference, not the actual array value
		},
		
		removeItem: function(index) {
			this.get("items").splice(index, 1);
			this.trigger("change");
		}
	});

});