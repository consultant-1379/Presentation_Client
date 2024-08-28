define([
    'Titan',
    'template!./Second.html',
    'styles!./Second.less'
], function (Titan, template, styles) {

    var SecondView = Titan.View.extend({

        template: template,

        styles: styles,

        init: function (app) {
            this.getChangeParam().on('click', function () {
                app.localEvents.trigger(SecondView.EVENT_CLICK_CHANGE_PARAM);
            });
            this.getInputParam().on('keyup', function (event) {
                if (event.which == 13) {
                    app.localEvents.trigger(SecondView.EVENT_CLICK_CHANGE_PARAM);
                }
            });
        },

        getInputParam: function () {
            return this[SecondView.EL_INPUT_PARAM];
        },

        getChangeParam: function () {
            return this[SecondView.EL_CHANGE_PARAM];
        }

    }, {
        'EL_INPUT_PARAM': 'inputParam',
        'EL_CHANGE_PARAM': 'changeParam',
        'EVENT_CLICK_CHANGE_PARAM': 'onChangeParamClick'
    });

    return SecondView;

});