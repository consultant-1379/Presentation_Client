define([
    'jscore/core',
    'jscore/ext/css/main',
    'text!./form.html',
    'text!./form.css',

], function (core, css, template, styles) {

    return core.Region.extend({
        onStart: function () {
            css.addStyle(styles, this);

            var element = this.getElement();

            this.form = element.find('form');
            this.input = element.find('input');

            this.form.on('submit', this.onSubmit, this);
        },

        onSubmit: function (e) {
            e.preventDefault();

            var eventBus = this.getEventBus();
            var value = this.input.val();
            if (value.trim() !== '') {
                eventBus.publish('addItem', value);
                eventBus.publish('serUrl', value);
                this.input.val('');
            }
            else {
                alert('Please enter the Note!');
            }
        },

        createElement: function () {
            return core.Element.parse(template);
        }

    });
});