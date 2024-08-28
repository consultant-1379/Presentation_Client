define([
    'jscore/core',
    'jscore/ext/css/main',
	'../../widgets/List/List',
	'./ToDoListView'
], function (core, css, List, View ) {

    return core.Region.extend({
	
		View: View,
	
        init: function () {
			this.listWidget = new List();
        },

        onStart: function (parent) {
            this.context.eventBus.subscribe('addItem', this.addItem.bind(this));
			this.listWidget.attachTo(this.getElement());
        },

        addItem: function (message) {
            
            this.listWidget.addItem(message);
        }
    });
});