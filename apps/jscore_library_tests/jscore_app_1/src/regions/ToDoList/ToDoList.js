define([
    'jscore_beta/0.0.1/core',
	'../../widgets/List/List',
	'./ToDoListView'
], function (core, List, View ) {

    return core.Region.extend({
	
		View: View,
	
        init: function () {
			this.listWidget = new List();
        },

        onStart: function (parent) {
            this.context.eventBus.subscribe('addItem', this.addItem.bind(this));
			this.listWidget.attachTo(this.element);
        },

        addItem: function (message) {
			var data = {
				ticked: false,
				text: message
			};
            this.listWidget.addItem(data);
        },
		
		showAllItems: function() {
			this.listWidget.setFilter({});
		},
		
		showCompletedItems: function() {
			this.listWidget.setFilter({ticked: true});
		}
    });
});