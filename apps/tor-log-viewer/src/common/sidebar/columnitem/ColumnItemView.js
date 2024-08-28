define([
    'Titan',
    'template!./ColumnItem.html',
    'styles!./ColumnItem.less'
], function (Titan, template, styles) {

    var ColumnItem = Titan.View.extend({

        template:template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getColumnName: function () {
            return this[ColumnItem.EL_COLUMN];
        },

        getToggleButton: function () {
            return this[ColumnItem.EL_TOGGLE_BUTTON];
        }

    }, {
        EL_COLUMN: 'column',
        EL_TOGGLE_BUTTON: 'toggleButton'
    });

    return ColumnItem;

});