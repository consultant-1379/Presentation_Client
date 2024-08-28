define([
    'Titan',
    'template!./Login.html',
    'styles!./Login.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template: template,

        styles: styles,

        events: {
            "click .app-Login-formButton": "onFormSubmit",
            "submit .app-Login-form": "onFormSubmit"
        },

        onFormSubmit: function(e) {
            var name = this['torUsername'].$el.val();
            var password = this['torPassword'].$el.val();
            return this.presenter.submitForm(name, password);
        }

    });

});