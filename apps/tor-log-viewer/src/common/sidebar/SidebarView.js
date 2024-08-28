define([
    'Titan',
    'template!./Sidebar.html',
    'styles!./Sidebar.less'
], function (Titan, template, styles) {

    var Content = Titan.View.extend({

        template: template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getColumnItemsHolder: function () {
            return this[Content.EL_COLUMN_ITEMS_HOLDER];
        },

        addElement: function (element) {
            this.getColumnItemsHolder().addWidget(element);
        }

    }, {
        EL_COLUMN_ITEMS_HOLDER: 'columnItemsHolder'
    });

    return Content;

});