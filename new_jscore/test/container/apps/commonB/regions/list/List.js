define([
    'jscore/core',
    'jscore/ext/dom/main',
    'jscore/ext/css/main',
    'text!./list.html',
    'text!./list.css',
    './row/Row'
], function (core, dom, css, template, styles, Row) {
    return function (context) {

        return core.Region.extend({
            constructor: function () {
                css.addStyle(styles, this);

                this.el = dom.parse(template);

                context.eventBus.subscribe('submit', function (message) {
                    new Row(this.el, message);

                }.bind(this));

            }
        });
    }
});