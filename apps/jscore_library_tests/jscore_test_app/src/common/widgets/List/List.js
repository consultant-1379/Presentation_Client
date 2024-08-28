define([
	'jscore_beta/0.0.1/core',
	"jscore_beta/0.0.1/ext/mvp",
	"./ListView",
	"./ListRow/ListRow"
], function (core, mvp, View, ListRow) {

	return core.Widget.extend({
	
		View: View,
		
		init: function() {
			this.listRows = [];
		},

		addItem: function(data) {
			var model = new mvp.Model({text:data});
			var listRow = new ListRow(model);
			
			model.on("change:isDestroyed", function() {
				this.listRows.splice(this.listRows.indexOf(listRow), 1);
			}.bind(this));
			
			this.listRows.push(listRow);
			this.render();
		},
		
		render: function() {
			for (var i = 0; i < this.listRows.length; i++)
			{
				if (!this.listRows[i].isAttached) {
					this.listRows[i].attachTo(this.element);
					this.listRows[i].isAttached = true;
				}
			}
		}
	});
});