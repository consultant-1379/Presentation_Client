define([
    'jscore_beta/0.0.1/core',
	"./ToDoAppView",
	"./regions/ToDoInput/ToDoInput",
	"./regions/ToDoList/ToDoList",
	"./regions/ToDoFilter/ToDoFilter",
	'jscore_beta/0.0.1/ext/locationController'
], function (core, View, InputRegion, ListRegion, FilterRegion, router) {

    return core.App.extend({
	
		View: View,
	
        onStart: function () {
		
			this.holder = this.element.findFirst(".content");
		
			this.inputRegion = InputRegion.Create(this.context);
            this.inputRegion.start(this.holder);

            this.listRegion = ListRegion.Create(this.context);
            this.listRegion.start(this.holder);
			
			this.filterRegion = FilterRegion.Create(this.context);
			this.filterRegion.start(this.element);
			
			this.setupRouter();
        },
		
		setupRouter: function() {
			this.context.eventBus.subscribe('filterSelected', function (value) {
                router.setLocation(value);
            }, this);
			
			router.addLocationListener(function (hash) {
				if (hash == "all") {
					this.listRegion.showAllItems();
				} else if (hash == "completed") {
					this.listRegion.showCompletedItems();
				}
            }, this);
			
			router.start();
		}
    });
	
});