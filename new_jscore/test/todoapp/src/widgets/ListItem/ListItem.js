define(['jscore/core',
        'jscore/ext/css/main',
        './ListItemView'
], function (core, css, View) {

        return core.Widget.extend({
		
			View: View,

            init: function (text) {

                var field = this.getElement().find('span');
                var remove = this.getElement().find('a');

                field.text(text);
                remove.on('click', this.onClick.bind(this));
            },

            onClick: function (e) {
                this.destroy();
                e.preventDefault();
            }
        });
    });