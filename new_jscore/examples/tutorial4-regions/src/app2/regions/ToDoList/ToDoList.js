define([
    'jscore/core',
	'../../../widgets/List/List',
	'./ToDoListView'
], function (core, List, View ) {
    console.log(core.Version, 'ToDoList');

    return core.Region.extend({
	
		View: View,
	
        init: function () {
			this.listWidget = new List();
        },

        onStart: function () {
            this.context.eventBus.subscribe('addItem', this.addItem.bind(this));
			this.listWidget.attachTo(this.element);
        },

        addItem: function (message) {
            this.listWidget.addItem(message);
        }
    });
});