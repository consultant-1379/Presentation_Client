define([
    'jscore_beta/0.0.1/core',
	'./ToDoFilterView'
], function (core, View ) {

    return core.Region.extend({
	
		View: View,

        onStart: function (parent) {
			var all_link = this.element.findFirst(".filterAll");
			var completed_link = this.element.findFirst(".filterCompleted");
			
			all_link.on("click", function() {
				this.context.eventBus.publish("filterSelected", "all");
			}.bind(this));
			
			completed_link.on("click", function() {
				this.context.eventBus.publish("filterSelected", "completed");
			}.bind(this));
        }
    });
});