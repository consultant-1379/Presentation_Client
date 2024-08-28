define([
    'Titan',
    './SecondView'
], function (Titan, View) {

    return Titan.Presenter.extend({
        View: View,

        init: function (app) {
            this.app = app;
            app.localEvents.on(View.EVENT_CLICK_CHANGE_PARAM, this.onAppParamChange, this);
        },

        onPlaceChanged: function (place) {
            console.log('Blue Application', place.name);
            this.view.getInputParam().val(place.id);
        },

        onAppParamChange: function () {
            var newParam = this.view.getInputParam().val();

            if (newParam == '') {
                this.redirect('#');
            }
            else {
                this.redirect('#' + this.app.namespace + '/second/' + newParam);
            }
        },

        redirect: function (url) {
            window.location = url;
        }

    });

});