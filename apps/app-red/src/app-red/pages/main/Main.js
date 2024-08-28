define([
    'Titan',
    './MainView'
], function (Titan, View) {

    return Titan.Presenter.extend({

        View: View,

        init: function (app) {
            this.appName = 'Red Application';
            this.app=app;
            app.localEvents.on(View.EVENT_CLICK_CHANGE_PARAM, this.onAppParamChange, this);
        },

        onPlaceChanged: function (place) {
            console.log(this.appName, place.name);

            this.changeAppName(place);
            this.updateAppParam('');
        },

        onAnotherPlace: function (place) {
            var id = place.id;
            console.log(this.appName, place.name, 'Place with param: ', id);

            this.changeAppName(place);
            this.updateAppParam(place.id);
        },

        onAppParamChange: function () {
            var newParam = this.view.getInputParam().val();

            if (newParam == '') {
                this.redirect('#');
            } else {
                this.redirect('#'+this.app.namespace+'/anotherPlace/' + newParam);
            }
        },

        changeAppName: function (place) {
            this.view.getAppName().html(this.appName + ' "' + place.name + '"');
        },

        updateAppParam: function (param) {
            var value = '';
            if (param != '') {
                value = 'App param is "' + param + '"';
            }
            this.view.getAppParam().html(value);
            this.view.getInputParam().val(param);
        },

        redirect: function (url) {
            window.location = url;
        }


    });

});