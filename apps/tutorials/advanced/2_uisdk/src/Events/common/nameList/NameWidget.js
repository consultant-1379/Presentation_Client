define([
    'Titan',
    './NameWidgetView'
], function (Titan, View) {

    return Titan.Widget.extend({

        init: function (app) {

            // Get model from parent model.
            this.model = this.options.model;

            // Create view from parent attributes.
            this.view = this.create(View, {attr: this.options.attr});


            // Model --> Display!
            this.model.on('change', function () {
                this.displayEvents();
            }, this);
        },
        displayEvents: function () {
            var msg = this.model.get('msg');
            if (msg !== undefined) {
                this.view['name'].html(msg);
            }
        }
    });
});