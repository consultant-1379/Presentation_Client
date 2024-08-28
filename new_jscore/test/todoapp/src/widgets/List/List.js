define(['jscore/core',
        'jscore/ext/css/main',
		"../ListItem/ListItem"
], function (core, css, ListItem) {

	return core.Widget.extend({

		init: function () {
		},

		addItem: function(message) {
			var row = new ListItem(message);
			row.attachTo(this.getElement());
		},
		
		createElement: function() {
			return core.Element.parse('<ul></ul>');
		}
	});
});