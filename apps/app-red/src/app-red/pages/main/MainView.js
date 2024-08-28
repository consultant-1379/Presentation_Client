define([
    'Titan',
    'template!./Main.html',
    'styles!./Main.less'
], function (Titan, template, styles) {

    var MainView = Titan.View.extend({

        template: template,

        styles: styles,

        init: function (app) {
            this.getChangeParam().on('click', function () {
                app.localEvents.trigger(MainView.EVENT_CLICK_CHANGE_PARAM);
            });
            this.getInputParam().on('keyup', function (event) {
                if (event.which == 13) {
                    app.localEvents.trigger(MainView.EVENT_CLICK_CHANGE_PARAM);
                }
            });
        },

        getAppName: function () {
            return this[MainView.EL_APP_NAME];
        },

        getAppParam: function () {
            return this[MainView.EL_APP_PARAM];
        },

        getInputParam: function () {
            return this[MainView.EL_INPUT_PARAM];
        },

        getChangeParam: function () {
            return this[MainView.EL_CHANGE_PARAM];
        }

    }, {
        'EL_APP_NAME': 'appName',
        'EL_APP_PARAM': 'appParam',
        'EL_INPUT_PARAM': 'inputParam',
        'EL_CHANGE_PARAM': 'changeParam',
        'EVENT_CLICK_CHANGE_PARAM': 'onChangeParamClick'
    });

    return MainView;

});