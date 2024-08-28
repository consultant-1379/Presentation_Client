define([
    'jscore/core',
    'jscore/ext/css/main',
    'text!./list.html',
    'text!./list.css',
    '../../widgets/row/Row'
], function (core, css, template, styles, Row) {

    return core.Region.extend({
        init: function () {
            css.addStyle(styles, this);
        },

        onStart: function () {
            var eventBus = this.getEventBus();
            eventBus.subscribe('addItem', this.addItem.bind(this));
        },

        addItem: function (message) {
            var row = new Row(message);
            row.attachTo(this.getElement());
        },

        createElement: function () {
            return core.Element.parse(template);
        }
    });
});