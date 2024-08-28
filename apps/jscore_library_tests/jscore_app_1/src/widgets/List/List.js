define([
	'jscore_beta/0.0.1/core',
	"./ListView",
	"jscore_beta/0.0.1/ext/mvp",
	"../ListRow/ListRow"
], function (core, View, mvp, ListRow) {

	return core.Widget.extend({
	
		View: View,
		
		/**
		* Initialises common variables and assigns a collection.
		* 
		* @param collection {mvp.Collection} Optional parameter
		*/
		init: function(collection) {
			this.listRows = [];
			this.collection = collection || new mvp.Collection();
			this.filteredCollection = new mvp.Collection();
			this.appliedFilter = {};
		},
		
		/**
		* Checks if a model passes the currently applied filter
		* 
		* @param model {mvp.Model}
		* @returns boolean
		*/
		passesFilter: function(model) {
			if (Object.keys(this.appliedFilter).length == 0 || !this.appliedFilter) {
				return true;
			}
		
			for (var prop in this.appliedFilter) {
				if (model.getAttribute(prop) != this.appliedFilter[prop]) {
					return false;
				}
			}
			
			return true;
		},

		/**
		* Takes an item and adds it to the collection.
		* Also creates a widget for the item, but doesn't immediately append it.
		* 
		* @param data {Object with "ticked":boolean, "text":string}
		*/
		addItem: function(data) {
			var model = new mvp.Model(data);
			
			model.on("change:isDestroyed", function() {
				this.collection.removeModels(model);
			}.bind(this));
			
			this.collection.addModel(model);
			this.listRows.push(new ListRow(model));
			if (this.passesFilter(model)) {
				this.filteredCollection.addModel(model);
			}
			
			this.render();
		},
		
		/**
		* Applies the new filter and filters the collection automatically
		* 
		* @param filter {Object}
		*/
		setFilter: function(filter) {
			this.appliedFilter = filter;
			this.filteredCollection = new mvp.Collection();
			this.collection.each(function(model) {
				if (this.passesFilter(model)) {
					this.filteredCollection.addModel(model);
				}
			}.bind(this));
			
			this.render();
		},
		
		/**
		* Attaches any widgets that haven't been attached yet, and sets the visibility of widgets
		* depending on the filter.
		*/
		render: function() {
			for (var i = 0; i < this.listRows.length; i++)
			{
				if (!this.listRows[i].isAttached) {
					this.listRows[i].attachTo(this.element);
					this.listRows[i].isAttached = true;
				}
			
				var modelInFilter = this.filteredCollection.getModel(this.listRows[i].model.cid);
				if (modelInFilter) {
					this.listRows[i].setVisible(true);
				} else {
					this.listRows[i].setVisible(false);
				}
			}
		}
	});
});